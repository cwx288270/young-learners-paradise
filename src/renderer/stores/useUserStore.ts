import { create } from 'zustand'
import type { ChildProfile } from '../types'
import { generateId } from '../utils/helpers'
import { getProfiles, saveProfile } from '../utils/sqliteAdapter'

function loadFromStorage(): ChildProfile[] {
  try {
    const data = localStorage.getItem('yl_profiles')
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

function saveToStorage(profiles: ChildProfile[]): void {
  localStorage.setItem('yl_profiles', JSON.stringify(profiles))
}

interface UserState {
  children: ChildProfile[]
  currentChild: ChildProfile | null
  loadChildren: () => Promise<void>
  saveChildren: () => Promise<void>
  setCurrentChild: (child: ChildProfile) => void
  addChild: (name: string, age: number, avatar: string) => void
  removeChild: (id: string) => void
}

export const useUserStore = create<UserState>((set, get) => ({
  children: [],
  currentChild: null,

  loadChildren: async () => {
    try {
      // 优先从 SQLite 加载
      const profiles = await getProfiles()
      if (profiles.length > 0) {
        set({ children: profiles })
        if (profiles.length === 1) set({ currentChild: profiles[0] })
        saveToStorage(profiles) // 同步到 localStorage 做缓存
        return
      }
      // fallback: localStorage
      const localProfiles = loadFromStorage()
      set({ children: localProfiles })
      if (localProfiles.length === 1) set({ currentChild: localProfiles[0] })
    } catch (err) {
      console.error('加载用户档案失败:', err)
    }
  },

  saveChildren: async () => {
    try {
      const children = get().children
      saveToStorage(children)
      for (const child of children) {
        await saveProfile(child)
      }
    } catch (err) {
      console.error('保存用户档案失败:', err)
    }
  },

  setCurrentChild: (child) => set({ currentChild: child }),

  addChild: (name, age, avatar) => {
    const newChild: ChildProfile = {
      id: generateId(), name, avatar, age, createdAt: Date.now(),
    }
    set(state => ({ children: [...state.children, newChild] }))
    get().saveChildren()
  },

  removeChild: (id) => {
    set(state => ({ children: state.children.filter(c => c.id !== id) }))
    const { currentChild } = get()
    if (currentChild?.id === id) set({ currentChild: null })
    get().saveChildren()
  },
}))
