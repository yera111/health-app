import json
from app.models.user import User
import os

DIARY_FILE = "diary_entries.json"
DIARY_DATA = {}

def load_diary_entries():
    try:
        with open(DIARY_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"users": {}}
    except Exception as e:
        print(f"Ошибка при загрузке файла: {e}")
        return {"users": {}}

def save_diary_entries(data):
    try:
        with open(DIARY_FILE, "w") as f:
            json.dump(data, f, indent=4)
    except Exception as e:
        print(f"Ошибка при сохранении файла: {e}")

class DiaryEntry:
    @staticmethod
    def initialize_data():
        global DIARY_DATA
        print("Инициализация данных дневника...")
        if not os.path.exists(DIARY_FILE):
            print("Файл дневника не найден. Создаем новый файл.")
            users = User.get_all()
            print(f"Пользователи: {users}")
            DIARY_DATA = {
                "users": {str(user["id"]): {**user, "data": []} for user in users}
            }
            save_diary_entries(DIARY_DATA)
        else:
            print("Файл дневника найден. Загрузка данных.")
            DIARY_DATA = load_diary_entries()

        if "users" not in DIARY_DATA:
            DIARY_DATA["users"] = {}
            print("Добавлен отсутствующий ключ 'users'.")
