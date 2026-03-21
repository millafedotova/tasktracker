from pydantic import BaseModel  # ty:ignore[unresolved-import]
from typing import List, Optional


class CategoryDto(BaseModel):
    id: int
    name: str
    description: Optional[str] = None


class ExerciseFieldDto(BaseModel):
    id: int
    name: str
    value: str
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


class ExerciseFieldCreate(BaseModel):
    name: str
    value: str
    unit: str


class ExerciseCreateRequest(BaseModel):
    name: str
    notes: str
    date: str
    categoryIds: List[int]
    fields: List[ExerciseFieldCreate]
