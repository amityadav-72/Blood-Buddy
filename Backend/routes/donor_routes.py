from fastapi import APIRouter, HTTPException, Query
from models.donor_model import Donor
from database.connection import donor_collection
from utils.geo_utils import calculate_distance

# Add prefix so routes load correctly
router = APIRouter(prefix="/donors")

# 🩸 Add new donor
@router.post("/add")
def add_donor(donor: Donor):
    donor_dict = donor.dict()
    result = donor_collection.insert_one(donor_dict)
    return {"message": "Donor added successfully", "id": str(result.inserted_id)}

# 📍 Get nearest donors (with optional filters)
@router.get("/nearby")
def get_nearby_donors(
    lat: float = Query(...),
    lon: float = Query(...),
    blood_group: str = Query(None),
    limit: int = Query(10)
):
    donors = list(donor_collection.find({}, {"_id": 0}))
    if not donors:
        raise HTTPException(status_code=404, detail="No donors found")

    # blood group filter
    if blood_group:
        donors = [d for d in donors if d.get("blood_group") == blood_group]

    # calculate distance
    for donor in donors:
        donor["distance_km"] = round(
            calculate_distance(lat, lon, donor["latitude"], donor["longitude"]), 2
        )

    sorted_donors = sorted(donors, key=lambda d: d["distance_km"])[:limit]
    return {"count": len(sorted_donors), "donors": sorted_donors}
