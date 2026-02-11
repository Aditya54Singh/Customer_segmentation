import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

ML_DIR = os.path.join(PROJECT_ROOT, "ml", "artifacts")

MODEL_PATH = os.path.join(ML_DIR, "kmeans_model.pkl")
SCALER_PATH = os.path.join(ML_DIR, "scaler.pkl")
FEATURES_PATH = os.path.join(ML_DIR, "features.json")
JWT_SECRET = os.environ.get("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24
