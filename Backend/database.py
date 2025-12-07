from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# Example: MONGO_URI = "mongodb://localhost:27017"
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["bloodbuddy"]
donor_collection = db["donors"]
