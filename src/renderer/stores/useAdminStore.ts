import { create } from 'zustand'

const ADMIN_KEY = 'yl_admin_mode'

function loadAdminState(): boolean {
  try {
    return localStorage.getItem(ADMIN_KEY) === 'true'
  } catch {
    return false
  }
}

function saveAdminState(enabled: boolean): void {
  try {
    localStorage.setItem(ADMIN_KEY, String(enabled))
  } catch { /* ignore */ }
}

interface AdminState {
  isAdmin: boolean
  toggleAdmin: () => void
  enableAdmin: () => void
  disableAdmin: () => void
}

export const useAdminStore = create<AdminState>((set, get) => ({
  isAdmin: loadAdminState(),

  toggleAdmin: () => {
    const next = !get().isAdmin
    saveAdminState(next)
    set({ isAdmin: next })
  },

  enableAdmin: () => {
    saveAdminState(true)
    set({ isAdmin: true })
  },

  disableAdmin: () => {
    saveAdminState(false)
    set({ isAdmin: false })
  },
}))
