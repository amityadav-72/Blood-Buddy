from fastapi import APIRouter, HTTPException
from models.admin_model import *

router = APIRouter(prefix="/admin", tags=["Admin"])


# ===============================
# GET ALL DONORS
# ===============================
@router.get("/donors")
async def donors():
    return await get_all_donors()


# ===============================
# DELETE DONOR
# ===============================
@router.delete("/delete/{id}")
async def delete(id: str):
    deleted = await delete_donor(id)

    if deleted == 0:
        raise HTTPException(status_code=404, detail="Donor not found")

    return {"message": "Deleted successfully"}


# ===============================
# UPDATE DONOR
# ===============================
@router.put("/update/{id}")
async def update(id: str, data: dict):
    updated = await update_donor(id, data)

    if updated == 0:
        raise HTTPException(status_code=404, detail="No donor updated")

    return {"message": "Updated successfully"}