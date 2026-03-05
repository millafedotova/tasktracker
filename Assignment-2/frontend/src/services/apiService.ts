import { apiGetCategories, apiGetCategoryById } from "../api/categoriesApi"
import { apiGetExercises, apiGetExerciseById } from "../api/exercisesApi"

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