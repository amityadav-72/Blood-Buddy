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

    if not bg or str(bg).strip().lower() in ["nan", "na", "-", "_", ".", "i don't know"]:
        return None   # ❗ DO NOT assign random group

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

    return None


# ==========================
# Load Excel
# ==========================
file_path = "students.xlsx"

df = pd.read_excel(
    file_path,
    dtype={
        "Mobile Number": str,
        "Blood Group": str
    }
)

# Clean column names
df.columns = df.columns.str.strip()

print("Columns found:", df.columns.tolist())
print(f"Total rows found: {len(df)}")
print("Starting Import...\n")

# ==========================
# Counters
# ==========================
inserted = 0
skipped_mobile = 0
skipped_blood_group = 0

# ==========================
# Import Loop
# ==========================
try:
    for index, row in df.iterrows():

        name = str(row.get("Student Full Name", "")).strip()
        address = row.get("Permanent Address")
        mobile = str(row.get("Mobile Number", "")).strip()
        blood_group_raw = str(row.get("Blood Group", "")).strip()

        print(f"\nProcessing ({index+1}/{len(df)}): {name}")
        print("RAW BG →", blood_group_raw)

        # ==========================
        # Validate Mobile
        # ==========================
        mobile = mobile.replace(".0", "")
        mobile = "".join(filter(str.isdigit, mobile))

        if len(mobile) != 10:
            print("❌ Skipped (Invalid mobile)")
            skipped_mobile += 1
            continue

        # ==========================
        # Normalize Blood Group
        # ==========================
        blood_group = normalize_blood_group(blood_group_raw)

        if not blood_group:
            print("❌ Skipped (Invalid blood group)")
            skipped_blood_group += 1
            continue

        # ==========================
        # Handle Address / Geocoding
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
                    headers={"User-Agent": "BloodBuddyBulkImport/1.0"},
                    timeout=8
                )

                data = response.json()

                if not data:
                    latitude, longitude = random_amravati_coordinates()
                    city = "Amravati"
                else:
                    latitude = float(data[0]["lat"])
                    longitude = float(data[0]["lon"])
                    city = address

                time.sleep(1)

            except:
                latitude, longitude = random_amravati_coordinates()
                city = "Amravati"

        # ==========================
        # Insert into MongoDB
        # ==========================
        donor_document = {
            "name": name,
            "blood_group": blood_group,
            "city": city,
            "contact": mobile,
            "latitude": latitude,
            "longitude": longitude
        }

        donor_collection.insert_one(donor_document)

        inserted += 1
        print(f"✔ Inserted: {name} → {blood_group}")

except KeyboardInterrupt:
    print("\nImport stopped manually 🚫")

# ==========================
# Final Report
# ==========================
print("\n✅ Bulk Import Completed")
print("Inserted:", inserted)
print("Skipped (Mobile):", skipped_mobile)
print("Skipped (Blood Group):", skipped_blood_group)
