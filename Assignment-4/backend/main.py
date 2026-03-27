from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import categories, exercises, auth
from database import engine, Base
from models import db_models

Base.metadata.create_all(bind=engine)
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/api")
app.include_router(categories.router, prefix="/api")
app.include_router(exercises.router, prefix="/api")
