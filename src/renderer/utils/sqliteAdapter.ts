/**
 * SQLite 数据库适配层
 * Android: capacitor-community/sqlite
 * Electron: better-sqlite3 (via IPC)
 * Fallback: localStorage
 */
import type { LearningProgress, DailyStats, ChildProfile } from '../types'

// 动态导入 capacitor-community/sqlite（仅在 Capacitor 环境下可用）
let CapacitorSQLite: any = null
let db: any = null
const DB_NAME = 'young_learners'

async function getSQLite() {
  if (!CapacitorSQLite) {
    try {
      const mod = await import('@capacitor-community/sqlite')
      CapacitorSQLite = mod
    } catch {
      return null
    }
  }
  return CapacitorSQLite
}

function isCapacitor(): boolean {
  return typeof (window as any)?.Capacitor !== 'undefined'
}

function isElectron(): boolean {
  return typeof window !== 'undefined' && !!(window as any).electronAPI
}

// ===== 数据库初始化 =====

export async function initDatabase(): Promise<void> {
  if (isElectron()) return // Electron 有自己的初始化流程

  const sqlite = await getSQLite()
  if (!sqlite) {
    console.log('SQLite plugin not available, using localStorage fallback')
    return
  }

  try {
    db = await sqlite.CapacitorSQLite.createConnection(DB_NAME, false, 'no-encryption', 1, false)
    await db.open()

    // 建表（复用 Electron 版 schema）
    const schema = `
      CREATE TABLE IF NOT EXISTS progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        child_id TEXT NOT NULL,
        module TEXT NOT NULL,
        item_id TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        first_learned INTEGER,
        last_reviewed INTEGER,
        review_count INTEGER DEFAULT 0,
        consecutive_correct INTEGER DEFAULT 0,
        mastery_level INTEGER DEFAULT 0,
        next_review_date INTEGER,
        review_stage INTEGER DEFAULT 0,
        UNIQUE(child_id, module, item_id)
      );

      CREATE TABLE IF NOT EXISTS daily_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        child_id TEXT NOT NULL,
        date TEXT NOT NULL,
        total_time INTEGER DEFAULT 0,
        items_learned INTEGER DEFAULT 0,
        items_reviewed INTEGER DEFAULT 0,
        avg_score REAL DEFAULT 0,
        UNIQUE(child_id, date)
      );

      CREATE TABLE IF NOT EXISTS learning_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        child_id TEXT NOT NULL,
        module TEXT NOT NULL,
        item_id TEXT NOT NULL,
        action TEXT NOT NULL,
        score INTEGER,
        timestamp INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS profiles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        avatar TEXT NOT NULL,
        age INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_log_child_time ON learning_log(child_id, timestamp);
    `
    await db.execute(schema)

    // 从 localStorage 迁移数据（如果存在且 SQLite 为空）
    await migrateFromLocalStorage()

    console.log('SQLite database initialized successfully')
  } catch (err) {
    console.error('Failed to initialize SQLite database:', err)
    db = null
  }
}

