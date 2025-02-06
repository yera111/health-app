from flask import Blueprint, jsonify, request
import json
import os

QUIZ_FILE = "quiz_entries.json"

bp = Blueprint('user', __name__, url_prefix='/api')

def load_quiz_entries():
    if not os.path.exists(QUIZ_FILE):
        return {"users": {}}
    with open(QUIZ_FILE, "r") as f:
        return json.load(f)

@bp.route('/users', methods=['GET'])
def get_users():
    data = load_quiz_entries()
    users = [
        {"id": user["id"], "username": user["username"], "age": user["age"]}
        for user in data["users"].values()
    ]
    return jsonify(users), 200

@bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_data(user_id):
    data = load_quiz_entries()
    user = data["users"].get(str(user_id))
    if not user:
        return jsonify({"error": f"User with ID {user_id} not found"}), 404
    return jsonify(user), 200