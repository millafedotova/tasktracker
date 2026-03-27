from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.dtoModels import ExerciseListItemDto, ExerciseDetailDto, ExerciseFieldDto
from services import exercise_service
from models.dtoModels import ExerciseCreateRequest
from models.db_models import User
from auth import get_current_user

router = APIRouter(prefix="/exercises", tags=["exercises"])


@router.post("", response_model=ExerciseDetailDto)
def create_exercise(data: ExerciseCreateRequest, current_user: User = Depends(get_current_user)):
    return exercise_service.create_exercise(data, current_user.id)


@router.put("/{id}", response_model=ExerciseDetailDto)
def update_exercise(id: int, data: ExerciseCreateRequest, current_user: User = Depends(get_current_user)):
    ex = exercise_service.update_exercise(id, data, current_user.id)

    if not ex:
        raise HTTPException(status_code=404)

    return ex


@router.get("", response_model=List[ExerciseListItemDto])
def get_exercises(current_user: User = Depends(get_current_user)):
    return exercise_service.list_exercises(current_user.id)


@router.get("/category/{category_id}", response_model=List[ExerciseListItemDto])
def get_exercises_by_category(category_id: int, current_user: User = Depends(get_current_user)):
    return exercise_service.list_exercises_by_category(category_id, current_user.id)


@router.get("/{id}", response_model=ExerciseDetailDto)
def get_exercise(id: int, current_user: User = Depends(get_current_user)):
    exercise = exercise_service.get_exercise_by_id(id, current_user.id)

    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    return exercise


@router.get("/{id}/fields", response_model=List[ExerciseFieldDto])
def get_exercise_fields(id: int, current_user: User = Depends(get_current_user)):
    fields = exercise_service.get_exercise_fields(id, current_user.id)

    if not fields:
        return []

    return fields
