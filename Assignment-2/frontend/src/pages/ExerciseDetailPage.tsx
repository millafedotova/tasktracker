import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface Field {
  id: number;
  exerciseId: number;
  name: string;
  value: string | number;
  unit?: string;
}

interface Exercise {
  id: number;
  name: string;
  date: string;
  notes: string;
}

export function ExerciseDetailPage() {
  const { id } = useParams();
  const exerciseId = Number(id);

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // GET exercise
        const exerciseRes = await fetch(`http://localhost:8000/api/exercises/${exerciseId}`);
        if (!exerciseRes.ok) throw new Error("Exercise not found");
        const exerciseData: Exercise = await exerciseRes.json();
        setExercise(exerciseData);

        // GET categories
        const categoriesRes = await fetch(`http://localhost:8000/api/categories`);
        const categoriesData: Category[] = await categoriesRes.json();

        // GET exercise fields
        const fieldsRes = await fetch(`http://localhost:8000/api/exercises/${exerciseId}/fields`);
        const fieldsData: Field[] = await fieldsRes.json();

        // фильтруем категории для конкретного упражнения
        const exerciseCategoryIds = (exerciseData as any).categoryIds || [];
        const exerciseCategories = categoriesData.filter(c => exerciseCategoryIds.includes(c.id));

        setCategories(exerciseCategories);
        setFields(fieldsData);

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [exerciseId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!exercise) return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exercise not found</h1>
      <Link to="/exercises" className="text-blue-600 hover:underline">
        Back to Exercises
      </Link>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-4">{exercise.name}</h1>
      <p className="text-gray-500">{new Date(exercise.date).toLocaleString()}</p>
      <p className="mt-2 text-gray-700">{exercise.notes}</p>

      <div className="mt-4 flex gap-2 flex-wrap">
        {categories.map(c => (
          <span key={c.id} className="px-2 py-1 bg-blue-200 text-blue-800 rounded">
            {c.name}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Details</h2>
        <ul className="list-disc list-inside">
          {fields.map(f => (
            <li key={f.id}>
              {f.name}: {f.value} {f.unit || ""}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/exercises" className="mt-6 inline-block text-blue-600 hover:underline">
        Back to Exercises
      </Link>
    </div>
  );
}