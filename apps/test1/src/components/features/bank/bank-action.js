"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextMaterialItem = exports.getPrevMaterialItem = exports.SelectAllBank = exports.DeleteBank = exports.updateBank = exports.getBank = exports.InsertBank = void 0;
const better_sqlite3_1 = require("better-sqlite3");
//----------insert------------
const InsertBank = async (data) => {
    console.log('data', process.env.DB_NAME, data);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // main table
        const insertSql = `INSERT INTO bank (oname, bname, acctype, accbranch, accnumber, camount) VALUES (?, ?, ?, ?, ?, ?)`;
        const stmt = db.prepare(insertSql);
        const info = stmt.run(data.oname, data.bname, data.acctype, data.accbranch, data.accnumber, data.camount);
        console.log(info); // return changes and lastInsertRowid
        const lastInsertRowid = info.lastInsertRowid;
        if (info.changes === 1) {
            return Promise.resolve({ success: true, msg: '', lastInsertRowid });
        }
        else {
            return Promise.reject({
                success: false,
                msg: 'Insert failed',
                lastInsertRowid: '0',
            });
        }
    }
    catch (er) {
        console.log('Error in Server action-insert-', er);
        return Promise.reject({ success: false, msg: er, lastInsertRowid: '0' });
    }
    finally {
        db.close();
    }
};
exports.InsertBank = InsertBank;
//------------retrieve---------------
const getBank = async (id) => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db.prepare(`SELECT * FROM  bank  WHERE id=?`).get(id); //? is a placeholder
        return Promise.resolve({ success: true, msg: '', data: { ...mainRow } }); //mainrow have all data of the id(sperad it)
    }
    catch (er) {
        console.log('Error in Server action-getitem-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getBank = getBank;
//-------update-----------
const updateBank = async (dirtyfields, id) => {
    console.log('data', dirtyfields, id);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    const colDefs = Object.keys(dirtyfields).map((f) => `${f} = ?`);
    const values = Object.keys(dirtyfields).map((f) => dirtyfields[f]);
    // for (const key in dirtyfields) {
    //    colDefs.push(`${key} = ?`)
    // }
    const sql = `UPDATE bank SET ${colDefs.join(',')} WHERE id=?`;
    const stmt = db.prepare(sql);
    const info = stmt.run(...values, id);
};
exports.updateBank = updateBank;
//-----------delete-----------
const DeleteBank = async (id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    db.pragma('journal_mode = WAL');
    try {
        const sqlDel = `DELETE FROM bank WHERE id = ?`;
        const stmtDel = db.prepare(sqlDel);
        const infoDel = stmtDel.run(id);
        return Promise.resolve({ success: true, msg: '', data: {} });
    }
    catch (er) {
        console.log('Error in Server action-delete-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.DeleteBank = DeleteBank;
const SelectAllBank = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    db.pragma('journal_mode = WAL');
    try {
        const sqlSelect = `SELECT * FROM bank`;
        const stmtSelect = db.prepare(sqlSelect);
        const rows = stmtSelect.all();
        //console.log("row bank",rows)
        return Promise.resolve({ success: true, msg: '', data: rows });
    }
    catch (er) {
        console.log('Error in Server action-select-', er);
        return Promise.resolve({ success: false, msg: er, data: [] });
    }
    finally {
        db.close();
    }
};
exports.SelectAllBank = SelectAllBank;
/////////////////////////////////////////////////////////////////
const getPrevMaterialItem = async (id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        let prevRow;
        if (id) {
            const prevIdSql = `SELECT * FROM bank WHERE id < ? ORDER BY id DESC LIMIT 1`;
            prevRow = db.prepare(prevIdSql).get(id);
        }
        else {
            const prevIdSql2 = `SELECT * FROM bank ORDER BY id DESC LIMIT 1`;
            prevRow = db.prepare(prevIdSql2).get();
        }
        if (prevRow?.id) {
            return Promise.resolve({ success: true, msg: '', data: prevRow });
        }
        else {
            return Promise.resolve({ success: true, msg: '', data: {} });
        }
    }
    catch (er) {
        console.log('Error in Server action-getPrevMaterialItem-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getPrevMaterialItem = getPrevMaterialItem;
const getNextMaterialItem = async (id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        let nextRow;
        db.pragma('journal_mode = WAL');
        if (id) {
            const nextIdSql = `SELECT * FROM bank WHERE id > ? ORDER BY id ASC LIMIT 1`;
            nextRow = db.prepare(nextIdSql).get(id);
        }
        else {
            const nextIdSql2 = `SELECT * FROM bank ORDER BY id ASC LIMIT 1`;
            nextRow = db.prepare(nextIdSql2).get();
        }
        if (nextRow?.id) {
            return Promise.resolve({ success: true, msg: '', data: nextRow });
        }
        else {
            return Promise.resolve({
                success: true,
                msg: 'This is the last ID',
                data: {},
            });
        }
    }
    catch (er) {
        console.log('Error in Server action-getNextMaterialItem-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getNextMaterialItem = getNextMaterialItem;
