import { getApiBaseUrl } from "./config"

const url = `${getApiBaseUrl()}/api/categories`

export async function apiGetExercises() {
  const response = await fetch(`${getApiBaseUrl()}/api/exercises`)
  if (!response.ok) throw new Error("Failed to fetch exercises")
  return await response.json()
}

export async function apiGetExerciseById(id: number) {
  const response = await fetch(`${getApiBaseUrl()}/api/exercises/${id}`)
  if (!response.ok) throw new Error("Exercise not found")
  return await response.json()
}