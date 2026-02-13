import { useParams, Link } from 'react-router-dom';
import { mockExercises } from '../data/mockExercises';
import { mockExerciseCategories } from '../data/mockExerciseCategories';
import { mockExerciseFields } from '../data/mockExerciseFields';
import { mockCategories } from '../data/mockCategories';

export function ExerciseDetailPage() {
  const { id } = useParams();
  const exerciseId = Number(id);
  const exercise = mockExercises.find(e => e.id === exerciseId);

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

  const exerciseCategoryIds = mockExerciseCategories
    .filter(ec => ec.exerciseId === exercise.id)
    .map(ec => ec.categoryId);

  const categories = mockCategories.filter(c => exerciseCategoryIds.includes(c.id));

  const fields = mockExerciseFields.filter(f => f.exerciseId === exercise.id);

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
              {f.name}: {f.value} {f.unit}
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