import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExerciseForm } from "../components/ExerciseForm";
import { getExerciseById, updateExercise } from "../services/apiService";
import type { ExerciseCreateRequest, ExerciseDetailDto } from "../types";

export function EditExercisePage() {
  const { id } = useParams();
  const exerciseId = Number(id);
  const navigate = useNavigate();

  const [exercise, setExercise] = useState<ExerciseDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getExerciseById(exerciseId)
      .then(setExercise)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [exerciseId]);

  async function handleSubmit(data: ExerciseCreateRequest) {
    await updateExercise(exerciseId, data);
    navigate(`/exercises/${exerciseId}`);
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!exercise) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Exercise not found</h1>
        <Link to="/exercises" className="text-blue-600 hover:underline">
          Back to Exercises
        </Link>
      </div>
    );
  }

  const initialData = {
    name: exercise.name,
    notes: exercise.notes,
    date: exercise.date,
    categoryIds: exercise.categories.map((c) => c.id),
    fields: exercise.fields.map((f) => ({
      name: f.name,
      value: f.value,
      unit: f.unit,
    })),
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6">Edit: {exercise.name}</h1>
      <div className="max-w-2xl bg-white p-6 rounded shadow">
        <ExerciseForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
