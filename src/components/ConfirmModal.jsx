import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Eliminar", cancelText = "Cancelar" }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 w-full max-w-sm relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/20 via-red-500 to-red-500/20"></div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 text-red-500">
                        <AlertCircle size={32} strokeWidth={2.5} />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
                            {title || '¿Confirmar Acción?'}
                        </h2>
                        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                            {message || '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.'}
                        </p>
                    </div>

                    <div className="flex gap-4 w-full pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all active:scale-95"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-lg shadow-red-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
