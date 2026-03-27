"""Seed the database with initial data matching the Iteration 2 in-memory store."""

from sqlalchemy import select
from database import SessionLocal, engine, Base
from models.db_models import Category, Exercise, ExerciseCategory, ExerciseField


def seed():
    Base.metadata.create_all(bind=engine)

    with SessionLocal() as session:
        if session.scalars(select(Category)).first():
            print("Database already seeded, skipping.")
            return

        categories = [
            Category(name="Cardio", description="Cardiovascular exercises"),
            Category(name="Strength", description="Resistance and weight training"),
            Category(name="Running", description="Running and jogging"),
            Category(name="Swimming", description="Pool and open water swimming"),
            Category(name="Trail", description="Trail and outdoor activities"),
        ]
        session.add_all(categories)
        session.flush()

        exercises = [
            Exercise(name="Bench press", notes="Flat bench, felt strong", date="2025-02-01T10:00:00"),
            Exercise(name="Morning run", notes="Easy 5k along the river", date="2025-02-02T07:30:00"),
            Exercise(name="Swimming laps", notes="30 min freestyle", date="2025-02-02T18:00:00"),
            Exercise(name="Squats", notes="Back squat 4x5", date="2025-02-03T09:00:00"),
            Exercise(name="Trail run", notes="Hilly 8k", date="2025-01-28T08:00:00"),
            Exercise(name="Deadlift", notes="Conventional 3x5", date="2025-02-01T10:45:00"),
        ]
        session.add_all(exercises)
        session.flush()

        links = [
            (1, 2), (4, 2), (6, 2),
            (2, 1), (2, 3), (3, 1), (3, 4), (5, 1), (5, 3), (5, 5),
        ]
        for ex_id, cat_id in links:
            session.add(ExerciseCategory(exercise_id=ex_id, category_id=cat_id))

        fields_data = [
            (1, "weight", "100", "kg"), (1, "sets", "3", "reps"), (1, "reps", "8", "reps"),
            (2, "distance", "5", "km"), (2, "duration", "30", "min"),
            (3, "duration", "30", "min"), (3, "laps", "20", "laps"),
            (4, "weight", "120", "kg"), (4, "sets", "4", "reps"), (4, "reps", "5", "reps"),
            (5, "distance", "8", "km"), (5, "duration", "45", "min"),
            (6, "weight", "140", "kg"), (6, "sets", "3", "reps"), (6, "reps", "5", "reps"),
        ]
        for ex_id, name, value, unit in fields_data:
            session.add(ExerciseField(exercise_id=ex_id, name=name, value=value, unit=unit))

        session.commit()
        print("Database seeded successfully.")


if __name__ == "__main__":
    seed()
