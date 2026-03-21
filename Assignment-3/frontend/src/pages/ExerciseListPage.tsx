import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getExercises, getCategories } from "../services/apiService";
import type { ExerciseListItemDto, CategoryDto } from "../types";

export function ExerciseListPage() {
  const [exercises, setExercises] = useState<ExerciseListItemDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [exercisesData, categoriesData] = await Promise.all([
          getExercises(),
          getCategories(),
        ]);
        setExercises(exercisesData);
        setCategories(categoriesData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error loading data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredExercises = selectedCategoryId
    ? exercises.filter((ex) =>
        ex.categories.some((c) => c.id === selectedCategoryId)
      )
    : exercises;

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exercises</h1>
        <Link
          to="/exercises/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + New Exercise
        </Link>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={`px-3 py-1 rounded ${
            selectedCategoryId === null
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategoryId(c.id)}
            className={`px-3 py-1 rounded ${
              selectedCategoryId === c.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Exercise list */}
      <div className="grid gap-4">
        {filteredExercises.map((ex) => (
          <Link
            key={ex.id}
            to={`/exercises/${ex.id}`}
            className="block p-4 border rounded shadow hover:bg-gray-100 transition bg-white"
          >
            <h2 className="font-semibold text-lg">{ex.name}</h2>
            <p className="text-sm text-gray-500">
              {new Date(ex.date).toLocaleString()}
            </p>
            <p className="text-gray-700 mt-1">{ex.notes}</p>
            <div className="mt-2 flex gap-1 flex-wrap">
              {ex.categories.map((c) => (
                <span
                  key={c.id}
                  className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
