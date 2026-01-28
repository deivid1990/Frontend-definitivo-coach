import React from 'react'
import { X, PlayCircle } from 'lucide-react'

export default function ExerciseVideo({ isOpen, onClose, videoUrl, exerciseName }) {
    if (!isOpen) return null;

    // Convertir links de YouTube a formato embed si es necesario
    const getEmbedUrl = (url) => {
        if (!url) return null;
        let videoId = '';
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('/').pop().split('?')[0];
        } else if (url.includes('embed/')) {
            videoId = url.split('embed/')[1].split('?')[0];
        } else {
            return url;
        }

        // Retornar URL de embed optimizada
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&mute=1`;
    }

    const embedUrl = getEmbedUrl(videoUrl);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-white/10 w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-6 bg-zinc-900/50 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-xl">
                            <PlayCircle className="text-indigo-400" size={20} />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Tutorial: {exerciseName}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Video Area */}
                <div className="aspect-video bg-black flex items-center justify-center">
                    {embedUrl ? (
                        <iframe
                            className="w-full h-full"
                            src={embedUrl}
                            title={exerciseName}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="text-center p-12">
                            <PlayCircle size={64} className="text-zinc-800 mx-auto mb-4" />
                            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-6">Sin video directo disponible</p>
                            <a
                                href={`https://www.youtube.com/results?search_query=tecnica+${encodeURIComponent(exerciseName)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 mt-4 inline-block shadow-lg shadow-indigo-600/20"
                            >
                                Buscar en YouTube Externo
                            </a>
                        </div>
                    )}
                </div>

                {/* Footer / Safety Note */}
                <div className="p-6 bg-indigo-600/10 border-t border-white/5">
                    <p className="text-xs text-indigo-300 font-medium leading-relaxed italic text-center">
                        "La técnica es tu armadura. Mantén el control del peso en todo momento y prioriza el rango de movimiento sobre la carga."
                    </p>
                </div>
            </div>
        </div>
    )
}
