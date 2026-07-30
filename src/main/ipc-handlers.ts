import { ipcMain } from 'electron'
import { getDb } from './database'

export function registerIpcHandlers(): void {
  const db = getDb()

  ipcMain.handle('db:getProgress', (_event, childId: string, module: string) => {
    return db.prepare('SELECT * FROM progress WHERE child_id = ? AND module = ?').all(childId, module)
  })

  ipcMain.handle('db:getAllProgress', (_event, childId: string) => {
    return db.prepare('SELECT * FROM progress WHERE child_id = ?').all(childId)
  })

  ipcMain.handle('db:saveProgress', (_event, data: any) => {
    const cols = ['child_id','module','item_id','status','first_learned','last_reviewed',
      'review_count','consecutive_correct','mastery_level','next_review_date','review_stage']
    const ph = cols.map(c => '@' + c).join(', ')
    const sql = 'INSERT OR REPLACE INTO progress (' + cols.join(', ') + ') VALUES (' + ph + ')'
    return db.prepare(sql).run(data)
  })

  ipcMain.handle('db:getReviewItems', (_event, childId: string) => {
    const now = Date.now()
    return db.prepare(
      'SELECT * FROM progress WHERE child_id = ? AND next_review_date IS NOT NULL AND next_review_date <= ?'
    ).all(childId, now)
  })

  ipcMain.handle('db:getDailyStats', (_event, childId: string, date: string) => {
    return db.prepare('SELECT * FROM daily_stats WHERE child_id = ? AND date = ?').get(childId, date) || null
  })

  ipcMain.handle('db:saveDailyStats', (_event, data: any) => {
    const cols = ['child_id','date','total_time','items_learned','items_reviewed','avg_score']
    const ph = cols.map(c => '@' + c).join(', ')
    const sql = 'INSERT OR REPLACE INTO daily_stats (' + cols.join(', ') + ') VALUES (' + ph + ')'
    return db.prepare(sql).run(data)
  })

  ipcMain.handle('system:getAppVersion', () => {
    return '1.0.0'
  })
}
