from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB URI
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

# MongoDB Client
client = MongoClient(MONGO_URI)

# Database
db = client["bloodbuddy"]

# Collection
donor_collection = db["donors"]

# Alias for admin model
collection = donor_collection