const path = require('path');
const Database = require('better-sqlite3');
const crypto = require('crypto');

const dbFile = path.join(__dirname, 'freaky-fashion.db');
const db = new Database(dbFile);

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

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
    is_admin INTEGER NOT NULL DEFAULT 0
  )
`).run();

const adminEmail = 'admin';
const adminPasswordHash = hashPassword('kevinviktor');
const existingAdmin = db.prepare('SELECT id FROM users WHERE is_admin = 1 LIMIT 1').get();
if (!existingAdmin) {
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
  if (existingUser) {
    db.prepare('UPDATE users SET password = ?, is_admin = 1 WHERE id = ?').run(adminPasswordHash, existingUser.id);
  } else {
    db.prepare('INSERT INTO users (email, password, is_admin) VALUES (?, ?, 1)').run(adminEmail, adminPasswordHash);
  }
}

try {
  const userInfo = db.prepare("PRAGMA table_info('users')").all();
  const hasIsAdmin = userInfo.some(col => col.name && col.name.toLowerCase() === 'is_admin');
  if (!hasIsAdmin) {
    db.prepare('ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0').run();
  }

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
