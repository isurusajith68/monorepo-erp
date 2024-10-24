"use strict";
'use server';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDueAmount = exports.getAllIncomeCompany = exports.getAllIncomePerson = exports.getAllIncome = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const getAllIncome = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
      SELECT 
        itype, 
        COUNT(*) as count, 
        SUM(totalAmount) as totalAmount
      FROM 
        invoices
      GROUP BY 
        itype
    `)
            .all();
        return Promise.resolve({ success: true, msg: '', data: [...mainRow] });
    }
    catch (er) {
        console.log('Error in Server action-getitem-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getAllIncome = getAllIncome;
//////////////////////////////////////////////////
const getAllIncomePerson = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
      SELECT 
        itype, 
        COUNT(*) as count, 
        SUM(totalpaid) as totalpaid
      FROM 
        invoices
         WHERE 
          itype = 'Person'
      GROUP BY 
        itype
    `)
            .all();
        return Promise.resolve({ success: true, msg: '', data: [...mainRow] });
    }
    catch (er) {
        console.log('Error in Server action-getitem-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getAllIncomePerson = getAllIncomePerson;
//////////////////////////////////////////////////
const getAllIncomeCompany = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
      SELECT 
        itype, 
        COUNT(*) as count, 
        SUM(totalpaid) as totalpaid
      FROM 
        invoices
         WHERE 
          itype = 'Company'
      GROUP BY 
        itype
    `)
            .all();
        console.log('mainrow', mainRow);
        return Promise.resolve({ success: true, msg: '', data: [...mainRow] });
    }
    catch (er) {
        console.log('Error in Server action-getitem-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getAllIncomeCompany = getAllIncomeCompany;
//////////////////////////////////////////////////
const getAllDueAmount = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
      SELECT 
        itype, 
        COUNT(*) as count, 
        SUM(totalpaid) as totalpaid
      FROM 
        invoices
         
      GROUP BY 
        itype
    `)
            .all();
        return Promise.resolve({ success: true, msg: '', data: [...mainRow] });
    }
    catch (er) {
        console.log('Error in Server action-getitem-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getAllDueAmount = getAllDueAmount;
