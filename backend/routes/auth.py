from flask import Blueprint, request, jsonify
from db import get_db_connection
from services.auth_utils import hash_password,verify_password
from services.jwt_utils import create_token

auth_bp = Blueprint("auht",__name__)

@auth_bp.route("/register",methods=["POST", "OPTIONS"])
def register():
    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"error":"Email and password required"}, 400
    
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            insert into users(email,password_hash)
            values(%s,%s)
        """,
        (email,hash_password(password))
        )
        conn.commit()
        user_id = cursor.lastrowid

    except Exception:
        return {"error":"User already exists"}, 409
    finally:
        cursor.close()
        conn.close()

    token = create_token(user_id)
    return jsonify({"token":token}), 201


@auth_bp.route("/login", methods=["POST", "OPTIONS"])
def login():

    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT id, password_hash FROM users WHERE email=%s",
        (email,)
    )
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user or not verify_password(password, user["password_hash"]):
        return {"error": "Invalid credentials"}, 401

    token = create_token(user["id"])
    return jsonify({"token": token}), 200
