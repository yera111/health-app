from flask import Blueprint, jsonify

bp = Blueprint('main', __name__, url_prefix='/api')

@bp.route('/main', methods=['GET'])
def main():
    return jsonify({'message': 'Main page content placeholder'})
