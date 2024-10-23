"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextMaterialItem = exports.getPrevMaterialItem = exports.DeleteVendor = exports.insertPurchasePayment = exports.getAllData = exports.getAllProjects = exports.DeleteInvoice = exports.updateVendor = exports.getVendor = exports.insertPurchase = void 0;
const better_sqlite3_1 = require("better-sqlite3");
//----------insert------------
const insertPurchase = async (data) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        console.log('dataaaaaaaaaaa', data);
        const insertSql = `INSERT INTO vendors(vendorname,vendortype,vendoraddress,email,phonenumber,vendorservicetype) VALUES (?,?,?,?,?,?) `;
        const stmt = db.prepare(insertSql);
        const info = stmt.run(data.vendorname, data.vendortype, data.vendoraddress, data.email, data.phonenumber, data.vendorservicetype);
        const lastInsertRowid = info.lastInsertRowid;
        if (info.changes == 1) {
            return Promise.resolve({
                success: true,
                msg: '',
                lastInsertRowid: info.lastInsertRowid,
            });
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
        return Promise.resolve({ success: false, msg: er, lastInsertRowid: '0' });
    }
    finally {
        db.close();
    }
};
exports.insertPurchase = insertPurchase;
//------------retrieve---------------
const getVendor = async (id) => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db
            .prepare(`SELECT * FROM  vendors  WHERE vendorid=?`)
            .get(id); //? is a placeholder
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
exports.getVendor = getVendor;
//-------update-----------
const updateVendor = async (dirtyfields, id) => {
    console.log('data', dirtyfields, id);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    const colDefs = Object.keys(dirtyfields).map((f) => `${f} = ?`);
    const values = Object.keys(dirtyfields).map((f) => dirtyfields[f]);
    // for (const key in dirtyfields) {
    //    colDefs.push(`${key} = ?`)
    // }
    const sql = `UPDATE vendors SET ${colDefs.join(',')} WHERE vendorid=?`;
    console.log('sql', sql);
    console.log('values', values);
    const stmt = db.prepare(sql);
    const info = stmt.run(...values, id);
};
exports.updateVendor = updateVendor;
////////////////////////////DeleteInvoice////////////////////////////
const DeleteInvoice = async (id) => {
    console.log('Deleting invoice with ID:', id);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    db.pragma('journal_mode = WAL');
    try {
        const sqlDel2 = `DELETE FROM vendors WHERE vendorid = ?`;
        const stmtDel2 = db.prepare(sqlDel2);
        const infoDel2 = stmtDel2.run(id);
        console.log('Deleted from invoices:', infoDel2);
        return { success: true, msg: 'Invoice deleted successfully', data: {} };
    }
    catch (error) {
        console.error('Error deleting invoice:', error);
        return { success: false, msg: error.message, data: {} };
    }
    finally {
        db.close();
    }
};
exports.DeleteInvoice = DeleteInvoice;
////////////////////getAllProjects/////////////////////////////
const getAllProjects = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        const projects = db.prepare(`SELECT pid, pname FROM projects`).all();
        return Promise.resolve({ success: true, msg: '', data: projects });
    }
    catch (error) {
        console.log('Error in Server action-getAllProjects-', error);
        return Promise.resolve({ success: false, msg: error, data: [] });
    }
    finally {
        db.close();
    }
};
exports.getAllProjects = getAllProjects;
////////////////////////////get all purchase details////////////////////////////
const getAllData = async () => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db.prepare(`SELECT * FROM  vendors`).all(); //? is a placeholder
        console.log('mainRow', mainRow);
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
exports.getAllData = getAllData;
/////////////////////////////////////////////purchase payment//////////////////////////////////////////////////////
//----------insert------------
const insertPurchasePayment = async (data) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        console.log('dataaaaaaaaaaa', data);
        const insertSql = `INSERT INTO purchasepayments(purchaseid,purchasemethod,purchaseaccount,amount,purchasedate) VALUES (?,?,?,?,?) `;
        const stmt = db.prepare(insertSql);
        const info = stmt.run(data.purchaseid, data.purchasemethod, data.purchaseaccount, data.amount, data.purchasedate);
        const lastInsertRowid = info.lastInsertRowid;
        if (info.changes == 1) {
            return Promise.resolve({
                success: true,
                msg: '',
                lastInsertRowid: info.lastInsertRowid,
            });
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
        return Promise.resolve({ success: false, msg: er, lastInsertRowid: '0' });
    }
    finally {
        db.close();
    }
};
exports.insertPurchasePayment = insertPurchasePayment;
const DeleteVendor = async (id) => {
    console.log('Deleting customers with ID:', id);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    db.pragma('journal_mode = WAL');
    try {
        // Delete from invoicedetails table first
        const sqlDel1 = `DELETE FROM vendors WHERE vendorid = ?`;
        const stmtDel1 = db.prepare(sqlDel1);
        const infoDel1 = stmtDel1.run(id);
        console.log('Deleted from customer:', infoDel1);
        return { success: true, msg: 'customer deleted successfully', data: {} };
    }
    catch (error) {
        console.error('Error deleting customer:', error);
        return { success: false, msg: error.message, data: {} };
    }
    finally {
        db.close();
    }
};
exports.DeleteVendor = DeleteVendor;
///////////////////////////////////////////////////previous and next////////////////////////////////////////////////////
const getPrevMaterialItem = async (id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        let prevRow;
        if (id) {
            const prevIdSql = `SELECT * FROM vendors WHERE vendorid < ? ORDER BY vendorid DESC LIMIT 1`;
            prevRow = db.prepare(prevIdSql).get(id);
            console.log('prevRow1111', prevRow);
        }
        else {
            const prevIdSql2 = `SELECT * FROM vendors ORDER BY vendorid DESC LIMIT 1`;
            prevRow = db.prepare(prevIdSql2).get();
        }
        if (prevRow?.vendorid) {
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
            const nextIdSql = `SELECT * FROM vendors WHERE vendorid > ? ORDER BY vendorid ASC LIMIT 1`;
            nextRow = db.prepare(nextIdSql).get(id);
        }
        else {
            const nextIdSql2 = `SELECT * FROM vendors ORDER BY vendorid ASC LIMIT 1`;
            nextRow = db.prepare(nextIdSql2).get();
        }
        if (nextRow?.vendorid) {
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
