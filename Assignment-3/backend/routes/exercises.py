from fastapi import APIRouter, HTTPException
from typing import List
from models.dtoModels import ExerciseListItemDto, ExerciseDetailDto, ExerciseFieldDto
from services import exercise_service
from models.dtoModels import ExerciseCreateRequest

router = APIRouter(prefix="/exercises", tags=["exercises"])  # ← ВАЖНО СЮДА


@router.post("", response_model=ExerciseDetailDto)
def create_exercise(data: ExerciseCreateRequest):
    return exercise_service.create_exercise(data)


@router.put("/{id}", response_model=ExerciseDetailDto)
def update_exercise(id: int, data: ExerciseCreateRequest):
    ex = exercise_service.update_exercise(id, data)

    if not ex:
        raise HTTPException(status_code=404)

    return ex


@router.get("", response_model=List[ExerciseListItemDto])
def get_exercises():
    return exercise_service.list_exercises()


@router.get("/category/{category_id}", response_model=List[ExerciseListItemDto])
def get_exercises_by_category(category_id: int):
    return exercise_service.list_exercises_by_category(category_id)


@router.get("/{id}", response_model=ExerciseDetailDto)
def get_exercise(id: int):
    exercise = exercise_service.get_exercise_by_id(id)

    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    return exercise


@router.get("/{id}/fields", response_model=List[ExerciseFieldDto])
def get_exercise_fields(id: int):
    fields = exercise_service.get_exercise_fields(id)

    if not fields:
        return []

    return fields
