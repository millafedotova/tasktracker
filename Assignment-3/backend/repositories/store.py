from sqlalchemy import select
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

        # 🔥 ВАЖНО: сразу загрузим связи вручную
        db.expunge(exercise)  # отключаем от сессии

        return exercise


def update_exercise(exercise_id, data):
    with SessionLocal() as db:
        exercise = db.get(Exercise, exercise_id)

        if not exercise:
            return None

        exercise.name = data.name
        exercise.notes = data.notes
        exercise.date = data.date

        # удалить старые категории
        db.query(ExerciseCategory).filter_by(exercise_id=exercise_id).delete()

        for cat_id in data.categoryIds:
            db.add(ExerciseCategory(exercise_id=exercise_id, category_id=cat_id))

        # удалить старые поля
        db.query(ExerciseField).filter_by(exercise_id=exercise_id).delete()

        for f in data.fields:
            db.add(
                ExerciseField(
                    exercise_id=exercise_id, name=f.name, value=f.value, unit=f.unit
                )
            )

        db.commit()
        return exercise
