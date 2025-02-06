from flask import Blueprint, jsonify, request

from app.models.quiz_entry import QUIZ_DATA
from app.routes.model_quiz_routes import model, prepare_features_with_age_and_bmi

bp = Blueprint('analysis', __name__, url_prefix='/api')

@bp.route('/analysis', methods=['POST'])
def predict():
    try:
        user_id = request.json['user_id']
        user = next((u for u in QUIZ_DATA["users"] if u["id"] == user_id), None)
        if not user:
            return jsonify({'error': f'User {user_id} not found'}), 404


        last_7_days = user["data"][-7:]


        features = prepare_features_with_age_and_bmi(last_7_days)
        prediction = model.predict(features)
        return jsonify({'prediction': prediction.tolist()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
