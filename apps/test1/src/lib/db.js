"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/db.js
const better_sqlite3_1 = require("better-sqlite3");
const db = new better_sqlite3_1.default(process.env.DB_NAME); // Replace 'dev.db' with your database file
exports.default = db;
