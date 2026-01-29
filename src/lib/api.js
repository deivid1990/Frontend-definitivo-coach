import { supabase } from './supabaseClient'

// Usamos la variable de Vercel. 
// Si la variable es "https://.../api", este código se asegura de no duplicarlo.
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

// Función auxiliar para limpiar la URL y evitar el error /api/api
const buildUrl = (endpoint) => {
    let base = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    let path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // Si la base ya incluye /api y el path también, quitamos uno
    if (base.endsWith('/api') && path.startsWith('/api/')) {
        path = path.replace('/api', '');
    }

    return `${base}${path}`;
};

export const api = {
    get: async (endpoint) => {
        const headers = await getHeaders()
        const response = await fetch(buildUrl(endpoint), { headers })
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
        return await response.json()
    },

    post: async (endpoint, body) => {
        const headers = await getHeaders()
        const response = await fetch(buildUrl(endpoint), {
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
        const response = await fetch(buildUrl(endpoint), {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        })
        if (!response.ok) throw new Error(`Error ${response.status}`)
        return await response.json()
    },

    delete: async (endpoint) => {
        const headers = await getHeaders()
        const response = await fetch(buildUrl(endpoint), {
            method: 'DELETE',
            headers,
        })
        if (!response.ok) throw new Error(`Error ${response.status}`)
        return await response.json()
    }
}