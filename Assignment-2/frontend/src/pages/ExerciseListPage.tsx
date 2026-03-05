import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

interface Exercise {
  id: number;
  name: string;
  date: string;
  notes: string;
  categoryIds: number[]; // предполагаем, что бек возвращает категории упражнения
}

export function ExerciseListPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const exercisesRes = await fetch("http://localhost:8000/api/exercises");
        if (!exercisesRes.ok) throw new Error("Failed to fetch exercises");
        const exercisesData: Exercise[] = await exercisesRes.json();

        const categoriesRes = await fetch("http://localhost:8000/api/categories");
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
        const categoriesData: Category[] = await categoriesRes.json();

        setExercises(exercisesData);
        setCategories(categoriesData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

 const filteredExercises = selectedCategoryId
  ? exercises.filter(ex =>
      ex.categories.some(c => c.id === selectedCategoryId)
    )
  : exercises;

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6">Exercises</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={`px-3 py-1 rounded ${
            selectedCategoryId === null ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategoryId(c.id)}
            className={`px-3 py-1 rounded ${
              selectedCategoryId === c.id ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredExercises.map(ex => (
          <Link
            key={ex.id}
            to={`/exercises/${ex.id}`}
            className="block p-4 border rounded shadow hover:bg-gray-100 transition"
          >
            <h2 className="font-semibold text-lg">{ex.name}</h2>
            <p className="text-sm text-gray-500">{new Date(ex.date).toLocaleString()}</p>
            <p className="text-gray-700 mt-2">{ex.notes}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}