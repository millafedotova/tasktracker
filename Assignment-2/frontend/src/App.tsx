import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ExerciseListPage } from './pages/ExerciseListPage';
import { ExerciseDetailPage } from './pages/ExerciseDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/exercises" replace />} />

          <Route path="exercises" element={<ExerciseListPage />} />

          <Route path="exercises/:id" element={<ExerciseDetailPage />} />
          <Route path="*" element={<Navigate to="/exercises" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
