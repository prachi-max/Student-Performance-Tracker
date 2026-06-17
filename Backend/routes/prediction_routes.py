import os
import subprocess
from flask import Blueprint, jsonify
from pymongo import MongoClient
from db import db
prediction_bp = Blueprint(
    'prediction',
    __name__
)

@prediction_bp.route(
    '/predict-performance/<user_id>',
    methods=['GET']
)
def subject_performance():

    try:

        result = subprocess.check_output(
            [
                'python',
                'ml/predict/predict_subject.py'
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
def predict_performance(user_id):

    client = MongoClient(
        os.environ["MONGO_URI"]
    )

    db = client["test"]

    tasks = list(
    db["tasks"].find({
        "userId": user_id
    })
    )
    print("USER_ID RECEIVED:", user_id)
    print("TASKS FOUND:", len(tasks))
    print(tasks)

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