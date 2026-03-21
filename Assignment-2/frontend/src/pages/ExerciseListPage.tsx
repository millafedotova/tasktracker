import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiGetExercises, apiGetCategories } from "../api/exercisesApi";

interface Category {
  id: number;
  name: string;
}

interface Exercise {
  id: number;
  name: string;
  date: string;
  notes: string;
  categoryIds: number[];
}

export function ExerciseListPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const [newName, setNewName] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newDate, setNewDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetch started");

        const [exercisesData, categoriesData] = await Promise.all([
          apiGetExercises(),
          apiGetCategories(),
        ]);

        console.log("data loaded", exercisesData, categoriesData);

        setExercises(exercisesData);
        setCategories(categoriesData);
      } catch (err: any) {
        console.error("FETCH ERROR:", err);
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleAddExercise() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/exercises`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          notes: newNotes,
          date: newDate,
          categoryIds: selectedCategories,
          fields: [], // важно для бэка
        }),
      });

      if (!res.ok) throw new Error("Failed to create exercise");

      const created = await res.json();

      setExercises(prev => [...prev, created]);

      setNewName("");
      setNewNotes("");
      setNewDate("");
      setSelectedCategories([]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error creating exercise");
    }
  }

  const filteredExercises = selectedCategoryId
    ? exercises.filter(ex => ex.categoryIds?.includes(selectedCategoryId))
    : exercises;

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6">Exercises</h1>

      {/* фильтр */}
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

      {/* форма добавления */}
      <div className="mb-6 p-4 border rounded bg-white">
        <h2 className="font-semibold mb-3">Add Exercise</h2>

        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="block mb-2 p-2 border w-full"
        />

        <input
          type="date"
          value={newDate}
          onChange={e => setNewDate(e.target.value)}
          className="block mb-2 p-2 border w-full"
        />

        <textarea
          placeholder="Notes"
          value={newNotes}
          onChange={e => setNewNotes(e.target.value)}
          className="block mb-2 p-2 border w-full"
        />

        {/* категории */}
        <div className="mb-2 flex gap-2 flex-wrap">
          {categories.map(c => (
            <label key={c.id} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.id)}
                onChange={() => {
                  setSelectedCategories(prev =>
                    prev.includes(c.id)
                      ? prev.filter(id => id !== c.id)
                      : [...prev, c.id]
                  );
                }}
              />
              {c.name}
            </label>
          ))}
        </div>

        <button
          onClick={handleAddExercise}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* список */}
      <div className="grid gap-4">
        {filteredExercises.map(ex => (
          <Link
            key={ex.id}
            to={`/exercises/${ex.id}`}
            className="block p-4 border rounded shadow hover:bg-gray-100 transition"
          >
            <h2 className="font-semibold text-lg">{ex.name}</h2>
            <p className="text-sm text-gray-500">
              {new Date(ex.date).toLocaleString()}
            </p>
            <p className="text-gray-700 mt-2">{ex.notes}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}