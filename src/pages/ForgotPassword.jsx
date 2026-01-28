import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, ArrowLeft, Loader2, Send, CheckCircle } from 'lucide-react'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { resetPassword } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await resetPassword(email)
            if (error) throw error
            setIsSubmitted(true)
        } catch (err) {
            setError(err.message || 'Error al enviar el correo de recuperación.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10">

                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 bg-indigo-500/10 rounded-2xl mb-4 text-indigo-400">
                            <Mail size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Recuperar Acceso</h2>
                        <p className="text-zinc-400 text-sm mt-1">Enviaremos un enlace a tu terminal</p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center animate-in zoom-in-95 duration-300">
                            <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Correo Enviado</h3>
                            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                                Si existe una cuenta con <span className="text-white font-mono">{email}</span>,
                                recibirás un enlace para reestablecer tu contraseña en breve.
                            </p>
                            <Link to="/login" className="block w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest hover:bg-indigo-400 transition-all">
                                Volver al Inicio
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">Frecuencia de Enlace (Email)</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-black/60 border border-zinc-800 focus:border-indigo-500 text-white pl-12 pr-4 py-4 rounded-xl outline-none transition-all placeholder:text-zinc-700"
                                        placeholder="usuario@sistema.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl text-xs font-bold animate-pulse">
                                    ⚠ {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                                {isLoading ? 'Transmitiendo...' : 'Solicitar Reseteo'}
                            </button>

                            <div className="text-center pt-4">
                                <Link to="/login" className="text-zinc-500 hover:text-white text-xs font-bold inline-flex items-center gap-2 transition-colors">
                                    <ArrowLeft size={14} /> CANCELAR OPERACIÓN
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
