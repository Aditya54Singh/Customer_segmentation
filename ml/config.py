import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(BASE_DIR, "data", "customer_segmentation.csv")
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")

MODEL_PATH = os.path.join(ARTIFACTS_DIR, "kmeans_model.pkl")
SCALER_PATH = os.path.join(ARTIFACTS_DIR, "scaler.pkl")
FEATURES_PATH = os.path.join(ARTIFACTS_DIR, "features.json")
CENTROIDS_PATH = os.path.join(ARTIFACTS_DIR, "cluster_centers.csv")

RANDOM_STATE = 42
FORCED_K = 4
