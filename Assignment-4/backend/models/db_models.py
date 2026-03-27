from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, ForeignKey, DateTime
from database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    exercises = relationship("Exercise", back_populates="user")


class ExerciseCategory(Base):
    __tablename__ = "exercise_categories"

    exercise_id: Mapped[int] = mapped_column(
        ForeignKey("exercises.id"), primary_key=True
    )
    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id"), primary_key=True
    )


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String, nullable=True)

    exercises = relationship(
        "Exercise", secondary="exercise_categories", back_populates="categories"
    )


class Exercise(Base):
    __tablename__ = "exercises"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str]
    notes: Mapped[str]
    date: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)

    user = relationship("User", back_populates="exercises")
    categories = relationship(
        "Category", secondary="exercise_categories", back_populates="exercises"
    )
    fields = relationship("ExerciseField", back_populates="exercise")


class ExerciseField(Base):
    __tablename__ = "exercise_fields"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    exercise_id: Mapped[int] = mapped_column(ForeignKey("exercises.id"))
    name: Mapped[str]
    value: Mapped[str]
    unit: Mapped[str]

    exercise = relationship("Exercise", back_populates="fields")
