import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Lock, CheckCircle, ShieldAlert, Loader2, ArrowLeft } from 'lucide-react'

export default function UpdatePassword() {
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const checkSession = async () => {
            try {
                // A veces Supabase tarda un poco en procesar el hash de la URL
                const { data: { session } } = await supabase.auth.getSession()

                if (session) {
                    setIsChecking(false)
                } else {
                    // Esperar un poco más por si el token está siendo procesado
                    setTimeout(async () => {
                        const { data: { session: retrySession } } = await supabase.auth.getSession()
                        if (retrySession) {
                            setIsChecking(false)
                        } else {
                            setError('No se detectó una sesión de recuperación válida. El enlace pudo haber expirado.')
                            setIsChecking(false)
                        }
                    }, 1500)
                }
            } catch (err) {
                console.error('Error al verificar sesión:', err)
                setError('Error al conectar con el sistema de seguridad.')
                setIsChecking(false)
            }
        }
        checkSession()
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.')
            return
        }

        setIsLoading(true)
        setError(null)
        setMessage(null)

        try {
            const { error: updateError } = await supabase.auth.updateUser({ password })
            if (updateError) throw updateError

            setMessage('¡Contraseña actualizada con éxito! Redirigiendo...')
            setTimeout(() => navigate('/dashboard'), 2000)
        } catch (err) {
            console.error('Error al actualizar:', err)
            setError(err.message || 'Error al actualizar la contraseña.')
        } finally {
            setIsLoading(false)
        }
    }

    if (isChecking) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
                <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">Validando Enlace de Seguridad...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-950 relative flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-10 group">
                    <div className="inline-flex justify-center items-center p-5 bg-black/50 border border-indigo-500/30 rounded-2xl shadow-lg mb-6 transition-transform hover:scale-105">
                        <Lock className="text-indigo-400 h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Nueva <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Credencial</span></h1>
                    <p className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase mt-2">Protocolo de seguridad activo</p>
                </div>

                <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden">
                    {message ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                                <CheckCircle size={32} className="text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 uppercase italic">¡ÉXITO!</h3>
                            <p className="text-zinc-400 text-sm mb-4">{message}</p>
                            <Loader2 className="animate-spin text-indigo-400 mx-auto" size={20} />
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl text-xs font-bold flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    {error}
                                </div>
                            )}

                            {/* Mostrar el formulario solo si no hay error de sesion inicial */}
                            {!error || !error.includes('sesión') ? (
                                <form onSubmit={handleUpdate} className="space-y-6">
                                    <div>
                                        <label className="block text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 ml-1">Nueva Clave</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                                            <input
                                                type="password"
                                                required
                                                className="w-full bg-black/60 border border-zinc-800 focus:border-indigo-500/50 text-white pl-12 pr-4 py-4 rounded-xl outline-none transition-all placeholder:text-zinc-700 text-sm"
                                                placeholder="Mínimo 6 caracteres"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-[0.2em] text-xs"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : 'Sincronizar Password'}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center">
                                    <ShieldAlert className="text-red-500 mx-auto mb-4" size={48} />
                                    <p className="text-zinc-400 text-sm mb-8">El enlace de recuperación es inválido o ha caducado. Por favor, solicita uno nuevo.</p>
                                    <button
                                        onClick={() => navigate('/forgot-password')}
                                        className="w-full py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95"
                                    >
                                        Solicitar Nuevo Link
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="text-center mt-8">
                    <Link to="/login" className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                        <ArrowLeft size={14} /> Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}
