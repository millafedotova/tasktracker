// ===== DOMAIN MODELS =====
export type Category = {
  id: number
  name: string
  description: string
}

export type Exercise = {
  id: number
  name: string
  notes: string
  date: string
}

export type ExerciseCategory = {
  exerciseId: number
  categoryId: number
}

export type ExerciseField = {
  id: number
  exerciseId: number
  name: string
  value: string
  unit: string
}

// ===== DTOs =====
export type CategoryDto = {
  id: number
  name: string
  description: string
}

export type ExerciseFieldDto = {
  id: number
  name: string
  value: string
  unit: string
}

export type ExerciseListItemDto = {
  id: number
  name: string
  date: string
  notes: string
  categories: CategoryDto[]
}

export type ExerciseDetailDto = {
  id: number
  name: string
  date: string
  notes: string
  categories: CategoryDto[]
  fields: ExerciseFieldDto[]
}

// ===== Request types =====
export type ExerciseFieldCreate = {
  name: string
  value: string
  unit: string
}

export type ExerciseCreateRequest = {
  name: string
  notes: string
  date: string
  categoryIds: number[]
  fields: ExerciseFieldCreate[]
}
