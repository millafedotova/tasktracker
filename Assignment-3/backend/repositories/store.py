from sqlalchemy import select, delete
from database import SessionLocal
from models.db_models import Exercise, Category, ExerciseField, ExerciseCategory


def get_all_exercises():
    with SessionLocal() as db:
        return db.scalars(select(Exercise)).all()


def get_exercise_by_id(exercise_id: int):
    with SessionLocal() as db:
        return db.get(Exercise, exercise_id)


def get_all_categories():
    with SessionLocal() as db:
        return db.scalars(select(Category)).all()


def get_category_by_id(category_id: int):
    with SessionLocal() as db:
        return db.get(Category, category_id)


def get_exercise_category_ids(exercise_id: int):
    with SessionLocal() as db:
        result = db.execute(
            select(ExerciseCategory.category_id).where(
                ExerciseCategory.exercise_id == exercise_id
            )
        )
        return [r[0] for r in result]


def get_exercise_fields(exercise_id: int):
    with SessionLocal() as db:
        return db.scalars(
            select(ExerciseField).where(ExerciseField.exercise_id == exercise_id)
        ).all()


def create_exercise(data):
    with SessionLocal() as db:
        exercise = Exercise(name=data.name, notes=data.notes, date=data.date)
        db.add(exercise)
        db.flush()

        for cat_id in data.categoryIds:
            db.add(ExerciseCategory(exercise_id=exercise.id, category_id=cat_id))

        for f in data.fields:
            db.add(
                ExerciseField(
                    exercise_id=exercise.id, name=f.name, value=f.value, unit=f.unit
                )
            )

        db.commit()
        db.refresh(exercise)
        exercise_id = exercise.id
        db.expunge(exercise)
        return exercise


def update_exercise(exercise_id, data):
    with SessionLocal() as db:
        exercise = db.get(Exercise, exercise_id)

        if not exercise:
            return None

        exercise.name = data.name
        exercise.notes = data.notes
        exercise.date = data.date

        db.execute(
            delete(ExerciseCategory).where(
                ExerciseCategory.exercise_id == exercise_id
            )
        )
        for cat_id in data.categoryIds:
            db.add(ExerciseCategory(exercise_id=exercise_id, category_id=cat_id))

        db.execute(
            delete(ExerciseField).where(ExerciseField.exercise_id == exercise_id)
        )
        for f in data.fields:
            db.add(
                ExerciseField(
                    exercise_id=exercise_id, name=f.name, value=f.value, unit=f.unit
                )
            )

        db.commit()
        exercise_id_val = exercise.id
        db.expunge(exercise)
        return exercise
