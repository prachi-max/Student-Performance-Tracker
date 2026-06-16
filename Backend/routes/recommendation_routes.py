from flask import Blueprint, jsonify
import subprocess

recommendation_bp = Blueprint(
    'recommendation',
    __name__
)

@recommendation_bp.route(
    '/api/recommend-tasks',
    methods=['GET']
)
def recommend_tasks():

    try:

        result = subprocess.check_output(
            [
                'python',
                'ml/predict/predict_recommendation.py'
            ]
        )

        return jsonify({
            "result":
            result.decode('utf-8')
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
def recommend_tasks():

    try:

        result = subprocess.check_output(
            ['python',
             'ml/predict/predict_recommendation.py'],
            stderr=subprocess.STDOUT
        )

        return jsonify({
            "result": result.decode('utf-8')
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500