from fastapi import APIRouter, HTTPException
from typing import List
from models.dtoModels import CategoryDto
from services import category_service  # твой сервис с функциями

router = APIRouter(prefix="/categories", tags=["categories"])  # <- важно


@router.get("", response_model=List[CategoryDto])
def get_categories():
    return category_service.list_categories()


@router.get("/{id}", response_model=CategoryDto)
def get_category(id: int):
    category = category_service.get_category_by_id(id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category
