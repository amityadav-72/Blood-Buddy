from fastapi import APIRouter, HTTPException, Query
from models.donor_model import Donor
from database.connection import donor_collection
from utils.geo_utils import calculate_distance

router = APIRouter(prefix="/donors")

# 🩸 Add new donor
@router.post("/add")
def add_donor(donor: Donor):
    donor_dict = donor.dict()
    result = donor_collection.insert_one(donor_dict)
    return {
        "message": "Donor added successfully",
        "id": str(result.inserted_id)
    }


# 📍 Get nearby donors
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

    # Filter by blood group
    if blood_group:
        donors = [
            d for d in donors
            if d.get("blood_group") == blood_group
        ]

    # Calculate distance
    for donor in donors:
        donor["distance_km"] = round(
            calculate_distance(
                lat,
                lon,
                donor["latitude"],
                donor["longitude"]
            ),
            2
        )

    # Sort by nearest
    sorted_donors = sorted(
        donors,
        key=lambda d: d["distance_km"]
    )[:limit]

    return {
        "count": len(sorted_donors),
        "donors": sorted_donors
    }