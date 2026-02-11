import pandas as pd
import numpy as np

def load_and_preprocess_data(path):
    df = pd.read_csv(path)

    # Basic cleaning
    df.dropna(inplace=True)
    df.drop_duplicates(inplace=True)

    # Feature engineering
    current_year = pd.Timestamp.today().year
    df["Age"] = current_year - df["Year_Birth"]

    df["Total_Spending"] = (
        df["MntWines"] + df["MntFruits"] + df["MntMeatProducts"] +
        df["MntFishProducts"] + df["MntSweetProducts"] + df["MntGoldProds"]
    )

    # ✅ DEFINE THIS FIRST
    df["Total_Purchases"] = (
        df["NumWebPurchases"] + df["NumStorePurchases"]
    )

    # ✅ NOW USE IT
    df["Engagement_Score"] = (
        df["Total_Purchases"] / (df["Recency"] + 1)
    )

    df["Family_Size"] = (
        df["Kidhome"] + df["Teenhome"] + 1
    )

    FEATURES = [
        "Age",
        "Income",
        "Total_Spending",
        "Total_Purchases",
        "Engagement_Score",
        "Recency",
        "NumWebVisitsMonth",
        "Family_Size"
    ]

    X = df[FEATURES]

    return df, X, FEATURES
