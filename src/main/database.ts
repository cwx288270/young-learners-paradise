import Database from "better-sqlite3"
import path from "path"
import { app } from "electron"

let db: Database.Database | null = null

export function getDbPath(): string {
  return path.join(app.getPath("userData"), "data.db")
}

export function initDatabase(): void {
  const dbPath = getDbPath()
  db = new Database(dbPath)
  db.pragma("journal_mode = WAL")

  db.exec([
    "CREATE TABLE IF NOT EXISTS progress (",
    "  id INTEGER PRIMARY KEY AUTOINCREMENT,",
    "  child_id TEXT NOT NULL,",
    "  module TEXT NOT NULL,",
    "  item_id TEXT NOT NULL,",
    "  status TEXT DEFAULT 'new',",
    "  first_learned INTEGER,",
    "  last_reviewed INTEGER,",
    "  review_count INTEGER DEFAULT 0,",
    "  consecutive_correct INTEGER DEFAULT 0,",
    "  mastery_level INTEGER DEFAULT 0,",
    "  next_review_date INTEGER,",
    "  review_stage INTEGER DEFAULT 0,",
    "  UNIQUE(child_id, module, item_id)",
    ");",
    "",
    "CREATE TABLE IF NOT EXISTS daily_stats (",
    "  id INTEGER PRIMARY KEY AUTOINCREMENT,",
    "  child_id TEXT NOT NULL,",
    "  date TEXT NOT NULL,",
    "  total_time INTEGER DEFAULT 0,",
    "  items_learned INTEGER DEFAULT 0,",
    "  items_reviewed INTEGER DEFAULT 0,",
    "  avg_score REAL DEFAULT 0,",
    "  UNIQUE(child_id, date)",
    ");",
    "",
    "CREATE TABLE IF NOT EXISTS learning_log (",
    "  id INTEGER PRIMARY KEY AUTOINCREMENT,",
    "  child_id TEXT NOT NULL,",
    "  module TEXT NOT NULL,",
    "  item_id TEXT NOT NULL,",
    "  action TEXT NOT NULL,",
    "  score INTEGER,",
    "  timestamp INTEGER NOT NULL",
    ");",
    "",
    "CREATE INDEX IF NOT EXISTS idx_log_child_time ON learning_log(child_id, timestamp);",
  ].join("\n"))
}

export function getDb(): Database.Database {
  if (!db) throw new Error("Database not initialized.")
  return db
}

export function closeDatabase(): void {
  if (db) { db.close(); db = null }
}
