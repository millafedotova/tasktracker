import { mockCategories } from '../data/mockCategories';
import { mockExercises } from '../data/mockExercises';
import { mockExerciseCategories } from '../data/mockExerciseCategories';
import { mockExerciseFields } from '../data/mockExerciseFields';
import type { CategoryDto, ExerciseListItemDto, ExerciseDetailDto, ExerciseFieldDto } from '../types';

const categoryToDto = (c: typeof mockCategories[number]): CategoryDto => ({
  id: c.id,
  name: c.name,
  description: c.description,
});

const fieldToDto = (f: typeof mockExerciseFields[number]): ExerciseFieldDto => ({
  id: f.id,
  name: f.name,
  value: f.value,
  unit: f.unit,
});

export const getCategories = async (): Promise<CategoryDto[]> => {
  return Promise.resolve(mockCategories.map(categoryToDto));
};

export const getCategoryById = async (id: number): Promise<CategoryDto | undefined> => {
  const cat = mockCategories.find(c => c.id === id);
  return Promise.resolve(cat ? categoryToDto(cat) : undefined);
};

export const getExercises = async (): Promise<ExerciseListItemDto[]> => {
  const categoriesById = Object.fromEntries(mockCategories.map(c => [c.id, c]));
  return Promise.resolve(
    mockExercises.map(ex => {
      const categoryIds = mockExerciseCategories.filter(ec => ec.exerciseId === ex.id).map(ec => ec.categoryId);
      const categories = categoryIds.map(id => categoriesById[id]).filter(Boolean).map(categoryToDto);
      return {
        id: ex.id,
        name: ex.name,
        date: ex.date,
        notes: ex.notes,
        categories,
      };
    })
  );
};

export const getExerciseById = async (id: number): Promise<ExerciseDetailDto | undefined> => {
  const ex = mockExercises.find(e => e.id === id);
  if (!ex) return Promise.resolve(undefined);

  const categoryIds = mockExerciseCategories.filter(ec => ec.exerciseId === ex.id).map(ec => ec.categoryId);
  const categories = mockCategories.filter(c => categoryIds.includes(c.id)).map(categoryToDto);
  const fields = mockExerciseFields.filter(f => f.exerciseId === ex.id).map(fieldToDto);

  return Promise.resolve({ id: ex.id, name: ex.name, date: ex.date, notes: ex.notes, categories, fields });
};
