from flask import Blueprint, jsonify, request, json
import joblib
import pickle
bp = Blueprint('analysis', __name__, url_prefix='/api')

MODEL_PATH = "C:\\Users\\111\\Desktop\\py\\praxis\\multioutput_xgboost_model.pkl"
SCALER_PATH = "C:\\Users\\111\\Desktop\\py\\praxis\\scaler1.pkl"

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

scaler = joblib.load(SCALER_PATH)

def prepare_features_with_age_and_bmi(user_data, user_age, user_bmi):

    last_7_days = user_data[-7:]

    features = [
        [
            day["steps"],
            day["sleep_hours"],
            day["mood"],
            day["symptom_level"],
            day["medication_adherence"],
            day["side_effects"],
            day["feel_trend"],
        ]
        for day in last_7_days
    ]

    flattened_features = [item for sublist in features for item in sublist]

    additional_features = [user_age, user_bmi]

    return flattened_features + additional_features

from datetime import datetime, timedelta

@bp.route('/analysis', methods=['POST'])
def predict_next_week():
    try:
        input_data = request.json
        user_id = input_data.get("user_id")

        with open("quiz_entries.json", "r") as f:
            quiz_data = json.load(f)

        user = quiz_data["users"].get(str(user_id))
        if not user:
            return jsonify({"error": f"User with ID {user_id} not found"}), 404

        user_data = user["data"]
        user_age = user["age"]
        user_bmi = user["bmi"]

        if len(user_data) < 7:
            return jsonify({"error": "Insufficient data: at least 7 days of data are required."}), 400


        last_date_str = user_data[-1]["date"]
        last_date = datetime.strptime(last_date_str, "%Y-%m-%d")


        features = prepare_features_with_age_and_bmi(user_data, user_age, user_bmi)


        features_normalized = scaler.transform([features])

        print("Features shape:", len(features))
        print("Normalized features shape:", features_normalized.shape)


        predictions = model.predict(features_normalized)
        print("Predictions shape:", predictions.shape)


        predictions = predictions.flatten()


        daily_predictions_flat = predictions[:-1]
        complication_risk = predictions[-1]


        daily_predictions = daily_predictions_flat.reshape(7, 6)


        output = []
        for day_idx, day_predictions in enumerate(daily_predictions):
            prediction_date = last_date + timedelta(days=day_idx + 1)
            output.append({
                "date": prediction_date.strftime("%Y-%m-%d"),
                "steps": float(day_predictions[0]),
                "sleep_hours": float(day_predictions[1]),
                "mood": float(day_predictions[2]),
                "symptom_level": float(day_predictions[3]),
                "medication_adherence": float(day_predictions[4]),
                "side_effects": float(day_predictions[5]),
            })

        overall_risk = float(complication_risk)

        return jsonify({"daily_predictions": output, "overall_risk": overall_risk}), 200

    except Exception as e:
        print("Error in /analysis:", str(e))
        return jsonify({"error": str(e)}), 500
