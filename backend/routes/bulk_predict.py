import pandas as pd
import json
import joblib
from flask import Blueprint, request, jsonify
from sklearn.decomposition import PCA

from services.inference import predict_customer_segment_bulk
from services.jwt_utils import jwt_required
from config import FEATURES_PATH, SCALER_PATH

bulk_predict_bp = Blueprint("bulk_predict", __name__)

# Load shared artifacts
scaler = joblib.load(SCALER_PATH)

with open(FEATURES_PATH, "r") as f:
    FEATURES = json.load(f)

def compute_derived_features(df):
    spending_cols = [
        "MntWines", "MntFruits", "MntMeatProducts",
        "MntFishProducts", "MntSweetProducts", "MntGoldProds"
    ]

    df["Total_Spending"] = df[spending_cols].sum(axis=1)

    df["Total_Purchases"] = (
        df["NumWebPurchases"] + df["NumStorePurchases"]
    )

    df["Engagement_Score"] = (
        df["Total_Purchases"] / (df["Recency"] + 1)
    )

    # ✅ ADD THIS LINE
    df["Family_Size"] = (
        df["Kidhome"] + df["Teenhome"] + 1
    )

    return df


@bulk_predict_bp.route("/predict/bulk", methods=["POST"])
@jwt_required
def bulk_predict():
    file = request.files.get("file")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # Read file
    if file.filename.endswith(".csv"):
        df = pd.read_csv(file)
    elif file.filename.endswith(".xlsx"):
        df = pd.read_excel(file)
    else:
        return jsonify({"error": "Only CSV or Excel supported"}), 400


    results = predict_customer_segment_bulk(df)
    output_df = pd.DataFrame(results)


    cluster_distribution = (
        output_df["cluster_id"]
        .value_counts(normalize=True)
        .sort_index()
        .to_dict()
    )

    output_df = compute_derived_features(output_df)

    summary = (
        output_df
        .groupby("cluster_id")
        .agg({
            "Total_Spending": "mean",
            "Engagement_Score": "mean"
        })
        .reset_index()
        .to_dict(orient="records")
    )



    X_features = output_df[FEATURES]
    X_scaled = scaler.transform(X_features)

    pca = PCA(n_components=2)
    X_pca = pca.fit_transform(X_scaled)

    pca_points = [
        {
            "pca_1": float(X_pca[i, 0]),
            "pca_2": float(X_pca[i, 1]),
            "cluster_id": int(output_df.iloc[i]["cluster_id"])
        }
        for i in range(len(output_df))
    ]

    return jsonify({
        "csv_data": output_df.to_dict(orient="records"),
        "cluster_distribution": cluster_distribution,
        "summary": summary,
        "pca_points": pca_points
    })
