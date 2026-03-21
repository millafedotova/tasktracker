import { useNavigate } from "react-router-dom";
import { ExerciseForm } from "../components/ExerciseForm";
import { createExercise } from "../services/apiService";
import type { ExerciseCreateRequest } from "../types";

export function CreateExercisePage() {
  const navigate = useNavigate();

  async function handleSubmit(data: ExerciseCreateRequest) {
    const created = await createExercise(data);
    navigate(`/exercises/${created.id}`);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6">New Exercise</h1>
      <div className="max-w-2xl bg-white p-6 rounded shadow">
        <ExerciseForm onSubmit={handleSubmit} submitLabel="Create Exercise" />
      </div>
    </div>
  );
}
