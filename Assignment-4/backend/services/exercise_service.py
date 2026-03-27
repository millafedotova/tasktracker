from models.dtoModels import (
    ExerciseDetailDto,
    ExerciseListItemDto,
    ExerciseFieldDto,
    CategoryDto,
)
from models.dtoModels import ExerciseCreateRequest
from repositories import store


def list_exercises(user_id: int):
    exercises = store.get_all_exercises(user_id)
    result = []

    for e in exercises:
        category_ids = store.get_exercise_category_ids(e.id)

        categories = [
            CategoryDto(
                id=c.id,
                name=c.name,
                description=c.description,
            )
            for c in store.get_all_categories()
            if c.id in category_ids
        ]

        result.append(
            ExerciseListItemDto(
                id=e.id,
                name=e.name,
                date=e.date,
                notes=e.notes,
                categories=categories,
            )
        )

    return result


def get_exercise_by_id(exercise_id: int, user_id: int):
    e = store.get_exercise_by_id(exercise_id, user_id)

    if not e:
        return None

    category_ids = store.get_exercise_category_ids(e.id)

    categories = [
        CategoryDto(
            id=c.id,
            name=c.name,
            description=c.description,
        )
        for c in store.get_all_categories()
        if c.id in category_ids
    ]

    fields = [
        ExerciseFieldDto(
            id=f.id,
            name=f.name,
            value=str(f.value),
            unit=f.unit,
        )
        for f in store.get_exercise_fields(e.id)
    ]

    return ExerciseDetailDto(
        id=e.id,
        name=e.name,
        date=e.date,
        notes=e.notes,
        categories=categories,
        fields=fields,
    )


def list_exercises_by_category(category_id: int, user_id: int):
    exercises = store.get_all_exercises(user_id)
    result = []

    for e in exercises:
        category_ids = store.get_exercise_category_ids(e.id)

        if category_id in category_ids:
            categories = [
                CategoryDto(
                    id=c.id,
                    name=c.name,
                    description=c.description,
                )
                for c in store.get_all_categories()
                if c.id in category_ids
            ]

            result.append(
                ExerciseListItemDto(
                    id=e.id,
                    name=e.name,
                    date=e.date,
                    notes=e.notes,
                    categories=categories,
                )
            )

    return result


def get_exercise_fields(exercise_id: int, user_id: int):
    e = store.get_exercise_by_id(exercise_id, user_id)

    if not e:
        return None

    fields = [
        ExerciseFieldDto(
            id=f.id,
            name=f.name,
            value=str(f.value),
            unit=f.unit,
        )
        for f in store.get_exercise_fields(exercise_id)
    ]

    return fields


def create_exercise(data, user_id: int):
    exercise = store.create_exercise(data, user_id)
    return get_exercise_by_id(exercise.id, user_id)


def update_exercise(exercise_id: int, data, user_id: int):
    exercise = store.update_exercise(exercise_id, data, user_id)
    if not exercise:
        return None
    return get_exercise_by_id(exercise.id, user_id)
