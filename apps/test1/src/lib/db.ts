// lib/db.js
import Database from 'better-sqlite3'

const db = new Database(process.env.DB_NAME) // Replace 'dev.db' with your database file

export default db
