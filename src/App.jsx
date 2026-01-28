import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'

// --- IMPORTACIÓN DE PÁGINAS (Coincidiendo con tu carpeta) ---
import Login from './pages/Login'
import Register from './pages/Register'
import UpdatePassword from './pages/UpdatePassword'
import Dashboard from './pages/Dashboard'
import Routines from './pages/Routines'
import Exercises from './pages/Exercises'
import History from './pages/History'
import ForgotPassword from './pages/ForgotPassword'

// CORRECCIÓN FINAL: Usamos el nombre exacto de tu archivo
import AICoach from './pages/AICoach'
import Profile from './pages/Profile'
import WorkoutSession from './pages/WorkoutSession'
import TrainingSelfies from './pages/TrainingSelfies'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Redirección inicial */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* --- RUTAS DEL SISTEMA (Protegidas) --- */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/rutinas" element={<Routines />} />
              <Route path="/biblioteca" element={<Exercises />} />
              <Route path="/historial" element={<History />} />
              <Route path="/progreso" element={<TrainingSelfies />} />
              <Route path="/coach" element={<AICoach />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/entrenar/:routineId" element={<WorkoutSession />} />
              <Route path="/entrenar/:routineId/:dayNumber" element={<WorkoutSession />} />
            </Route>
          </Route>

          {/* Si la ruta no existe, ir al dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}