import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UpdatePassword from '../pages/UpdatePassword'
import { supabase } from '../lib/supabaseClient'

// Mock de Supabase
vi.mock('../lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: vi.fn(),
            updateUser: vi.fn(),
        }
    }
}))

const renderUpdatePassword = () => {
    return render(
        <MemoryRouter>
            <UpdatePassword />
        </MemoryRouter>
    )
}

describe('UpdatePassword Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('debe mostrar cargando mientras valida la sesión', () => {
        supabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
        renderUpdatePassword()
        expect(screen.getByText(/Validando Enlace/i)).toBeInTheDocument()
    })

    it('debe mostrar el formulario si hay una sesión válida', async () => {
        supabase.auth.getSession.mockResolvedValue({
            data: { session: { user: { id: 'test-user' } } },
            error: null
        })

        renderUpdatePassword()

        await waitFor(() => {
            expect(screen.getByPlaceholderText(/Mínimo 6 caracteres/i)).toBeInTheDocument()
            expect(screen.getByText(/Sincronizar Password/i)).toBeInTheDocument()
        })
    })

    it('debe permitir actualizar la contraseña con éxito', async () => {
        supabase.auth.getSession.mockResolvedValue({
            data: { session: { user: { id: 'test-user' } } },
            error: null
        })
        supabase.auth.updateUser.mockResolvedValue({ error: null })

        renderUpdatePassword()

        await waitFor(() => {
            const input = screen.getByPlaceholderText(/Mínimo 6 caracteres/i)
            fireEvent.change(input, { target: { value: 'newpassword123' } })
            fireEvent.click(screen.getByText(/Sincronizar Password/i))
        })

        await waitFor(() => {
            expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: 'newpassword123' })
            expect(screen.getByText(/¡ÉXITO!/i)).toBeInTheDocument()
        })
    })

    it('debe mostrar error si el enlace es inválido', async () => {
        // Simulamos que tras esperar, no hay sesión
        supabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })

        renderUpdatePassword()

        // El componente tiene un setTimeout de 1.5s en mi código
        await waitFor(() => {
            expect(screen.getByText(/inválido o ha caducado/i)).toBeInTheDocument()
        }, { timeout: 3000 })
    })
})
