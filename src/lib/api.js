import { supabase } from './supabaseClient'

// API_URL empty to use Vite Proxy which forwards /api to backend
const API_URL = '';

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
        const response = await fetch(`${API_URL}${endpoint}`, { headers })
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
        return await response.json()
    },

    post: async (endpoint, body) => {
        const headers = await getHeaders()
        const response = await fetch(`${API_URL}${endpoint}`, {
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
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        })
        if (!response.ok) throw new Error(`Error ${response.status}`)
        return await response.json()
    },

    delete: async (endpoint) => {
        const headers = await getHeaders()
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
        })
        if (!response.ok) throw new Error(`Error ${response.status}`)
        return await response.json()
    }
}