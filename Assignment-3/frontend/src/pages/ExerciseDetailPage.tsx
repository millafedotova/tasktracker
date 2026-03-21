import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExerciseById } from "../services/apiService";
import type { ExerciseDetailDto } from "../types";

export function ExerciseDetailPage() {
  const { id } = useParams();
  const exerciseId = Number(id);

  const [exercise, setExercise] = useState<ExerciseDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getExerciseById(exerciseId)
      .then(setExercise)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [exerciseId]);

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-4">{exercise.name}</h1>
      <p className="text-gray-500">{new Date(exercise.date).toLocaleString()}</p>
      <p className="mt-2 text-gray-700">{exercise.notes}</p>

      <div className="mt-4 flex gap-2 flex-wrap">
        {exercise.categories.map((c) => (
          <span
            key={c.id}
            className="px-2 py-1 bg-blue-200 text-blue-800 rounded"
          >
            {c.name}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Details</h2>
        {exercise.fields.length > 0 ? (
          <ul className="list-disc list-inside">
            {exercise.fields.map((f) => (
              <li key={f.id}>
                {f.name}: {f.value} {f.unit}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No fields recorded.</p>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          to={`/exercises/${exercise.id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
        <Link to="/exercises" className="text-blue-600 hover:underline py-2">
          Back to Exercises
        </Link>
      </div>
    </div>
  );
}
