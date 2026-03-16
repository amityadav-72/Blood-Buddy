from database.connection import collection
from bson import ObjectId


# ===============================
# GET ALL DONORS
# ===============================
async def get_all_donors():
    donors = []

    for donor in collection.find():
        donor["_id"] = str(donor["_id"])
        donors.append(donor)

    return donors


# ===============================
# SEARCH DONOR BY NAME
# ===============================
async def search_donor_by_name(name: str):
    donors = []

    for donor in collection.find({
        "name": {"$regex": name, "$options": "i"}
    }):
        donor["_id"] = str(donor["_id"])
        donors.append(donor)

    return donors


# ===============================
# FILTER BY BLOOD GROUP
# ===============================
async def filter_by_blood_group(blood_group: str):
    donors = []

    for donor in collection.find({
        "blood_group": blood_group
    }):
        donor["_id"] = str(donor["_id"])
        donors.append(donor)

    return donors


# ===============================
# FILTER BY LOCATION
# ===============================
async def filter_by_location(location: str):
    donors = []

    for donor in collection.find({
        "location": {"$regex": location, "$options": "i"}
    }):
        donor["_id"] = str(donor["_id"])
        donors.append(donor)

    return donors


# ===============================
# ADD DONOR
# ===============================
async def add_donor(data: dict):
    result = collection.insert_one(data)
    return str(result.inserted_id)


# ===============================
# UPDATE DONOR
# ===============================
async def update_donor(id: str, data: dict):
    result = collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": data}
    )
    return result.modified_count


# ===============================
# DELETE DONOR
# ===============================
async def delete_donor(id: str):
    result = collection.delete_one({
        "_id": ObjectId(id)
    })
    return result.deleted_count