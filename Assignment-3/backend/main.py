from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import categories, exercises  # <- Python должен видеть эти файлы

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Роутеры
app.include_router(categories.router, prefix="/api")  # <- теперь router есть
app.include_router(exercises.router, prefix="/api")
