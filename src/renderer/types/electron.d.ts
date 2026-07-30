export interface ElectronAPI {
  db: {
    getProgress: (childId: string, module: string) => Promise<any[]>
    getAllProgress: (childId: string) => Promise<any[]>
    saveProgress: (data: any) => Promise<any>
    getReviewItems: (childId: string) => Promise<any[]>
    getDailyStats: (childId: string, date: string) => Promise<any>
    saveDailyStats: (data: any) => Promise<any>
  }
  system: {
    minimize: () => void
    toggleFullscreen: () => void
    quitApp: () => void
    getAppVersion: () => Promise<string>
  }
  onConfirmClose: (callback: () => void) => () => void
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
