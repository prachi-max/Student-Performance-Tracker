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

    result = subprocess.check_output(

        ['python',
        'ml/predict/predict_recommendation.py']

    )

    return jsonify({

        "result":
        result.decode('utf-8')

    })