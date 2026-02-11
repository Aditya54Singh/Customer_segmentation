from flask import Blueprint, request, jsonify
from services.inference import predict_customer_segment
from db import get_db_connection
from services.jwt_utils import jwt_required

predict_bp = Blueprint("predict", __name__)


# ---------- Safe casting helpers ----------
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


@predict_bp.route("/predict", methods=["POST"])
@jwt_required
def predict():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        # ---------- ML inference ----------
        result = predict_customer_segment(data)

        # ---------- Safe numeric parsing ----------
        age = to_int(data.get("Age"))
        income = to_int(data.get("Income"))
        recency = to_int(data.get("Recency"))
        num_web_visits = to_int(data.get("NumWebVisitsMonth"))

        family_size = (
            to_int(data.get("Kidhome")) +
            to_int(data.get("Teenhome")) + 1
        )

        total_spending = sum(
            to_float(data.get(f)) for f in [
                "MntWines", "MntFruits", "MntMeatProducts",
                "MntFishProducts", "MntSweetProducts", "MntGoldProds"
            ]
        )

        total_purchases = (
            to_int(data.get("NumWebPurchases")) +
            to_int(data.get("NumStorePurchases"))
        )

        # ---------- Save to database ----------
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO prediction_history (
                user_id,
                age,
                income,
                recency,
                num_web_visits,
                family_size,
                total_spending,
                total_purchases,
                cluster_id,
                macro_segment,
                persona,
                confidence
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            request.user_id,
            age,
            income,
            recency,
            num_web_visits,
            family_size,
            total_spending,
            total_purchases,
            result["cluster_id"],
            result["macro_segment"],
            result["persona"],
            result["confidence"]
        ))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify(result), 200

    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400

    except Exception as e:
        print("🔥 Predict error:", e)  # DEBUG LOG
        return jsonify({"error": "Internal server error"}), 500
