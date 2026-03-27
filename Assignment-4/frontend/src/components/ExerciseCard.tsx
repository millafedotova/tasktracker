import { Link } from 'react-router-dom';
import type { ExerciseListItemDto } from '../types';
import { CategoryBadge } from './CategoryBadge';

export const ExerciseCard = ({exercise}: {exercise: ExerciseListItemDto}) => (
  <div className="card bg-base-100 shadow p-4">
    <h2 className="text-lg font-bold">
      <Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link>
    </h2>
    <p className="text-sm text-gray-500">{new Date(exercise.date).toLocaleString()}</p>
    <p>{exercise.notes}</p>
    <div className="mt-2 flex flex-wrap">
      {exercise.categories.map(c => <CategoryBadge key={c.id} category={c} />)}
    </div>
  </div>
);
