import json
import joblib
import numpy as np

from config import MODEL_PATH, SCALER_PATH, FEATURES_PATH
from services.preprocessing import build_features
from services.segment_mapping import SEGMENT_MAP, MACRO_MAP

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

with open(FEATURES_PATH, "r") as f:
    FEATURES = json.load(f)

def predict_customer_segment(payload):
    feature_dict = build_features(payload)

    X = np.array([[feature_dict[f] for f in FEATURES]])
    X_scaled = scaler.transform(X)

    cluster_id = int(model.predict(X_scaled)[0])

    # --- Improved confidence calculation ---
    distances = model.transform(X_scaled)[0]

    confidence = round(
        1 - (distances[cluster_id] / distances.sum()),
        2
    )

    segment = SEGMENT_MAP[cluster_id]

    return {
        "cluster_id": cluster_id,
        "macro_segment": MACRO_MAP[cluster_id],
        "persona": segment["persona"],
        "description": segment["description"],
        "recommended_action": segment["recommended_action"],
        "confidence": confidence
    }

def predict_customer_segment_bulk(df):
    output_rows = []
    
    for _, row in df.iterrows():
        payload = row.to_dict()

        prediction = predict_customer_segment(payload)

        output_rows.append({
            **payload,
            "cluster_id": prediction["cluster_id"],
            "macro_segment": prediction["macro_segment"],
            "persona": prediction["persona"],
            "confidence": prediction["confidence"],
            "recommended_action": prediction["recommended_action"]
        })
    return output_rows
    

