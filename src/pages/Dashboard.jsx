import { useAuth } from '../context/AuthContext'
import { PlusCircle, Activity, TrendingUp, User, Weight, Zap, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
    const { user } = useAuth()
    const [stats, setStats] = useState({
        totalSessions: 0,
        weeklySessions: 0,
        constancyScore: [],
        loading: true
    })

    useEffect(() => {
        if (user) fetchStats()
    }, [user])

    const fetchStats = async () => {
        try {
            const { data: sessions, error } = await supabase
                .from('workout_sessions')
                .select('id, started_at')
                .eq('user_id', user.id)
                .order('started_at', { ascending: true })

            if (error) throw error

            const now = new Date()

            // Lógica para obtener el inicio de la semana actual (Lunes)
            const tempDate = new Date()
            const dayOfWeek = tempDate.getDay() // 0 (Dom) a 6 (Sab)
            const diffToMonday = tempDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
            const startOfWeek = new Date(tempDate.setDate(diffToMonday))
            startOfWeek.setHours(0, 0, 0, 0)

            // Filtrar sesiones únicas por día en la semana actual
            const currentWeekSessions = sessions.filter(s => new Date(s.started_at) >= startOfWeek)
            const uniqueDaysThisWeek = new Set(currentWeekSessions.map(s => new Date(s.started_at).toDateString())).size

            setStats({
                totalSessions: sessions.length,
                weeklySessions: uniqueDaysThisWeek, // Máximo 7, se reinicia cada Lunes
                constancyScore: calculateConstancyTrend(sessions),
                loading: false
            })
        } catch (e) {
            console.error("Error cargando estadísticas:", e.message)
            setStats(prev => ({ ...prev, loading: false }))
        }
    }

    // Algoritmo de Constancia: Sube al entrenar, baja al no entrenar
    const calculateConstancyTrend = (sessions) => {
        const days = 7
        const trend = []
        let currentScore = 50 // Empezamos en un punto medio equilibrado

        for (let i = days; i >= 0; i--) {
            const dayToCheck = new Date()
            dayToCheck.setDate(dayToCheck.getDate() - i)
            const dayString = dayToCheck.toDateString()

            const trainedThisDay = sessions.some(s => new Date(s.started_at).toDateString() === dayString)

            if (trainedThisDay) {
                currentScore = Math.min(100, currentScore + 15) // Entrenar sube el score
            } else {
                currentScore = Math.max(10, currentScore - 8) // No entrenar lo baja (decay)
            }

            trend.push({
                name: dayToCheck.toLocaleDateString('es-ES', { weekday: 'short' }),
                score: currentScore
            })
        }
        return trend
    }

    if (stats.loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-indigo-400 gap-4">
                <Loader2 className="animate-spin" size={40} />
                <p className="font-mono text-xs tracking-[0.2em]">INICIALIZANDO SISTEMA...</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto space-y-10 p-4 pb-20 animate-fade-up">
            {/* Hero Section Premium */}
            <div className="relative h-64 md:h-96 rounded-[3rem] overflow-hidden mb-12 border border-white/10 group shadow-2xl">
                <img
                    src="/bg-gym.png"
                    alt="Futuristic Gym"
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] leading-tight">
                        EL ENTRENAMIENTO <br /> <span className="text-indigo-500">DEL FUTURO</span>
                    </h1>
                    <p className="text-indigo-200 text-xl flex items-center gap-3 font-medium drop-shadow-md mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Zap size={22} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                        Bienvenido a encontrar tu mejor versión
                    </p>
                </div>
                <div className="absolute top-10 right-10">
                    <Link to="/perfil" className="flex glass-heavy px-8 py-4 rounded-[1.5rem] items-center gap-4 text-slate-300 hover:border-indigo-500/50 transition-all group active:scale-95 shadow-2xl">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] group-hover:rotate-12 transition-transform">
                            <User size={24} />
                        </div>
                        <div className="text-left hidden lg:block">
                            <p className="text-[10px] text-zinc-500 font-black tracking-[0.3em] leading-none mb-1">BIOMETRÍA</p>
                            <span className="text-sm font-black text-white tracking-widest uppercase font-mono">ESTADO: ONLINE</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sesiones Semanales (X de 7) */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] relative overflow-hidden group">
                    <Activity className="absolute -right-4 -bottom-4 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors" size={160} />
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                            <Activity size={24} />
                        </div>
                        <h3 className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Progreso Semanal</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-6xl font-black text-white tracking-tighter">{stats.weeklySessions}</p>
                        <p className="text-2xl font-black text-zinc-700 tracking-tighter italic whitespace-nowrap">DE 7 REALES</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-widest">
                        <TrendingUp size={14} /> Histórico total: {stats.totalSessions}
                    </div>
                </div>

                {/* Gráfico de Constancia (Score Disciplina) */}
                <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] relative group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Constancia de Entrenamiento</h3>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-950/40 px-3 py-1.5 rounded-full border border-white/5">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">Tendencia Neural</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full mt-4 bg-zinc-950/20 rounded-3xl p-4 flex items-center justify-center">
                        <ResponsiveContainer width="99%" height="100%" minWidth={0}>
                            <AreaChart data={stats.constancyScore} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorConstancy" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#10b981', fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase' }}
                                    labelStyle={{ color: '#52525b', fontSize: '9px', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#10b981"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorConstancy)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Action Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* CTA Principal */}
                <div className="bg-indigo-600 rounded-[2.5rem] p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-700"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black text-white mb-3 uppercase italic tracking-tighter">Coach IA</h3>
                        <p className="text-indigo-100 mb-8 max-w-xs leading-relaxed">
                            Analizando tus datos... Tu fuerza ha subido un 5%. ¿Listo para una rutina de potencia?
                        </p>
                        <Link to="/coach" className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 w-fit">
                            <PlusCircle size={20} /> Generar Entrenamiento
                        </Link>
                    </div>
                </div>

                {/* Accesos Rápidos */}
                <div className="grid grid-cols-2 gap-6">
                    <Link to="/rutinas" className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-emerald-500/40 hover:bg-zinc-900/60 transition-all duration-500 group flex flex-col items-center text-center justify-center gap-5 shadow-xl hover:shadow-emerald-500/5">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-emerald-500/10">
                            <Weight size={32} />
                        </div>
                        <div>
                            <h4 className="font-black text-white uppercase tracking-tighter text-lg italic">Entrenar</h4>
                            <p className="text-[9px] text-zinc-500 font-mono tracking-[0.2em] mt-1 bg-white/5 py-1 px-3 rounded-full">EJECUTAR SESIÓN</p>
                        </div>
                    </Link>

                    <Link to="/historial" className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-indigo-500/40 hover:bg-zinc-900/60 transition-all duration-500 group flex flex-col items-center text-center justify-center gap-5 shadow-xl hover:shadow-indigo-500/5">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-lg shadow-indigo-500/10">
                            <Activity size={32} />
                        </div>
                        <div>
                            <h4 className="font-black text-white uppercase tracking-tighter text-lg italic">Historial</h4>
                            <p className="text-[9px] text-zinc-500 font-mono tracking-[0.2em] mt-1 bg-white/5 py-1 px-3 rounded-full">LOG DE DATOS</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}