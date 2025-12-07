from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Get MongoDB URI from environment or default to local
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

# Connect to MongoDB
client = MongoClient(MONGO_URI)

# Use your database and collection
db = client["bloodbuddy"]
donor_collection = db["donors"]
