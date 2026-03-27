from pydantic import BaseModel
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


class UserCreate(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str


class Token(BaseModel):
    access_token: str
    token_type: str
