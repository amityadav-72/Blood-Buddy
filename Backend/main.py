from fastapi import FastAPI
from routes.donor_routes import router as donor_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Blood Buddy API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(donor_router)

@app.get("/")
def root():
    return {"message": "Welcome to Blood Buddy API"}
