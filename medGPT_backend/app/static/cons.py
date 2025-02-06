import json
from collections import defaultdict
from datetime import datetime

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

print("Data combined and saved to 'combined_entries.json'")
