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
    password TEXT NOT NULL
  )
`).run();

module.exports = db;
