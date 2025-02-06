from flask import Flask
from flask_cors import CORS

from app.models.diary_entry import DiaryEntry
from app.routes import user_routes, quiz_routes, main_routes, model_quiz_routes, diary_routes


def create_app():
    app = Flask(__name__)

    app.config.from_object('app.config.Config')

    DiaryEntry.initialize_data()

    CORS(app)


    app.register_blueprint(user_routes.bp, url_prefix='/api')
    app.register_blueprint(main_routes.bp, url_prefix='/api')
    app.register_blueprint(quiz_routes.bp, url_prefix='/api')
    app.register_blueprint(model_quiz_routes.bp, url_prefix='/api')
    app.register_blueprint(diary_routes.bp, url_prefix='/api')


    return app
