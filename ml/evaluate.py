import joblib
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics import silhouette_score, davies_bouldin_score
from sklearn.decomposition import PCA

from preprocessing import load_and_preprocess_data
from config import DATA_PATH, MODEL_PATH, SCALER_PATH


def evaluate_model():
    # Load data
    df, X, FEATURES = load_and_preprocess_data(DATA_PATH)

    # Load artifacts
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)

    # Scale features
    X_scaled = scaler.transform(X)

    # Predict clusters
    labels = model.predict(X_scaled)

    # ---------- Metrics ----------
    sil_score = silhouette_score(X_scaled, labels)
    db_score = davies_bouldin_score(X_scaled, labels)

    print("📊 Clustering Evaluation Metrics")
    print(f"Silhouette Score       : {sil_score:.3f}")
    print(f"Davies–Bouldin Index   : {db_score:.3f}")

    # ---------- Cluster Distribution ----------
    cluster_dist = pd.Series(labels).value_counts(normalize=True)
    print("\n📦 Cluster Distribution")
    print(cluster_dist)

    # ---------- PCA Visualization (Evaluation only) ----------
    pca = PCA(n_components=2)
    components = pca.fit_transform(X_scaled)

    df["PC1"] = components[:, 0]
    df["PC2"] = components[:, 1]
    df["Cluster"] = labels

    plt.figure(figsize=(8, 6))
    sns.scatterplot(
        data=df,
        x="PC1",
        y="PC2",
        hue="Cluster",
        palette="Set2",
        alpha=0.7
    )
    plt.title("Customer Segmentation – PCA View")
    plt.xlabel("Principal Component 1")
    plt.ylabel("Principal Component 2")
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    evaluate_model()
