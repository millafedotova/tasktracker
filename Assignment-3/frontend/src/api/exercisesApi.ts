import { getApiBaseUrl } from "./config"
import type { ExerciseCreateRequest } from "../types"

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

export async function apiCreateExercise(data: ExerciseCreateRequest) {
  const res = await fetch(`${getApiBaseUrl()}/api/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create exercise")
  return await res.json()
}

export async function apiUpdateExercise(id: number, data: ExerciseCreateRequest) {
  const res = await fetch(`${getApiBaseUrl()}/api/exercises/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update exercise")
  return await res.json()
}
