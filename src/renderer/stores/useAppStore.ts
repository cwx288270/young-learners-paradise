import { create } from 'zustand'

interface AppState {
  isFullscreen: boolean
  isMaximized: boolean
  showCelebration: boolean
  celebrationType: 'stars' | 'complete' | 'milestone' | null
  setIsFullscreen: (v: boolean) => void
  setIsMaximized: (v: boolean) => void
  triggerCelebration: (type: 'stars' | 'complete' | 'milestone') => void
  clearCelebration: () => void
}

export const useAppStore = create<AppState>((set) => ({
  isFullscreen: false,
  isMaximized: false,
  showCelebration: false,
  celebrationType: null,

  setIsFullscreen: (v) => set({ isFullscreen: v }),
  setIsMaximized: (v) => set({ isMaximized: v }),
  triggerCelebration: (type) => set({ showCelebration: true, celebrationType: type }),
  clearCelebration: () => set({ showCelebration: false, celebrationType: null }),
}))
