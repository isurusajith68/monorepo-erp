"use strict";
'use server';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPurchase = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const insertPurchase = async (formData) => {
    console.log('formData', formData);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // Extract the file from the form data
        const file = formData.get('receipt');
        if (!file) {
            throw new Error('No file uploaded');
        }
        // Convert file to binary buffer
        const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);
        // Insert the binary data into the database
        const insertSql = `INSERT INTO invoiceimages (image) VALUES (?)`;
        const stmt = db.prepare(insertSql);
        const info = stmt.run(buffer);
        if (info.changes === 1) {
            return { success: true, msg: '', lastInsertRowid: info.lastInsertRowid };
        }
        else {
            return { success: false, msg: 'Insert failed', lastInsertRowid: '0' };
        }
    }
    catch (error) {
        console.error('Error in Server action-insert-', error);
        return { success: false, msg: error.message, lastInsertRowid: '0' };
    }
    finally {
        db.close();
    }
};
exports.insertPurchase = insertPurchase;
