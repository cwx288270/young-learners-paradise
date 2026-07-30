import type { LearningProgress, DailyStats } from '../types'

// Detect if running inside Electron
function isElectron(): boolean {
  return typeof window !== 'undefined' && !!window.electronAPI
}

// localStorage keys (for dev mode fallback)
const PROGRESS_KEY = 'yl_progress'
const DAILY_KEY = 'yl_daily'

// ===== Progress =====

export async function getProgressFromDb(childId: string, module: string): Promise<LearningProgress[]> {
  if (isElectron()) {
    return await window.electronAPI!.db.getProgress(childId, module) as LearningProgress[]
  }
  return loadProgressFromLocalStorage(childId).filter(p => p.module === module)
}

export async function getAllProgressFromDb(childId: string): Promise<LearningProgress[]> {
  if (isElectron()) {
    return await window.electronAPI!.db.getAllProgress(childId) as LearningProgress[]
  }
  return loadProgressFromLocalStorage(childId)
}

export async function saveProgressToDb(data: any): Promise<void> {
  if (isElectron()) {
    await window.electronAPI!.db.saveProgress(data)
    return
  }
  saveProgressToLocalStorage(data)
}

export async function getReviewItemsFromDb(childId: string): Promise<LearningProgress[]> {
  if (isElectron()) {
    return await window.electronAPI!.db.getReviewItems(childId) as LearningProgress[]
  }
  const all = loadProgressFromLocalStorage(childId)
  const now = Date.now()
  return all.filter(p => p.next_review_date != null && p.next_review_date <= now)
}

// ===== Daily Stats =====

export async function getDailyStatsFromDb(childId: string, date: string): Promise<DailyStats | null> {
  if (isElectron()) {
    return await window.electronAPI!.db.getDailyStats(childId, date) as DailyStats | null
  }
  return loadDailyStatsFromLocalStorage(childId, date)
}

export async function saveDailyStatsToDb(data: DailyStats): Promise<void> {
  if (isElectron()) {
    await window.electronAPI!.db.saveDailyStats(data)
    return
  }
  saveDailyStatsToLocalStorage(data)
}

// ===== localStorage Fallback =====

function loadProgressFromLocalStorage(childId: string): LearningProgress[] {
  try {
    const allData = localStorage.getItem(PROGRESS_KEY)
    if (!allData) return []
    const parsed: LearningProgress[] = JSON.parse(allData)
    return parsed.filter(p => p.child_id === childId)
  } catch {
    return []
  }
}

function saveProgressToLocalStorage(data: LearningProgress): void {
  try {
    const allData = localStorage.getItem(PROGRESS_KEY)
    const existing: LearningProgress[] = allData ? JSON.parse(allData) : []
    const idx = existing.findIndex(p => p.child_id === data.child_id && p.item_id === data.item_id)
    if (idx >= 0) {
      existing[idx] = data
    } else {
      existing.push(data)
    }
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(existing))
  } catch (err) {
    console.error('保存进度到localStorage失败:', err)
  }
}

function loadDailyStatsFromLocalStorage(childId: string, date: string): DailyStats | null {
  try {
    const key = DAILY_KEY + '_' + childId + '_' + date
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

function saveDailyStatsToLocalStorage(stats: DailyStats): void {
  try {
    const key = DAILY_KEY + '_' + stats.child_id + '_' + stats.date
    localStorage.setItem(key, JSON.stringify(stats))
  } catch (err) {
    console.error('保存每日统计失败:', err)
  }
}
