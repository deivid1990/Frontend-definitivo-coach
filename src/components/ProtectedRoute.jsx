import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute() {
    const { session, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-indigo-400 gap-4">
                <Loader2 className="animate-spin" size={40} />
                <p className="font-mono text-xs tracking-[0.2em] uppercase">Verificando Credenciales...</p>
            </div>
        )
    }

    if (!session) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
