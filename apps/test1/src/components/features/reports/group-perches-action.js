"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurches = exports.getAllProjectDueAmount = exports.getAllProjectAmount = exports.getAllUtilities = exports.getAllAssets = exports.getAllService = exports.getAllGoods = void 0;
const better_sqlite3_1 = require("better-sqlite3");
const getAllGoods = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
        SELECT 
          purchasetype, 
          COUNT(*) as count, 
          SUM(totalpaid) as totalpaid
        FROM 
          purchases
         WHERE 
          purchasetype = 'goods'
        GROUP BY 
          purchasetype
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
exports.getAllGoods = getAllGoods;
//////////////////////////////////////////////////////////
const getAllService = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
        SELECT 
          purchasetype, 
          COUNT(*) as count, 
          SUM(totalpaid) as totalpaid
        FROM 
          purchases
        WHERE 
          purchasetype = 'services'
        GROUP BY 
          purchasetype
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
exports.getAllService = getAllService;
//////////////////////////////////////////////////////////
const getAllAssets = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
        SELECT 
          purchasetype, 
          COUNT(*) as count, 
          SUM(totalpaid) as totalpaid
        FROM 
          purchases
        WHERE 
          purchasetype = 'assets'
        GROUP BY 
          purchasetype
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
exports.getAllAssets = getAllAssets;
//////////////////////////////////////////////////////////
const getAllUtilities = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
        SELECT 
          purchasetype, 
          COUNT(*) as count, 
          SUM(totalpaid) as totalpaid
        FROM 
          purchases
        WHERE 
          purchasetype = 'utilities'
        GROUP BY 
          purchasetype
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
exports.getAllUtilities = getAllUtilities;
//////////////////////////////////////////////////////////
const getAllProjectAmount = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
        SELECT 
        project, 
          COUNT(*) as count, 
          SUM(totalamount) as totalamount
        FROM 
           purchases
        GROUP BY 
          project
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
exports.getAllProjectAmount = getAllProjectAmount;
//////////////////////////////////////////////////////////
const getAllProjectDueAmount = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table with group by purchaser type
        const mainRow = db
            .prepare(`
        SELECT 
        project, 
          COUNT(*) as count, 
          SUM(totalpaid) as totalpaid
        FROM 
           purchases
        GROUP BY 
          project
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
exports.getAllProjectDueAmount = getAllProjectDueAmount;
//////////////////////////////////////////////
const getAllPurches = async () => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db.prepare(`SELECT * FROM purchases `).all(); //? is a placeholder
        return Promise.resolve({ success: true, msg: '', data: [...mainRow] }); //mainrow have all data of the id(sperad it)
    }
    catch (er) {
        console.log('Error in Server action-getitem-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getAllPurches = getAllPurches;
