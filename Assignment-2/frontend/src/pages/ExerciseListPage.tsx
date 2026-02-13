import { useParams, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { mockExercises } from '../data/mockExercises';
import { mockExerciseCategories } from '../data/mockExerciseCategories';
import { mockExerciseFields } from '../data/mockExerciseFields';
import { mockCategories } from '../data/mockCategories';



export function ExerciseListPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const filteredExercises = selectedCategoryId
    ? mockExercises.filter(ex =>
        mockExerciseCategories.some(
          ec => ec.exerciseId === ex.id && ec.categoryId === selectedCategoryId
        )
      )
    : mockExercises;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6">Exercises</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={`px-3 py-1 rounded ${
            selectedCategoryId === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        {mockCategories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategoryId(c.id)}
            className={`px-3 py-1 rounded ${
              selectedCategoryId === c.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
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