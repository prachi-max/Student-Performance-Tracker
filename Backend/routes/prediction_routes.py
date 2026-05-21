from flask import Blueprint, jsonify
from pymongo import MongoClient

prediction_bp = Blueprint(
    'prediction',
    __name__
)

@prediction_bp.route(
    '/predict-performance/<user_id>',
    methods=['GET']
)

def predict_performance(user_id):

    client = MongoClient(
        "mongodb://localhost:27017/"
    )

    db = client["studenttracker"]

    tasks = list(
        db["tasks"].find({
            "userId": user_id
        })
    )

    completed_tasks = len([
        t for t in tasks
        if t['status'] == 'Completed'
    ])

    pending_tasks = len([
        t for t in tasks
        if t['status'] == 'Pending'
    ])

    hard_tasks = len([
        t for t in tasks
        if t['difficulty'] == 'Hard'
    ])

    total_tasks = len(tasks)

    # SIMPLE ML PERFORMANCE SCORE

    if total_tasks == 0:

        predicted_performance = 0

    else:

        predicted_performance = round(

            (
                completed_tasks /
                total_tasks
            ) * 100,

            2

        )

    return jsonify({

        "completed_tasks":
        completed_tasks,

        "pending_tasks":
        pending_tasks,

        "hard_tasks":
        hard_tasks,

        "predicted_performance":
        predicted_performance

    })