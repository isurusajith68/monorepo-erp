"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCus = exports.getNextMaterialItem = exports.getPrevMaterialItem = exports.getAllCustomers = exports.getAllData = exports.DeleteCustomer = exports.updateCustomer = exports.getCustomer = exports.insertcustomer = void 0;
const better_sqlite3_1 = require("better-sqlite3");
//----------insert------------
const insertcustomer = async (data) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const insertSql = `INSERT INTO customers (cname,phone,nic,rdate,ctype,email,location) VALUES (?,?,?,?,?,?,?) `;
        const stmt = db.prepare(insertSql);
        const info = stmt.run(data.cname, data.phone, data.nic, data.rdate, data.ctype, data.email, data.location);
        const lastInsertRowid = info.lastInsertRowid;
        //detail table
        //    const insertSqlDetail =   `INSERT INTO materialitemunits (id,materialitemid,otherunit,conversionfactor ) VALUES (?,?,?,? ) `
        //     const stmt2 = db.prepare(insertSqlDetail);
        //loop
        //add forign key value to rows
        // data.materialitemunits = data.materialitemunits.map((r:any) => {return {...r,materialitemid:lastInsertRowid}})
        // for(const row of data.materialitemunits){
        // const info2 = stmt2.run(row.id,row.materialitemid,row.otherunit,row.conversionfactor);
        // }
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
        return Promise.resolve({ success: false, msg: er, lastInsertRowid: '0' });
    }
    finally {
        db.close();
    }
};
exports.insertcustomer = insertcustomer;
//------------retrieve---------------
const getCustomer = async (id) => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db.prepare(`SELECT * FROM  customers  WHERE id=?`).get(id); //? is a placeholder
        return Promise.resolve({ success: true, msg: '', data: { ...mainRow } }); //mainrow have all data of the id(sperad it)
    }
    catch (er) {
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getCustomer = getCustomer;
//-------update-----------
const updateCustomer = async (dirtyfields, id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    // Prepare column definitions and values from dirtyfields
    const colDefs = Object.keys(dirtyfields).map((f) => `${f} = ?`);
    const values = Object.keys(dirtyfields).map((f) => dirtyfields[f]);
    // Check if there are any fields to update
    if (colDefs.length === 0) {
        // No changes to be made, exit early
        return; // You might want to return some feedback or result here
    }
    // Construct the SQL query
    const sql = `UPDATE customers SET ${colDefs.join(', ')} WHERE id=?`;
    try {
        const stmt = db.prepare(sql);
        const info = stmt.run(...values, id); // Add id as the last parameter
        return info; // Return result or handle it as needed
    }
    catch (err) {
        console.error('Error executing update query:', err.message);
        throw err; // Optionally, rethrow the error to handle it further up the call stack
    }
};
exports.updateCustomer = updateCustomer;
//-----------delete-----------
const DeleteCustomer = async (id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    db.pragma('journal_mode = WAL');
    try {
        const sqlDel = `DELETE FROM customers WHERE id = ?`;
        const stmtDel = db.prepare(sqlDel);
        const infoDel = stmtDel.run(id);
        return Promise.resolve({ success: true, msg: '', data: {} });
    }
    catch (er) {
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.DeleteCustomer = DeleteCustomer;
//------------get all customers---------------
const getAllData = async () => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db.prepare(`SELECT * FROM  customers`).all(); //? is a placeholder
        return Promise.resolve({ success: true, msg: '', data: [...mainRow] }); //mainrow have all data of the id(sperad it)
    }
    catch (er) {
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getAllData = getAllData;
const getAllCustomers = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        const customers = db.prepare(`SELECT id, cname FROM customers`).all();
        return Promise.resolve({ success: true, msg: '', data: customers });
    }
    catch (error) {
        console.log('Error in Server action-getAllCustomers-', error);
        return Promise.resolve({ success: false, msg: error, data: [] });
    }
    finally {
        db.close();
    }
};
exports.getAllCustomers = getAllCustomers;
const getPrevMaterialItem = async (id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        let prevRow;
        if (id) {
            const prevIdSql = `SELECT * FROM customers WHERE id < ? ORDER BY id DESC LIMIT 1`;
            prevRow = db.prepare(prevIdSql).get(id);
        }
        else {
            const prevIdSql2 = `SELECT * FROM customers ORDER BY id DESC LIMIT 1`;
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
            const nextIdSql = `SELECT * FROM customers WHERE id > ? ORDER BY id ASC LIMIT 1`;
            nextRow = db.prepare(nextIdSql).get(id);
        }
        else {
            const nextIdSql2 = `SELECT * FROM customers ORDER BY id ASC LIMIT 1`;
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
const DeleteCus = async (id) => {
    console.log('Deleting customers with ID:', id);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    db.pragma('journal_mode = WAL');
    try {
        // Delete from invoicedetails table first
        const sqlDel1 = `DELETE FROM customers WHERE id = ?`;
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
exports.DeleteCus = DeleteCus;
