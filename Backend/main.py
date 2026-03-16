from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.donor_routes import router as donor_router
from routes.admin_routes import router as admin_router

app = FastAPI(
    title="Blood Buddy API",
    version="1.0"
)

# ===============================
# CORS Middleware
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# Include Routers
# ===============================
app.include_router(donor_router)
app.include_router(admin_router)

# ===============================
# Root Route
# ===============================
@app.get("/")
def root():
    return {"message": "Welcome to Blood Buddy API"}