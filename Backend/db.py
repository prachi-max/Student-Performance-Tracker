from pymongo import MongoClient

# MongoDB connection
client = MongoClient(
    "mongodb://localhost:27017/"
)

# Database
db = client["studenttracker"]

# Collections
tasks_collection = db["tasks"]

users_collection = db["users"]