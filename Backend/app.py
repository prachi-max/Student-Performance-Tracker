from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from routes.recommendation_routes import recommendation_bp
from routes.prediction_routes import prediction_bp

app = Flask(__name__)

# ENABLE CORS

CORS(app)

# REGISTER ML ROUTES

app.register_blueprint(prediction_bp)

# MONGODB CONNECTION

client = MongoClient(
    "mongodb://localhost:27017/"
)

db = client["studenttracker"]

tasks_collection = db["tasks"]

# HOME ROUTE

@app.route('/')

def home():

    return "Flask Running"

# ADD TASK API
app.register_blueprint(
    recommendation_bp
)
@app.route(
    '/api/tasks',
    methods=['POST']
)

def add_task():

    data = request.json

    tasks_collection.insert_one(data)

    return jsonify({

        "message":
        "Task added successfully"

    })

# RUN APP

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5001
    )