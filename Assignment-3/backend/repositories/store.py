# backend/repositories/store.py

# --- Mock Categories ---
categories = [
    {"id": 1, "name": "Strength", "description": "Strength training"},
    {"id": 2, "name": "Cardio", "description": "Cardio exercises"},
    {"id": 3, "name": "Mobility", "description": "Stretching and mobility"},
]

# --- Mock Exercises ---
exercises = [
    {"id": 1, "name": "Bench Press", "date": "2026-03-04", "notes": "Chest day"},
    {"id": 2, "name": "Running", "date": "2026-03-03", "notes": "Morning run"},
    {"id": 3, "name": "Squat", "date": "2026-03-02", "notes": "Leg day"},
]

# --- Exercise ↔ Category links ---
exercise_categories = [
    {"exercise_id": 1, "category_id": 1},  # Bench Press → Strength
    {"exercise_id": 2, "category_id": 2},  # Running → Cardio
    {"exercise_id": 3, "category_id": 1},  # Squat → Strength
]

# --- Exercise Fields ---
exercise_fields = [
    {"id": 1, "exercise_id": 1, "name": "Weight", "unit": "kg", "value": 60},
    {"id": 2, "exercise_id": 1, "name": "Reps", "unit": "count", "value": 10},
    {"id": 3, "exercise_id": 2, "name": "Distance", "unit": "km", "value": 5},
    {"id": 4, "exercise_id": 3, "name": "Weight", "unit": "kg", "value": 80},
]

# ---------------- Category ----------------


def get_all_categories():
    return categories


def get_category_by_id(category_id: int):
    return next((c for c in categories if c["id"] == category_id), None)


# ---------------- Exercise ----------------


def get_all_exercises():
    return exercises


def get_exercise_by_id(exercise_id: int):
    return next((e for e in exercises if e["id"] == exercise_id), None)


def get_exercise_category_ids(exercise_id: int):
    return [
        link["category_id"]
        for link in exercise_categories
        if link["exercise_id"] == exercise_id
    ]


def get_exercise_fields(exercise_id: int):
    return [field for field in exercise_fields if field["exercise_id"] == exercise_id]


# ---------------- Filter by category ----------------


def get_exercises_by_category(category_id: int):
    filtered = []
    for e in exercises:
        if category_id in get_exercise_category_ids(e["id"]):
            filtered.append(e)
    return filtered
