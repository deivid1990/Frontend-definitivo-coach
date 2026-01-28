import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Star, Save, CheckCircle, Edit3 } from 'lucide-react';

export default function ManualWorkoutModal({ isOpen, onClose, onSave, initialData }) {
    const getLocalDateTime = (dateStr) => {
        const date = dateStr ? new Date(dateStr) : new Date();
        const offset = date.getTimezoneOffset() * 60000;
        return new Date(date - offset).toISOString().slice(0, 16);
    };

    const [formData, setFormData] = useState({
        name: '',
        date: getLocalDateTime(),
        hours: 0,
        minutes: 45,
        rating: 5
    });
    const [loading, setLoading] = useState(false);

    // Sincronizar con datos iniciales si estamos editando
    useEffect(() => {
        if (initialData && isOpen) {
            const h = Math.floor((initialData.duration_minutes || initialData.duration || 0) / 60);
            const m = (initialData.duration_minutes || initialData.duration || 0) % 60;
            setFormData({
                name: initialData.name || '',
                date: getLocalDateTime(initialData.started_at),
                hours: h,
                minutes: m,
                rating: initialData.rating || 5
            });
        } else if (!initialData && isOpen) {
            setFormData({
                name: '',
                date: getLocalDateTime(),
                hours: 0,
                minutes: 45,
                rating: 5
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const totalDuration = (formData.hours * 60) + formData.minutes;
            await onSave({
                ...initialData,
                name: formData.name,
                started_at: new Date(formData.date).toISOString(),
                duration_minutes: totalDuration,
                rating: formData.rating,
                exercises: initialData?.exercises || []
            });
            onClose();
        } catch (error) {
            console.error("Error saving workout:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-indigo-500/20 rounded-[2.5rem] w-full max-w-md relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-white/5 bg-indigo-600 font-sans">
                    <button onClick={onClose} className="absolute top-6 right-6 text-indigo-200 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                        {initialData ? 'Editar Entrenamiento' : 'Registrar Entrenamiento'}
                    </h2>
                    <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest mt-1">
                        {initialData ? 'Corrección de Misión' : 'Entrada Manual de Misión'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">¿Qué entrenaste?</label>
                            <input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ej: Pecho y Tríceps Pro"
                                className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white focus:border-indigo-500 outline-none transition-all font-bold"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Fecha y Hora</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={16} />
                                <input
                                    type="datetime-local"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-4 py-4 text-white text-xs focus:border-indigo-500 outline-none transition-all font-mono"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Tiempo de Entrenamiento</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col items-center">
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Horas</span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="24"
                                        value={formData.hours}
                                        onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-transparent text-white text-center text-xl font-mono font-black outline-none"
                                    />
                                </div>
                                <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col items-center">
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Minutos</span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        value={formData.minutes}
                                        onChange={(e) => setFormData({ ...formData, minutes: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-transparent text-white text-center text-xl font-mono font-black outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="text-center italic">
                                <p className="text-xs font-black text-white uppercase tracking-tighter">¿Cómo te sentiste hoy en tu entrenamiento?</p>
                                <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Evalúa tu desempeño con estrellas</p>
                            </div>
                            <div className="flex justify-center gap-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className={`transition-all duration-300 transform ${formData.rating >= star ? 'text-indigo-500 scale-125' : 'text-zinc-800 hover:text-zinc-600'}`}
                                    >
                                        <Star size={32} fill={formData.rating >= star ? 'currentColor' : 'none'} strokeWidth={1.5} />
                                    </button>
                                ))}
                            </div>
                            {formData.rating <= 3 && formData.rating > 0 && (
                                <p className="text-[9px] text-center text-indigo-400 font-bold uppercase tracking-widest animate-pulse">Mañana será un día de pura potencia. ¡No te detengas!</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase italic tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        {loading ? <CheckCircle className="animate-spin" size={20} /> : initialData ? <Edit3 size={20} /> : <Save size={20} />}
                        {loading ? 'SINCRONIZANDO...' : initialData ? 'ACTUALIZAR REGISTRO' : 'GUARDAR EN HISTORIAL'}
                    </button>
                </form>
            </div>
        </div>
    );
}
