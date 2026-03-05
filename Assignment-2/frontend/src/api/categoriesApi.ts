import { getApiBaseUrl } from "./config"

export async function apiGetCategories() {
  const response = await fetch(`${getApiBaseUrl()}/api/categories`)
  if (!response.ok) throw new Error("Failed to fetch categories")
  return await response.json()
}

export async function apiGetCategoryById(id: number) {
  const response = await fetch(`${getApiBaseUrl()}/api/categories/${id}`)
  if (!response.ok) throw new Error("Category not found")
  return await response.json()
}