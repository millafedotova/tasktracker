import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ExerciseListPage } from './pages/ExerciseListPage';
import { ExerciseDetailPage } from './pages/ExerciseDetailPage';
import { CreateExercisePage } from './pages/CreateExercisePage';
import { EditExercisePage } from './pages/EditExercisePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/exercises" replace />} />

          <Route path="exercises" element={<ExerciseListPage />} />
          <Route path="exercises/new" element={<CreateExercisePage />} />
          <Route path="exercises/:id" element={<ExerciseDetailPage />} />
          <Route path="exercises/:id/edit" element={<EditExercisePage />} />

          <Route path="*" element={<Navigate to="/exercises" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
