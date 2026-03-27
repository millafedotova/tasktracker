from models.dtoModels import CategoryDto
from repositories import store


def list_categories():
    return [
        CategoryDto(id=c.id, name=c.name, description=c.description)
        for c in store.get_all_categories()
    ]


def get_category_by_id(category_id: int):
    c = store.get_category_by_id(category_id)
    if not c:
        return None
    return CategoryDto(id=c.id, name=c.name, description=c.description)
