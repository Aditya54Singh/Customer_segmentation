import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.decomposition import PCA
from preprocessing import load_and_preprocess_data
from train import train_kmeans

def plot_pca(X_scaled, df):
    pca = PCA(n_components=2)
    components = pca.fit_transform(X_scaled)

    df['PC1'] = components[:, 0]
    df['PC2'] = components[:, 1]

    plt.figure(figsize=(7,5))
    sns.scatterplot(
        x='PC1',
        y='PC2',
        hue='Cluster',
        data=df,
        palette='Set1'
    )
    plt.title("Customer Segmentation (KMeans)")
    plt.show()

if __name__ == "__main__":
    df, model = train_kmeans()
    _, X_scaled, _ = load_and_preprocess_data("data/customer_segmentation.csv")
    plot_pca(X_scaled, df)