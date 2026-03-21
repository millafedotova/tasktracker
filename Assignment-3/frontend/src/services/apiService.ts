import { apiGetCategories, apiGetCategoryById } from "../api/categoriesApi"
import { apiGetExercises, apiGetExerciseById, apiCreateExercise, apiUpdateExercise } from "../api/exercisesApi"
import type { ExerciseCreateRequest } from "../types"

export async function getCategories() {
  return await apiGetCategories()
}

export async function getCategoryById(id: number) {
  return await apiGetCategoryById(id)
}

export async function getExercises() {
  return await apiGetExercises()
}

export async function getExerciseById(id: number) {
  return await apiGetExerciseById(id)
}

export async function createExercise(data: ExerciseCreateRequest) {
  return await apiCreateExercise(data)
}

export async function updateExercise(id: number, data: ExerciseCreateRequest) {
  return await apiUpdateExercise(id, data)
}