async function migrateFromLocalStorage(): Promise<void> {
  if (!db) return
  try {
    // 检查是否已有数据
    const existing = await db.query('SELECT COUNT(*) as cnt FROM progress')
    if (existing?.values?.[0]?.cnt > 0) return // 已有数据，不迁移

    // 迁移 progress
    const progressData = localStorage.getItem('yl_progress')
    if (progressData) {
      const items: LearningProgress[] = JSON.parse(progressData)
      for (const item of items) {
        await db.run(
          `INSERT OR REPLACE INTO progress (child_id, module, item_id, status, first_learned, last_reviewed, review_count, consecutive_correct, mastery_level, next_review_date, review_stage)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [item.child_id, item.module, item.item_id, item.status, item.first_learned, item.last_reviewed,
           item.review_count, item.consecutive_correct, item.mastery_level, item.next_review_date, item.review_stage]
        )
      }
      console.log(`Migrated ${items.length} progress records from localStorage`)
    }

    // 迁移 profiles
    const profilesData = localStorage.getItem('yl_profiles')
    if (profilesData) {
      const profiles: ChildProfile[] = JSON.parse(profilesData)
      for (const p of profiles) {
        await db.run(
          'INSERT OR REPLACE INTO profiles (id, name, avatar, age, created_at) VALUES (?, ?, ?, ?, ?)',
          [p.id, p.name, p.avatar, p.age, p.createdAt]
        )
      }
      console.log(`Migrated ${profiles.length} profiles from localStorage`)
    }

    // 迁移 daily_stats
    const today = new Date().toISOString().slice(0, 10)
    const dailyKey = `yl_daily_`
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(dailyKey)) {
        try {
          const stats: DailyStats = JSON.parse(localStorage.getItem(key)!)
          await db.run(
            'INSERT OR REPLACE INTO daily_stats (child_id, date, total_time, items_learned, items_reviewed, avg_score) VALUES (?, ?, ?, ?, ?, ?)',
            [stats.child_id, stats.date, stats.total_time, stats.items_learned, stats.items_reviewed, stats.avg_score]
          )
        } catch { /* skip invalid entries */ }
      }
    }
  } catch (err) {
    console.error('Migration from localStorage failed:', err)
  }
}

// ===== Progress CRUD =====

export async function getAllProgress(childId: string): Promise<LearningProgress[]> {
  if (isElectron()) {
    return await (window as any).electronAPI!.db.getAllProgress(childId) as LearningProgress[]
  }
  if (!db) return loadProgressFromLocal(childId)

  try {
    const result = await db.query('SELECT * FROM progress WHERE child_id = ?', [childId])
    return (result?.values || []).map(rowToProgress)
  } catch {
    return loadProgressFromLocal(childId)
  }
}

export async function saveProgress(data: Partial<LearningProgress> & { child_id: string; module: string; item_id: string }): Promise<void> {
  if (isElectron()) {
    await (window as any).electronAPI!.db.saveProgress(data)
    return
  }
  if (!db) { saveProgressToLocal(data as LearningProgress); return }

  try {
    await db.run(
      `INSERT OR REPLACE INTO progress (child_id, module, item_id, status, first_learned, last_reviewed, review_count, consecutive_correct, mastery_level, next_review_date, review_stage)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.child_id, data.module, data.item_id,
       data.status || 'learning', data.first_learned || Date.now(), data.last_reviewed || Date.now(),
       data.review_count || 1, data.consecutive_correct || 0, data.mastery_level || 0,
       data.next_review_date || Date.now() + 5 * 60 * 1000, data.review_stage || 0]
    )
  } catch (err) {
    console.error('Failed to save progress to SQLite:', err)
    saveProgressToLocal(data as LearningProgress)
  }
}

export async function getReviewItems(childId: string): Promise<LearningProgress[]> {
  if (isElectron()) {
    return await (window as any).electronAPI!.db.getReviewItems(childId) as LearningProgress[]
  }
  if (!db) {
    const all = loadProgressFromLocal(childId)
    const now = Date.now()
    return all.filter(p => p.next_review_date != null && p.next_review_date <= now)
  }

  try {
    const now = Date.now()
    const result = await db.query(
      'SELECT * FROM progress WHERE child_id = ? AND next_review_date IS NOT NULL AND next_review_date <= ?',
      [childId, now]
    )
    return (result?.values || []).map(rowToProgress)
  } catch {
    return []
  }
}

// ===== Daily Stats CRUD =====

export async function getDailyStats(childId: string, date: string): Promise<DailyStats | null> {
  if (isElectron()) {
    return await (window as any).electronAPI!.db.getDailyStats(childId, date) as DailyStats | null
  }
  if (!db) return loadDailyFromLocal(childId, date)

  try {
    const result = await db.query('SELECT * FROM daily_stats WHERE child_id = ? AND date = ?', [childId, date])
    if (result?.values?.length > 0) {
      const r = result.values[0]
      return { child_id: r.child_id, date: r.date, total_time: r.total_time, items_learned: r.items_learned, items_reviewed: r.items_reviewed, avg_score: r.avg_score }
    }
    return null
  } catch {
    return loadDailyFromLocal(childId, date)
  }
}

export async function saveDailyStats(data: DailyStats): Promise<void> {
  if (isElectron()) {
    await (window as any).electronAPI!.db.saveDailyStats(data)
    return
  }
  if (!db) { saveDailyToLocal(data); return }

  try {
    await db.run(
      'INSERT OR REPLACE INTO daily_stats (child_id, date, total_time, items_learned, items_reviewed, avg_score) VALUES (?, ?, ?, ?, ?, ?)',
      [data.child_id, data.date, data.total_time, data.items_learned, data.items_reviewed, data.avg_score]
    )
  } catch (err) {
    console.error('Failed to save daily stats to SQLite:', err)
    saveDailyToLocal(data)
  }
}

// ===== Profiles CRUD =====

export async function getProfiles(): Promise<ChildProfile[]> {
  if (!db) return loadProfilesFromLocal()

  try {
    const result = await db.query('SELECT * FROM profiles ORDER BY created_at')
    return (result?.values || []).map((r: any) => ({
      id: r.id, name: r.name, avatar: r.avatar, age: r.age, createdAt: r.created_at,
    }))
  } catch {
    return loadProfilesFromLocal()
  }
}

export async function saveProfile(profile: ChildProfile): Promise<void> {
  if (!db) { saveProfileToLocal(profile); return }

  try {
    await db.run(
      'INSERT OR REPLACE INTO profiles (id, name, avatar, age, created_at) VALUES (?, ?, ?, ?, ?)',
      [profile.id, profile.name, profile.avatar, profile.age, profile.createdAt]
    )
  } catch (err) {
    console.error('Failed to save profile to SQLite:', err)
    saveProfileToLocal(profile)
  }
}

// ===== localStorage Fallback =====

function rowToProgress(r: any): LearningProgress {
  return {
    child_id: r.child_id, module: r.module, item_id: r.item_id,
    status: r.status, first_learned: r.first_learned, last_reviewed: r.last_reviewed,
    review_count: r.review_count, consecutive_correct: r.consecutive_correct,
    mastery_level: r.mastery_level, next_review_date: r.next_review_date, review_stage: r.review_stage,
  }
}

function loadProgressFromLocal(childId: string): LearningProgress[] {
  try {
    const data = localStorage.getItem('yl_progress')
    return data ? JSON.parse(data).filter((p: LearningProgress) => p.child_id === childId) : []
  } catch { return [] }
}

function saveProgressToLocal(data: LearningProgress): void {
  try {
    const all = localStorage.getItem('yl_progress')
    const existing: LearningProgress[] = all ? JSON.parse(all) : []
    const idx = existing.findIndex(p => p.child_id === data.child_id && p.item_id === data.item_id)
    if (idx >= 0) existing[idx] = data; else existing.push(data)
    localStorage.setItem('yl_progress', JSON.stringify(existing))
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

function loadProfilesFromLocal(): ChildProfile[] {
  try {
    const data = localStorage.getItem('yl_profiles')
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

function saveProfileToLocal(profile: ChildProfile): void {
  try {
    const profiles = loadProfilesFromLocal()
    const idx = profiles.findIndex(p => p.id === profile.id)
    if (idx >= 0) profiles[idx] = profile; else profiles.push(profile)
    localStorage.setItem('yl_profiles', JSON.stringify(profiles))
  } catch {}
}

// ===== 关闭数据库 =====

export async function closeDatabase(): Promise<void> {
  if (db) {
    try { await db.close(); } catch {}
    db = null
  }
}
