from pydantic import BaseModel  # ty:ignore[unresolved-import]
from typing import List, Optional


class CategoryDto(BaseModel):
    id: int
    name: str
    description: Optional[str] = None  # теперь можно не передавать


class ExerciseFieldDto(BaseModel):
    id: int
    name: str
    value: str  # строка, как на фронте
    unit: str


class ExerciseListItemDto(BaseModel):
    id: int
    name: str
    date: str
    notes: str
    categories: List[CategoryDto]


class ExerciseDetailDto(BaseModel):
    id: int
    name: str
    date: str
    notes: str
    categories: List[CategoryDto]
    fields: List[ExerciseFieldDto]
