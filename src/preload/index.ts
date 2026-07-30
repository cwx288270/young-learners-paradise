import { contextBridge, ipcRenderer } from 'electron'

const electronAPI = {
  db: {
    getProgress: (childId: string, module: string) => ipcRenderer.invoke('db:getProgress', childId, module),
    getAllProgress: (childId: string) => ipcRenderer.invoke('db:getAllProgress', childId),
    saveProgress: (data: any) => ipcRenderer.invoke('db:saveProgress', data),
    getReviewItems: (childId: string) => ipcRenderer.invoke('db:getReviewItems', childId),
    getDailyStats: (childId: string, date: string) => ipcRenderer.invoke('db:getDailyStats', childId, date),
    saveDailyStats: (data: any) => ipcRenderer.invoke('db:saveDailyStats', data),
  },
  system: {
    minimize: () => ipcRenderer.send('window:minimize'),
    toggleFullscreen: () => ipcRenderer.send('window:toggleFullscreen'),
    quitApp: () => ipcRenderer.send('window:quit'),
    getAppVersion: () => ipcRenderer.invoke('system:getAppVersion'),
  },
  onConfirmClose: (callback: () => void) => {
    ipcRenderer.on('confirm-close', callback)
    return () => { ipcRenderer.removeListener('confirm-close', callback) }
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
