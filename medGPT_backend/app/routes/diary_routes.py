from datetime import datetime
from collections import defaultdict

from flask import Blueprint, request, jsonify
import json
import os
from transformers import BertTokenizer, BertForSequenceClassification
import torch

from app.models.diary_entry import DIARY_FILE

DIARY_FILE = "diary_entries.json"

MODEL_NAME = "bert-base-uncased"
tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)
model = BertForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=5)  # Для 5 параметров

bp = Blueprint("diary", __name__, url_prefix="/api")

def load_diary_entries():
    if not os.path.exists(DIARY_FILE):
        return {"users": {}}
    with open(DIARY_FILE, "r") as f:
        return json.load(f)

def save_diary_entries(data):
    with open(DIARY_FILE, "w") as f:
        json.dump(data, f, indent=4)

@bp.route("/diary/create", methods=["POST"])
def add_daily_diary():
    data = load_diary_entries()
    users = data.get("users", {})
    user_id = str(request.json.get("user_id"))

    if user_id not in users:
        return jsonify({"error": f"User with ID {user_id} not found"}), 404


    daily_entry = {
        "text": request.json.get("text"),
        "date": request.json.get("date")
    }

    users[user_id]["data"].append(daily_entry)
    save_diary_entries(data)

    return jsonify({"message": "Daily entry added successfully", "entry": daily_entry}), 201

@bp.route("/diary", methods=["GET"])
def get_all_diary():

    data = load_diary_entries()
    users = data.get("users", {})

    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    if user_id not in users:
        return jsonify({"error": f"User with ID {user_id} not found"}), 404

    user_data = users[user_id].get("data", [])
    if not user_data:
        return jsonify({"error": f"No entries found for User ID {user_id}"}), 404

    return jsonify({"texts": user_data}), 200

def map_to_trend(value):

    if value < -0.5:
        return -1
    elif value > 0.5:
        return 1
    return 0




@bp.route("/diary/analyze", methods=["POST"])
def analyze_diary_entry():

    try:
        input_data = request.json
        user_id = str(input_data.get("user_id"))
        text = input_data.get("text")
        date = input_data.get("date", "N/A")

        if not user_id or not text:
            return jsonify({"error": "User ID and text are required"}), 400

        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)

        outputs = model(**inputs)
        logits = outputs.logits
        predictions = torch.softmax(logits, dim=1).detach().numpy().flatten()


        mood = round(predictions[0] * 5)
        symptom_level = round(predictions[1] * 5)
        feel_trend = map_to_trend(predictions[2] * 2 - 1)
        medication_adherence = round(predictions[3] * 5)
        side_effects = round(predictions[4] * 5)

        analyzed_entry = {
            "text": text,
            "mood": mood,
            "symptom_level": symptom_level,
            "feel_trend": feel_trend,
            "medication_adherence": medication_adherence,
            "side_effects": side_effects,
            "date": date
        }

        with open("diary_entries.json", "r") as f:
            diary_data = json.load(f)

        if user_id not in diary_data["users"]:
            return jsonify({"error": f"User with ID {user_id} not found"}), 404

        diary_data["users"][user_id]["data"].append(analyzed_entry)

        with open("diary_entries.json", "w") as f:
            json.dump(diary_data, f, indent=4)

        return jsonify({"user_id": user_id, "analyzed_entry": analyzed_entry}), 200

    except Exception as e:
        print("Error analyzing diary entry:", str(e))
        return jsonify({"error": str(e)}), 500

@bp.route("/combine", methods=["POST"])
def combine_data():
    try:
        with open("diary_entries.json", "r") as diary_file:
            diary_data = json.load(diary_file)

        with open("quiz_entries.json", "r") as quiz_file:
            quiz_data = json.load(quiz_file)

        combined_data = defaultdict(lambda: {"user_info": {}, "data": []})

        for user_id, diary_user in diary_data["users"].items():

            diary_user_info = {
                "id": diary_user["id"],
                "username": diary_user["username"],
                "age": diary_user["age"],
                "bmi": diary_user["bmi"],
            }

            quiz_user = quiz_data["users"].get(user_id, {})
            quiz_user_info = {
                "id": quiz_user.get("id", diary_user_info["id"]),
                "username": quiz_user.get("username", diary_user_info["username"]),
                "age": quiz_user.get("age", diary_user_info["age"]),
                "bmi": quiz_user.get("bmi", diary_user_info["bmi"]),
            }


            combined_data[user_id]["user_info"] = {**diary_user_info, **quiz_user_info}


            diary_entries = {entry["date"]: entry for entry in diary_user["data"]}
            quiz_entries = quiz_user.get("data", [])
            quiz_entries_by_date = {entry["date"]: entry for entry in quiz_entries}


            all_dates = sorted(set(diary_entries.keys()).union(quiz_entries_by_date.keys()), key=lambda x: datetime.strptime(x, "%Y-%m-%d"))


            for date in all_dates:
                diary_entry = diary_entries.get(date, {})
                quiz_entry = quiz_entries_by_date.get(date, {})

                combined_entry = {"date": date}

                for key in ["mood", "symptom_level", "feel_trend", "medication_adherence", "side_effects"]:
                    diary_value = float(diary_entry.get(key, 0))
                    quiz_value = float(quiz_entry.get(key, 0))

                    if diary_value and quiz_value:
                        combined_entry[key] = (diary_value + quiz_value) / 2
                    else:
                        combined_entry[key] = diary_value or quiz_value

                for key in ["steps", "sleep_hours", "screen_time"]:
                    combined_entry[key] = quiz_entry.get(key, None)

                if "text" in diary_entry:
                    combined_entry["text"] = diary_entry["text"]

                combined_data[user_id]["data"].append(combined_entry)

        for user_id, user_data in combined_data.items():
            user_data["data"] = sorted(user_data["data"], key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"))

        final_combined_data = {"users": combined_data}

        with open("combined_entries.json", "w") as combined_file:
            json.dump(final_combined_data, combined_file, indent=4)

        return jsonify({"message": "Data combined successfully!"}), 200

    except Exception as e:
        print("Error combining data:", e)
        return jsonify({"error": "Failed to combine data"}), 500