from pymongo import MongoClient
import os
from pymongo import MongoClient
# MongoDB connection
client = MongoClient(os.environ["MONGO_URI"])

# Database
db = client["studenttracker"]

# Collections
tasks_collection = db["tasks"]

users_collection = db["users"]