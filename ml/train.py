import os
import json
import joblib
import pandas as pd

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

from preprocessing import load_and_preprocess_data
from config import (
    DATA_PATH, ARTIFACTS_DIR, MODEL_PATH,
    SCALER_PATH, FEATURES_PATH, CENTROIDS_PATH,
    RANDOM_STATE, FORCED_K
)

def train():
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)

    df, X, FEATURES = load_and_preprocess_data(DATA_PATH)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    kmeans = KMeans(
        n_clusters=FORCED_K,
        random_state=RANDOM_STATE,
        n_init=20
    )
    df["Cluster"] = kmeans.fit_predict(X_scaled)

    # Save artifacts
    joblib.dump(kmeans, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)

    with open(FEATURES_PATH, "w") as f:
        json.dump(FEATURES, f)


    pd.DataFrame(
        kmeans.cluster_centers_,
        columns=FEATURES
    ).to_csv(CENTROIDS_PATH, index=False)

    print("✅ Model, scaler, features, centroids saved")
    print("Cluster distribution:")
    print(df["Cluster"].value_counts(normalize=True))

if __name__ == "__main__":
    train()
