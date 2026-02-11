import pandas as pd
import requests
import random
import time
import os

from dotenv import load_dotenv
from pymongo import MongoClient

# ==========================
# MongoDB Connection
# ==========================
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["bloodbuddy"]
donor_collection = db["donors"]

print("Connected to MongoDB ✅")

# ❌ IMPORTANT: No unique index creation
# We are allowing duplicate mobile numbers


# ==========================
# Valid Blood Groups
# ==========================
VALID_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]


# ==========================
# Amravati Random Coordinates
# ==========================
AMRAVATI_LAT_MIN = 20.90
AMRAVATI_LAT_MAX = 21.05
AMRAVATI_LON_MIN = 77.70
AMRAVATI_LON_MAX = 77.85


def random_amravati_coordinates():
    return (
        random.uniform(AMRAVATI_LAT_MIN, AMRAVATI_LAT_MAX),
        random.uniform(AMRAVATI_LON_MIN, AMRAVATI_LON_MAX),
    )


# ==========================
# Blood Group Normalizer
# ==========================
def normalize_blood_group(bg):

    if not bg or str(bg).strip().lower() in ["i don't know", "-", "_", ".", "na"]:
        return random.choice(VALID_GROUPS)

    bg = str(bg).strip().upper()

    bg = bg.replace("'", "").replace("(", "").replace(")", "")
    bg = bg.replace(",", "").replace("*", "").replace(".", "")
    bg = bg.replace("_", "").strip()

    bg = bg.replace("POSSITIVE", "POSITIVE")
    bg = bg.replace("POSTIVE", "POSITIVE")
    bg = bg.replace("POSITIVE", "+")
    bg = bg.replace("NEGATIVE", "-")
    bg = bg.replace("POS", "+")
    bg = bg.replace("NEG", "-")
    bg = bg.replace("VE", "")
    bg = bg.replace(" ", "")

    if bg.startswith("0"):
        bg = bg.replace("0", "O")

    if bg in VALID_GROUPS:
        return bg

    if bg.startswith("AB"):
        return "AB+" if "+" in bg else "AB-"

    if bg.startswith("A"):
        return "A+" if "+" in bg else "A-"

    if bg.startswith("B"):
        return "B+" if "+" in bg else "B-"

    if bg.startswith("O"):
        return "O+" if "+" in bg else "O-"

    return random.choice(VALID_GROUPS)


# ==========================
# Load Excel
# ==========================
file_path = "students.xlsx"
df = pd.read_excel(file_path)

print(f"Total rows found: {len(df)}")
print("Starting Import...\n")


try:
    for index, row in df.iterrows():

        name = row.get("Student Full Name")
        address = row.get("Permanent Address")
        mobile = str(row.get("Mobile Number")).strip()
        blood_group_raw = row.get("Blood Group")

        # Skip if mobile missing
        if not mobile or mobile.lower() == "nan":
            print(f"Skipping {name} (No mobile number)")
            continue

        print(f"Processing ({index+1}/{len(df)}): {name}")

        blood_group = normalize_blood_group(blood_group_raw)

        # ==========================
        # Handle Address
        # ==========================
        if pd.isna(address) or not str(address).strip():

            latitude, longitude = random_amravati_coordinates()
            city = "Amravati"

        else:
            address = str(address)

            try:
                response = requests.get(
                    "https://nominatim.openstreetmap.org/search",
                    params={
                        "format": "json",
                        "q": f"{address}, Maharashtra, India"
                    },
                    headers={
                        "User-Agent": "BloodBuddyBulkImport/1.0"
                    },
                    timeout=8
                )

                if response.status_code != 200:
                    raise Exception("Geocoding failed")

                data = response.json()

                if not data:
                    latitude, longitude = random_amravati_coordinates()
                    city = "Amravati"
                else:
                    latitude = float(data[0]["lat"])
                    longitude = float(data[0]["lon"])
                    city = address

                time.sleep(1)

            except Exception:
                latitude, longitude = random_amravati_coordinates()
                city = "Amravati"

        donor_document = {
            "name": name,
            "blood_group": blood_group,
            "city": city,
            "contact": mobile,
            "latitude": latitude,
            "longitude": longitude
        }

        
        donor_collection.insert_one(donor_document)

        print(f"✔ Inserted: {name} → {blood_group}")

except KeyboardInterrupt:
    print("\nImport Stopped Manually 🚫")

print("\nBulk Import Completed Successfully ✅")
