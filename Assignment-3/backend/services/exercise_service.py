from models.dtoModels import (
    ExerciseDetailDto,
    ExerciseListItemDto,
    ExerciseFieldDto,
    CategoryDto,
)
from repositories import store


# список упражнений (главная страница)
def list_exercises():
    exercises = store.get_all_exercises()
    result = []

    for e in exercises:
        category_ids = store.get_exercise_category_ids(e["id"])

        categories = [
            CategoryDto(
                id=c["id"],
                name=c["name"],
                description=c.get("description"),
            )
            for c in store.get_all_categories()
            if c["id"] in category_ids
        ]

        result.append(
            ExerciseListItemDto(
                id=e["id"],
                name=e["name"],
                date=e["date"],
                notes=e["notes"],
                categories=categories,
            )
        )

    return result


# детали одного упражнения
def get_exercise_by_id(exercise_id: int):
    e = store.get_exercise_by_id(exercise_id)

    if not e:
        return None

    category_ids = store.get_exercise_category_ids(e["id"])

    categories = [
        CategoryDto(
            id=c["id"],
            name=c["name"],
            description=c.get("description"),
        )
        for c in store.get_all_categories()
        if c["id"] in category_ids
    ]

    fields = [
        ExerciseFieldDto(
            id=f["id"],
            name=f["name"],
            value=str(f["value"]),
            unit=f["unit"],
        )
        for f in store.get_exercise_fields(e["id"])
    ]

    return ExerciseDetailDto(
        id=e["id"],
        name=e["name"],
        date=e["date"],
        notes=e["notes"],
        categories=categories,
        fields=fields,
    )


def list_exercises_by_category(category_id: int):
    exercises = store.get_all_exercises()
    result = []

    for e in exercises:
        # получаем все категории упражнения
        category_ids = store.get_exercise_category_ids(e["id"])

        # если упражнение относится к нужной категории, добавляем
        if category_id in category_ids:
            categories: list[Unknown | CategoryDto] = [
                CategoryDto(
                    id=c["id"],
                    name=c["name"],
                    description=c.get("description"),
                )
                for c in store.get_all_categories()
                if c["id"] in category_ids
            ]

            result.append(
                ExerciseListItemDto(
                    id=e["id"],
                    name=e["name"],
                    date=e["date"],
                    notes=e["notes"],
                    categories=categories,
                )
            )

    return result


def get_exercise_fields(exercise_id: int):
    e = store.get_exercise_by_id(exercise_id)

    if not e:
        return None

    fields = [
        ExerciseFieldDto(
            id=f["id"],
            name=f["name"],
            value=str(f["value"]),
            unit=f["unit"],
        )
        for f in store.get_exercise_fields(exercise_id)
    ]

    return fields
