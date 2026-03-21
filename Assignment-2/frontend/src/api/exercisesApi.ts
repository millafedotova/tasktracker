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

export async function createExercise(data: any) {
  const res = await fetch(`${getApiBaseUrl()}/api/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create exercise");

  return await res.json();
}
export async function updateExercise(id: any, data: any) {
  const res = await fetch(`/api/exercises/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiGetCategories() {
  const res = await fetch("http://localhost:8000/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}