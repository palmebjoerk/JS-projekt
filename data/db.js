const path = require('path');
const Database = require('better-sqlite3');

const dbFile = path.join(__dirname, 'freaky-fashion.db');
const db = new Database(dbFile);

db.prepare(`
  CREATE TABLE IF NOT EXISTS clothes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    color TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    image_url TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    admin INTEGER NOT NULL DEFAULT 0
  )
`).run();

try {
  const userInfo = db.prepare("PRAGMA table_info('users')").all();
  const hasAdmin = userInfo.some(col => col.name && col.name.toLowerCase() === 'admin');
  if (!hasAdmin) {
    db.prepare('ALTER TABLE users ADD COLUMN admin INTEGER NOT NULL DEFAULT 0').run();
  }
} catch (err) {
  console.error('DB migration warning:', err && err.message ? err.message : err);
}

// Ensure `sku` column exists and has a unique index
try {
  const info = db.prepare("PRAGMA table_info('clothes')").all();
  const hasSku = info.some(col => col.name && col.name.toLowerCase() === 'sku');
  if (!hasSku) {
    db.prepare("ALTER TABLE clothes ADD COLUMN sku TEXT").run();
  }
  db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_clothes_sku ON clothes(sku)").run();
} catch (err) {
  // Migration errors should not crash the app; log to console
  console.error('DB migration warning:', err && err.message ? err.message : err);
}

module.exports = db;
