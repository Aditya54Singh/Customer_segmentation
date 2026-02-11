from flask import Blueprint, jsonify, request
from db import get_db_connection
from services.jwt_utils import jwt_required

history_bp = Blueprint("history", __name__)

@history_bp.route("/history", methods=["GET"])
@jwt_required
def get_history():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT id, created_at, persona, macro_segment, confidence
        FROM prediction_history
        WHERE user_id = %s
        ORDER BY created_at DESC
    """, (request.user_id,))

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(rows), 200
