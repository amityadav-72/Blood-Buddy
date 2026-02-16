import pandas as pd
import requests
import random
import time
import os

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

# ==========================
# MongoDB Connection
# ==========================
load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
db = client["bloodbuddy"]
donor_collection = db["donors"]

donor_collection.create_index("contact", unique=True)

print("Connected to MongoDB ✅")

# ==========================
# Validation Functions
# ==========================
def is_valid_name(name):
    return bool(name and name.strip() and len(name.strip()) >= 3)


def is_valid_mobile(mobile):
    mobile = "".join(filter(str.isdigit, str(mobile)))
    return len(mobile) == 10 and mobile[0] in "6789"


def is_valid_coordinate(lat, lon):
    return -90 <= lat <= 90 and -180 <= lon <= 180


# ==========================
# Blood Group Normalizer
# ==========================
VALID_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

def normalize_blood_group(bg):

    if not bg or str(bg).strip().lower() in ["nan", "na", "-", "_", ".", "i don't know"]:
        return None

    bg = str(bg).strip().upper().replace(" ", "")

    bg = bg.replace("POSITIVE", "+").replace("NEGATIVE", "-")
    bg = bg.replace("POS", "+").replace("NEG", "-")

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

    return None


# ==========================
# Random Amravati Coordinates
# ==========================
def random_amravati_coordinates():
    return (
        random.uniform(20.90, 21.05),
        random.uniform(77.70, 77.85),
    )


# ==========================
# Load Excel
# ==========================
df = pd.read_excel("students.xlsx", dtype=str)
df.columns = df.columns.str.strip()

df.dropna(how="all", inplace=True)
df.drop_duplicates(subset=["Mobile Number"], inplace=True)

print("Total rows after cleaning:", len(df))

# ==========================
# Counters
# ==========================
inserted = 0
skipped_mobile = 0
invalid_name = 0
missing_blood_group = 0

# ==========================
# Import Loop
# ==========================
for index, row in df.iterrows():

    name = str(row.get("Student Full Name", "")).strip()
    mobile = str(row.get("Mobile Number", "")).strip()
    address = row.get("Permanent Address")
    blood_group_raw = row.get("Blood Group")

    print(f"\nProcessing {index+1}: {name} | RAW BG: {blood_group_raw}")

    # ✅ Name validation
    if not is_valid_name(name):
        print("❌ Skipped → Invalid name")
        invalid_name += 1
        continue

    # ✅ Mobile validation
    mobile = mobile.replace(".0", "")
    if not is_valid_mobile(mobile):
        print("❌ Skipped → Invalid mobile")
        skipped_mobile += 1
        continue

    mobile = "".join(filter(str.isdigit, mobile))

    # ✅ Normalize blood group
    blood_group = normalize_blood_group(blood_group_raw)
    print("Normalized BG →", blood_group)

    if not blood_group:
        missing_blood_group += 1

    # ==========================
    # Address → Geocoding
    # ==========================
    if pd.isna(address) or not str(address).strip():
        latitude, longitude = random_amravati_coordinates()
        city = "Amravati"

    else:
        try:
            response = requests.get(
                "https://nominatim.openstreetmap.org/search",
                params={"format": "json", "q": f"{address}, Maharashtra, India"},
                headers={"User-Agent": "BloodBuddy"},
                timeout=8,
            )

            data = response.json()

            if data:
                latitude = float(data[0]["lat"])
                longitude = float(data[0]["lon"])
                city = address
            else:
                latitude, longitude = random_amravati_coordinates()
                city = "Amravati"

            time.sleep(1)

        except:
            latitude, longitude = random_amravati_coordinates()
            city = "Amravati"

    # ✅ Coordinate safety
    if not is_valid_coordinate(latitude, longitude):
        latitude, longitude = random_amravati_coordinates()

    # ==========================
    # Prepare document
    # ==========================
    donor = {
        "name": name,
        "contact": mobile,
        "blood_group": blood_group,  # can be None
        "city": city,
        "latitude": latitude,
        "longitude": longitude,
    }

    # ==========================
    # Insert into MongoDB
    # ==========================
    try:
        donor_collection.insert_one(donor)
        inserted += 1

        print(
            f"✔ Inserted → {name} | BG: {blood_group if blood_group else 'No BG'} | 📱 {mobile}"
        )

    except DuplicateKeyError:
        print("⚠ Skipped → Duplicate mobile")
        skipped_mobile += 1


# ==========================
# Final Report
# ==========================
print("\n✅ IMPORT COMPLETED")
print("Inserted:", inserted)
print("Skipped Invalid Mobile:", skipped_mobile)
print("Skipped Invalid Name:", invalid_name)
print("Inserted With Missing Blood Group:", missing_blood_group)
