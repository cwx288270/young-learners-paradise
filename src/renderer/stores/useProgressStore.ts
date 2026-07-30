import { create } from 'zustand'
import type { ModuleType, LearningProgress, DailyStats } from '../types'
import { getTodayStr } from '../utils/helpers'
import { getAllProgress, saveProgress as saveProgressSqlite, getDailyStats as getDailySqlite, saveDailyStats as saveDailySqlite } from '../utils/sqliteAdapter'

const PROGRESS_KEY = 'yl_progress'

interface ProgressState {
  progress: LearningProgress[]
  dailyStats: DailyStats | null
  totalStars: number
  consecutiveDays: number
  loadProgress: (childId: string) => Promise<void>
  loadDailyStats: (childId: string) => Promise<void>
  saveDailyStats: (childId: string, total_time: number) => Promise<void>
  saveProgress: (data: Partial<LearningProgress> & { child_id: string; module: ModuleType; item_id: string }) => Promise<void>
  getModuleProgress: (module: ModuleType) => LearningProgress[]
  getLearnedCount: (module: ModuleType) => number
  getMasteredCount: (module: ModuleType) => number
  getReviewItems: (childId: string) => LearningProgress[]
}

// localStorage fallback helpers
function loadProgressFromLocal(childId: string): LearningProgress[] {
  try {
    const all = localStorage.getItem(PROGRESS_KEY)
    if (!all) return []
    return JSON.parse(all).filter((p: LearningProgress) => p.child_id === childId)
  } catch { return [] }
}

function saveProgressToLocal(data: LearningProgress): void {
  try {
    const all = localStorage.getItem(PROGRESS_KEY)
    const existing: LearningProgress[] = all ? JSON.parse(all) : []
    const idx = existing.findIndex(p => p.child_id === data.child_id && p.item_id === data.item_id)
    if (idx >= 0) existing[idx] = data; else existing.push(data)
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(existing))
  } catch {}
}

function loadDailyFromLocal(childId: string, date: string): DailyStats | null {
  try {
    const data = localStorage.getItem(`yl_daily_${childId}_${date}`)
    return data ? JSON.parse(data) : null
  } catch { return null }
}

function saveDailyToLocal(stats: DailyStats): void {
  try {
    localStorage.setItem(`yl_daily_${stats.child_id}_${stats.date}`, JSON.stringify(stats))
  } catch {}
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: [],
  dailyStats: null,
  totalStars: 0,
  consecutiveDays: 0,

  loadProgress: async (childId) => {
    try {
      // 优先从 SQLite 加载
      const data = await getAllProgress(childId)
      if (data.length > 0) {
        set({ progress: data })
        // 同步到 localStorage 做缓存
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(data))
      } else {
        // fallback
        const local = loadProgressFromLocal(childId)
        set({ progress: local })
      }
      const mastered = get().progress.filter(p => p.status === 'mastered').length
      set({ totalStars: mastered * 3 })
    } catch (err) {
      console.error('加载进度失败:', err)
    }
  },

  loadDailyStats: async (childId) => {
    try {
      const today = getTodayStr()
      const data = await getDailySqlite(childId, today)
      if (data) {
        set({ dailyStats: data })
      } else {
        const local = loadDailyFromLocal(childId, today)
        set({ dailyStats: local })
      }
    } catch (err) {
      console.error('加载每日统计失败:', err)
    }
  },

  saveDailyStats: async (childId, total_time) => {
    try {
      const today = getTodayStr()
      const existing = await getDailySqlite(childId, today) || loadDailyFromLocal(childId, today)
      const data = existing || { child_id: childId, date: today, total_time: 0, items_learned: 0, items_reviewed: 0, avg_score: 0 }
      data.total_time = total_time
      await saveDailySqlite(data)
      saveDailyToLocal(data)
      set({ dailyStats: data })
    } catch (err) {
      console.error('保存每日统计失败:', err)
    }
  },

  saveProgress: async (data) => {
    try {
      const fullData: LearningProgress = {
        child_id: data.child_id,
        module: data.module,
        item_id: data.item_id,
        status: data.status || 'learning',
        mastery_level: data.mastery_level || 0,
        review_stage: data.review_stage || 0,
        consecutive_correct: data.consecutive_correct || 0,
        review_count: data.review_count || 1,
        next_review_date: data.next_review_date || Date.now() + 5 * 60 * 1000,
        first_learned: data.first_learned || Date.now(),
        last_reviewed: data.last_reviewed || Date.now(),
      }
      await saveProgressSqlite(fullData)
      saveProgressToLocal(fullData)
      await get().loadProgress(data.child_id)
    } catch (err) {
      console.error('保存进度失败:', err)
    }
  },

  getModuleProgress: (module) => get().progress.filter(p => p.module === module),
  getLearnedCount: (module) => get().progress.filter(p => p.module === module && p.status !== 'new').length,
  getMasteredCount: (module) => get().progress.filter(p => p.module === module && p.status === 'mastered').length,

  getReviewItems: (childId) => {
    const now = Date.now()
    return get().progress.filter(p => p.child_id === childId && p.next_review_date != null && p.next_review_date <= now)
  },
}))
