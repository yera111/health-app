import json
from app.models.user import User
import os

QUIZ_FILE = "quiz_entries.json"
QUIZ_DATA = {}

def load_quiz_entries():
    try:
        with open(QUIZ_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"users": {}}

def save_quiz_entries(data):
    with open(QUIZ_FILE, "w") as f:
        json.dump(data, f, indent=4)

class QuizEntry:
    @staticmethod
    def initialize_data():
        global QUIZ_DATA
        if not os.path.exists(QUIZ_FILE):
            QUIZ_DATA = {
                "users": {str(user["id"]): {**user, "data": []} for user in User.get_all()}
            }
            save_quiz_entries(QUIZ_DATA)
        else:
            QUIZ_DATA = load_quiz_entries()

        if "users" not in QUIZ_DATA:
            QUIZ_DATA["users"] = {}
