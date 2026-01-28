import React, { useState } from 'react';
import { Star, Clock, CheckCircle, X, Trophy } from 'lucide-react';

export default function WorkoutSummaryModal({ isOpen, onClose, onConfirm, initialDuration, routineName }) {
    const [rating, setRating] = useState(5);
    const [duration, setDuration] = useState(initialDuration || 45);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="bg-zinc-900 border border-indigo-500/20 rounded-[3rem] p-10 w-full max-w-lg relative overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.2)] animate-in zoom-in-95 duration-500">
                {/* Decorative Background */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full"></div>

                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-all transform hover:rotate-90"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="p-5 bg-indigo-500/20 rounded-[2rem] border border-indigo-500/30 text-indigo-400 shadow-inner">
                        <Trophy size={48} strokeWidth={1.5} className="animate-pulse" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                            ¡MISIÓN <span className="text-indigo-500">CUMPLIDA</span>!
                        </h2>
                        <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
                            Sincronizando rendimiento de {routineName}
                        </p>
                    </div>

                    {/* Calificación por Estrellas */}
                    <div className="space-y-4 w-full">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">¿Cómo clasificarías tu sesión?</label>
                        <div className="flex items-center justify-center gap-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`transition-all duration-300 transform ${rating >= star ? 'text-yellow-400 scale-125' : 'text-zinc-800 hover:text-zinc-600'}`}
                                >
                                    <Star
                                        size={36}
                                        fill={rating >= star ? 'currentColor' : 'none'}
                                        strokeWidth={1.5}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ajuste de Tiempo */}
                    <div className="w-full bg-black/40 p-6 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Clock size={14} className="text-indigo-500" /> Duración Total
                            </span>
                            <span className="text-xl font-mono text-white font-black">{duration} MIN</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="180"
                            step="5"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    <button
                        onClick={() => onConfirm({ rating, duration })}
                        className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase italic tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-4 group"
                    >
                        <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                        GUARDAR EN EL NÚCLEO
                    </button>

                    <button
                        onClick={onClose}
                        className="text-[10px] font-black text-zinc-600 hover:text-zinc-300 uppercase tracking-widest transition-colors"
                    >
                        Volver al entrenamiento
                    </button>
                </div>
            </div>
        </div>
    );
}
