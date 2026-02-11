def to_int(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def to_float(value, default=0.0):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def build_features(payload):
    age = to_int(payload.get("Age"))
    income = to_int(payload.get("Income"))
    recency = to_int(payload.get("Recency"))
    web_visits = to_int(payload.get("NumWebVisitsMonth"))

    kidhome = to_int(payload.get("Kidhome"))
    teenhome = to_int(payload.get("Teenhome"))

    spending_fields = [
        "MntWines", "MntFruits", "MntMeatProducts",
        "MntFishProducts", "MntSweetProducts", "MntGoldProds"
    ]

    total_spending = sum(
        to_float(payload.get(f)) for f in spending_fields
    )

    total_purchases = (
        to_int(payload.get("NumWebPurchases")) +
        to_int(payload.get("NumStorePurchases"))
    )

    engagement_score = total_purchases / (recency + 1)
    family_size = kidhome + teenhome + 1

    return {
        "Age": age,
        "Income": income,
        "Total_Spending": total_spending,
        "Total_Purchases": total_purchases,
        "Engagement_Score": engagement_score,
        "Recency": recency,
        "NumWebVisitsMonth": web_visits,
        "Family_Size": family_size
    }
