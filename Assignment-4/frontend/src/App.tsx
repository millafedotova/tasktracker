import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { ExerciseListPage } from './pages/ExerciseListPage';
import { ExerciseDetailPage } from './pages/ExerciseDetailPage';
import { CreateExercisePage } from './pages/CreateExercisePage';
import { EditExercisePage } from './pages/EditExercisePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/exercises" replace />} />

            <Route path="exercises" element={
              <ProtectedRoute><ExerciseListPage /></ProtectedRoute>
            } />
            <Route path="exercises/new" element={
              <ProtectedRoute><CreateExercisePage /></ProtectedRoute>
            } />
            <Route path="exercises/:id" element={
              <ProtectedRoute><ExerciseDetailPage /></ProtectedRoute>
            } />
            <Route path="exercises/:id/edit" element={
              <ProtectedRoute><EditExercisePage /></ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/exercises" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
