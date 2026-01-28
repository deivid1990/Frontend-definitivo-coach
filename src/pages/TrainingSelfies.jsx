import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { Camera, Plus, History, Loader2, Trash2, Calendar, CheckCircle, X } from 'lucide-react'
import ConfirmModal from '../components/ConfirmModal'

export default function TrainingSelfies() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [selfies, setSelfies] = useState([])
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [newSelfie, setNewSelfie] = useState({ description: '', file: null, preview: null })
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, imageUrl: null })

    useEffect(() => {
        if (user) fetchSelfies()
    }, [user])

    const fetchSelfies = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('entrenamiento_selfies')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            setSelfies(data || [])
        } catch (error) {
            console.error('Error fetching selfies:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setNewSelfie({
                ...newSelfie,
                file: file,
                preview: URL.createObjectURL(file)
            })
        }
    }

    const uploadSelfie = async (e) => {
        e.preventDefault()
        if (!newSelfie.file) return

        try {
            setUploading(true)

            // 1. Subir imagen a Supabase Storage
            const fileExt = newSelfie.file.name.split('.').pop()
            const fileName = `${user.id}/${Date.now()}.${fileExt}`
            const filePath = `selfies/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('gym-assets') // Asumimos que existe o lo usaremos como bucket principal
                .upload(filePath, newSelfie.file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('gym-assets')
                .getPublicUrl(filePath)

            // 2. Guardar registro en la base de datos
            const { error: dbError } = await supabase
                .from('entrenamiento_selfies')
                .insert([{
                    user_id: user.id,
                    image_url: publicUrl,
                    description: newSelfie.description
                }])

            if (dbError) throw dbError

            setShowUploadModal(false)
            setNewSelfie({ description: '', file: null, preview: null })
            fetchSelfies()
        } catch (error) {
            alert('Error al subir: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteModal.id) return
        try {
            const { error } = await supabase.from('entrenamiento_selfies').delete().eq('id', deleteModal.id)
            if (error) throw error
            setSelfies(selfies.filter(s => s.id !== deleteModal.id))
            setDeleteModal({ isOpen: false, id: null, imageUrl: null })
        } catch (error) {
            alert('Error eliminando: ' + error.message)
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-4 pb-24 animate-fade-up space-y-10">
            {/* Header Revolucionario */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
                        MIS <span className="text-indigo-500">PROGRESOS</span>
                    </h1>
                </div>
                <button
                    onClick={() => setShowUploadModal(true)}
                    className="group relative flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
                >
                    <Camera size={18} className="group-hover:rotate-12 transition-transform" />
                    Capturar Progreso
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-[3/4] bg-zinc-900/40 rounded-[2.5rem] animate-pulse border border-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {selfies.length === 0 && (
                        <div className="col-span-full py-32 text-center bg-zinc-950/40 rounded-[3rem] border border-dashed border-zinc-800">
                            <History size={48} className="mx-auto mb-6 text-zinc-700 opacity-20" />
                            <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.4em]">Sin registros visuales detectados</p>
                        </div>
                    )}

                    {selfies.map((selfie) => (
                        <div key={selfie.id} className="group bg-zinc-900/40 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-indigo-500/40 transition-all duration-500 shadow-2xl flex flex-col">
                            {/* Imagen Container (Relative para el botón de borrar) */}
                            <div className="relative aspect-[4/5] bg-black/40 flex items-center justify-center overflow-hidden">
                                {/* Acciones */}
                                <button
                                    onClick={() => setDeleteModal({ isOpen: true, id: selfie.id, imageUrl: selfie.image_url })}
                                    className="absolute top-5 right-5 z-50 p-3 bg-black/60 backdrop-blur-md text-zinc-500 hover:text-red-500 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>

                                {/* Fondo de desenfoque revolucionario */}
                                <img
                                    src={selfie.image_url}
                                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-30"
                                    alt="Blur Background"
                                />
                                <img
                                    src={selfie.image_url}
                                    alt="Workout Selfie"
                                    className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                            </div>

                            {/* Descripción y Fecha (Abajo de la foto) */}
                            <div className="p-6 space-y-2">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                                    {new Date(selfie.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </p>
                                <p className="text-zinc-200 font-medium text-sm leading-relaxed">
                                    {selfie.description || 'Sin descripción'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de Subida */}
            {showUploadModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-zinc-900 border border-white/10 rounded-[3rem] p-8 w-full max-w-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-white uppercase italic italic tracking-tighter">Nueva Captura</h2>
                            <button onClick={() => setShowUploadModal(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
                        </div>

                        <form onSubmit={uploadSelfie} className="space-y-6">
                            <div className="relative aspect-video bg-black/40 rounded-3xl border border-white/5 overflow-hidden group cursor-pointer">
                                {newSelfie.preview ? (
                                    <img src={newSelfie.preview} className="w-full h-full object-contain" alt="Preview" />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-zinc-600">
                                        <Plus size={32} />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Seleccionar Archivo</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">¿Cómo estuvo tu entrenamiento?</label>
                                <textarea
                                    value={newSelfie.description}
                                    onChange={e => setNewSelfie({ ...newSelfie, description: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 text-white p-5 rounded-2xl outline-none focus:border-indigo-500 transition-all text-sm min-h-[100px]"
                                    placeholder="¿Cómo te sentiste hoy? (Ej: Nuevo PR en Press Militar)"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={uploading || !newSelfie.file}
                                className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase italic tracking-[0.2em] text-xs rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {uploading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                                {uploading ? 'TRANSMITIENDO...' : 'SINCRONIZAR EVOLUCIÓN'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Modal de Confirmación de Borrado */}
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, id: null, imageUrl: null })}
                onConfirm={handleDelete}
                title="¿Eliminar Recuerdo?"
                message="¿Estás seguro de que deseas borrar este progreso visual? No podrás recuperar la foto."
                confirmText="SÍ, ELIMINAR"
                cancelText="NO, CANCELAR"
            />
        </div>
    )
}
