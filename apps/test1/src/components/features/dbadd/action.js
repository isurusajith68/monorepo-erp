"use strict";
'use server';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertcustomer = exports.oneFile = exports.getFiles1 = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs = require('fs');
// Recursive function to get files
const getFiles1 = async (dir, files = []) => {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    console.log('this is files', files);
    const fileList = fs.readdirSync(dir);
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        // console.log(typeof name)
        // Check if the current file/directory is a directory using fs.statSync
        if (fs.statSync(name).isDirectory()) {
            // If it is a directory, recursively call the getFiles function with the directory path and the files array
            (0, exports.getFiles1)(name, files);
        }
        else {
            // If it is a file, push the full path to the files array
            files.push(name);
        }
        console.log('this is files', files);
    }
    return files;
};
exports.getFiles1 = getFiles1;
const oneFile = async (allFiles) => {
    for (const one of allFiles) {
        fs.readFile(one, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
            const db = new better_sqlite3_1.default(process.env.DB_NAME);
            db.pragma('journal_mode = WAL');
            //delete
            const sqlDel = `DELETE FROM customers`;
            const stmtDel = db.prepare(sqlDel);
            const infoDel = stmtDel.run();
            //insert
            const stmt = db.prepare(data);
            const info = stmt.run();
            console.log('fulfildeeee');
        });
    }
    // fs.readFile('C:/Users/User/Desktop/New folder/customers_202408012144.sql', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log( data);
    //   const db = new Database(process.env.DB_NAME);
    //   db.pragma('journal_mode = WAL');
    //           //delete
    //  const sqlDel = `DELETE FROM customers`
    //    const stmtDel = db.prepare(sqlDel);
    //    const infoDel = stmtDel.run();
    //           //insert
    //   const stmt = db.prepare(data);
    //   const info = stmt.run();
    // });
};
exports.oneFile = oneFile;
const insertcustomer = async (data) => {
    console.log('data', process.env.DB_NAME, data);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const insertSql = `INSERT INTO projects (pname,ptype,costbudget,revenuebudget,description) VALUES (?,?,?,?,?) `;
        const stmt = db.prepare(insertSql);
        const info = stmt.run(data.pname, data.ptype, data.costbudget, data.revenuebudget, data.description);
        console.log(info); //return changes and lastInsertRowid
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
exports.insertcustomer = insertcustomer;
