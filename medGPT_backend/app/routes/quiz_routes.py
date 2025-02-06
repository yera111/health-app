from flask import Blueprint, request, jsonify
import json
import os

QUIZ_FILE = "quiz_entries.json"

bp = Blueprint("quiz", __name__, url_prefix="/api")

def load_quiz_entries():
    if not os.path.exists(QUIZ_FILE):
        return {"users": {}}
    with open(QUIZ_FILE, "r") as f:
        return json.load(f)

def save_quiz_entries(data):
    with open(QUIZ_FILE, "w") as f:
        json.dump(data, f, indent=4)

@bp.route("/quiz", methods=["POST"])
def add_daily_quiz():
    data = load_quiz_entries()
    users = data.get("users", {})
    user_id = str(request.json.get("user_id"))

    if user_id not in users:
        return jsonify({"error": f"User with ID {user_id} not found"}), 404

    daily_entry = {
        "mood": request.json.get("mood"),
        "steps": request.json.get("steps"),
        "sleep_hours": request.json.get("sleep_hours"),
        "screen_time": request.json.get("screen_time"),
        "symptom_level": request.json.get("symptom_level"),
        "feel_trend": request.json.get("feel_trend"),
        "medication_adherence": request.json.get("medication_adherence"),
        "side_effects": request.json.get("side_effects"),
        "date": request.json.get("date")
    }

    users[user_id]["data"].append(daily_entry)
    save_quiz_entries(data)

    return jsonify({"message": "Daily entry added successfully", "entry": daily_entry}), 201
