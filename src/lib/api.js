import { supabase } from './supabaseClient'

// Configuración dinámica: Usa la variable de Vercel en producción
// En local, si no existe la variable, intentará usar el proxy relativo
const API_URL = import.meta.env.VITE_API_URL || '';

async function getHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    return headers
}

export const api = {
    get: async (endpoint) => {
        const headers = await getHeaders()
        // Eliminamos el slash extra si endpoint ya trae uno
        const url = `${API_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1")
        const response = await fetch(url, { headers })
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
        return await response.json()
    },

    post: async (endpoint, body) => {
        const headers = await getHeaders()
        const url = `${API_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1")
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
        if (!response.ok) {
            const err = await response.json().catch(() => ({}))
            throw new Error(err.error || `Error ${response.status}`)
        }
        return await response.json()
    },

    put: async (endpoint, body) => {
        const headers = await getHeaders()
        const url = `${API_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1")
        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        })
        if (!response.ok) throw new Error(`Error ${response.status}`)
        return await response.json()
    },

    delete: async (endpoint) => {
        const headers = await getHeaders()
        const url = `${API_URL}${endpoint}`.replace(/([^:]\/)\/+/g, "$1")
        const response = await fetch(url, {
            method: 'DELETE',
            headers,
        })
        if (!response.ok) throw new Error(`Error ${response.status}`)
        return await response.json()
    }
}