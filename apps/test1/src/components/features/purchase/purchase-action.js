"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextMaterialItem = exports.getPrevMaterialItem = exports.insertPurchasePayment = exports.getAllData = exports.DeletePurchase = exports.updatePurchase = exports.getPurchase = exports.insertPurchase = void 0;
const better_sqlite3_1 = require("better-sqlite3");
//----------insert------------
const insertPurchase = async (data) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //console.log("dataaaaaaaaaaa",data)
        //main table
        // const purchasedate = formatDate(data.purchasedate, "yyyy-MM-dd");
        // const duedate = formatDate(data.duedate, "yyyy-MM-dd");
        // const sellername=()=>{
        //   if(data.sellername=='other'){
        //     return data.newsellername;
        //   }else{
        //     return data.sellername
        //   }
        // }
        const insertSql = `INSERT INTO purchases(sellername,sellertype,purchasetype,purchasedate,duedate,currency,project,purchaseno,remark,subtotal,discount,totalamount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) `;
        const stmt = db.prepare(insertSql);
        // const info = stmt.run(sellername(),data.sellertype,data.purchasetype,data.purchasedate,data.duedate,data.currency,data.project,data.purchaseno);
        const info = stmt.run(data.sellername, data.sellertype, data.purchasetype, data.purchasedate, data.duedate, data.currency, data.project, data.purchaseno, data.remark, data.subtotal, data.discount, data.totalamount);
        const lastInsertRowid = info.lastInsertRowid;
        //detail table
        const insertSqlDetail = `INSERT INTO purchasedetails (purchaseid,item,quantity,price,utilities,description,tax,amount) VALUES (?,?,?,?,?,?,?,?) `;
        const stmt2 = db.prepare(insertSqlDetail);
        //loop
        //add forign key value to rows
        data.purchasedetails = data.purchasedetails.map((r) => {
            return { ...r, purchaseid: lastInsertRowid };
        });
        // console.log( "data.purchasedetails" , data.purchasedetails)
        for (const row of data.purchasedetails) {
            const info2 = stmt2.run(row.purchaseid, row.item, row.quantity, row.price, row.utilities, row.description, row.tax, row.amount);
        }
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
const getPurchase = async (id) => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db
            .prepare(`SELECT * FROM  purchases  WHERE purchaseid=?`)
            .get(id); //? is a placeholder
        //detail table
        const detailRows = db
            .prepare(`SELECT purchaseid,item,quantity,price,utilities,description,tax,amount FROM  purchasedetails  WHERE purchaseid=?`)
            .all(id);
        //console.log("mainRow",mainRow)
        //console.log("detailrow",detailRows)
        return Promise.resolve({
            success: true,
            msg: '',
            data: { ...mainRow, purchasedetails: detailRows },
        }); //mainrow have all data of the id(sperad it)
    }
    catch (er) {
        console.log('Error in Server action-getitem-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getPurchase = getPurchase;
//-------update-----------
const updatePurchase = async (data, dirtyValues, id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME); //make db connection and provide bettersqlite methods
    /*const invoicedetails = data.invoicedetails
    console.log("dirtyValues.invoicedetails",dirtyValues.invoicedetails)
    delete dirtyValues.invoicedetails                                          //no need this bcz already didnt send invoicedetails data
    console.log("dirtyValues.invoicedetails",dirtyValues.invoicedetails)   */
    console.log('dirtyValues', dirtyValues); //show all changed values without itemdetails object
    console.log('dataa', data);
    const colDefs = Object.keys(dirtyValues).map((f) => `${f} = ?`); //take all updated fields name to a array
    //console.log("coldef",colDefs)
    //way of making coldefs
    // 1.Object.keys(dirtyValues)=>take keys of dirtyValues(the objct that have info about updated data).
    //                             it is a array
    // 2.map((f:string) => `${f} = ?`=>1.f is a parameter of the function (callback)
    //                                 2.it has the current value of that returend array.(like loop FaProcedures.one by one execute)
    //                                 3.make tempalte string by using that Element.to make db queryObjects(`${f} = ?`)
    //                                 4.`${f} = ?` this array is the output coldef
    const values = Object.keys(dirtyValues).map((f) => dirtyValues[f]);
    //way of making values
    //   1.same as above coldef steps
    //   2.dirtyValues[f] is used to acees dirtyValues object's values(not keys)
    //   3.this map method return only values  of the object without keys
    // for (const key in dirtyfields) {
    //    colDefs.push(`${key} = ?`)
    // }
    const sql = `UPDATE purchases SET ${colDefs.join(',')} WHERE purchaseid=?`;
    //console.log("sql",sql)                                                     //it just a db query string.shows this "UPDATE invoices SET ${colDefs.join(',')} WHERE invoiceid=?"
    console.log('values', values);
    //console.log("values spread",...values)                                   //values object sprad like destructuring.but no any varibles.just realy sprading
    if (Object.keys(values).length != 0) {
        //only db query execute if  object has properties
        //console.log("helooooooooooooo")
        const stmt = db.prepare(sql);
        stmt.run(...values, id); //this values is a array.doing this (...) it send all elements as separate items not like arra.like
        //like destructuring.It only used for send arguments
    }
    //const info = stmt.run(...values,id);
    ////////////////////////////////////////////////////
    //to upadte below table(invoice details)//
    try {
        //delete and insert detail table rows
        const sqlDel = `DELETE FROM purchasedetails WHERE purchaseid = ?`;
        const stmtDel = db.prepare(sqlDel); //complided query
        const infoDel = stmtDel.run(id); //this used to run prepared query.donst return anythind
        //console.log("infoDel",infoDel)
        //now insert new records
        const lastInsertRowid = id;
        const insertSqlDetail = `INSERT INTO purchasedetails (purchaseid,item,quantity,price,utilities,description,tax,amount) VALUES (?,?,?,?,?,?,?,?) `;
        const stmt2 = db.prepare(insertSqlDetail);
        //loop
        //add forign key value to rows
        data.purchasedetails = data.purchasedetails.map((r) => {
            return { ...r, purchaseid: lastInsertRowid };
        });
        //console.log( "data.purchasedetails" , data.purchasedetails)
        for (const row of data.purchasedetails) {
            const info2 = stmt2.run(row.purchaseid, row.item, row.quantity, row.price, row.utilities, row.description, row.tax, row.amount);
        }
        return Promise.resolve({ success: true, msg: '' });
    }
    catch (er) {
        console.log('Error in Server action-update-', er);
        return Promise.resolve({ success: false, msg: er });
    }
    finally {
        db.close();
    }
};
exports.updatePurchase = updatePurchase;
////////////////////////////DeleteInvoice////////////////////////////
const DeletePurchase = async (id) => {
    console.log('Deleting invoice with ID:', id);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    db.pragma('journal_mode = WAL');
    try {
        // Delete from invoicedetails table first
        const sqlDel1 = `DELETE FROM purchasedetails WHERE purchaseid = ?`;
        const stmtDel1 = db.prepare(sqlDel1);
        const infoDel1 = stmtDel1.run(id);
        console.log('Deleted from purchase:', infoDel1);
        // Delete from purchasepayment table
        const sqlDel3 = `DELETE FROM purchasepayments WHERE purchaseid = ?`;
        const stmtDel3 = db.prepare(sqlDel3);
        const infoDel3 = stmtDel3.run(id);
        console.log('Deleted from invoices:', infoDel3);
        // Delete from invoices table
        const sqlDel2 = `DELETE FROM purchases WHERE purchaseid = ?`;
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
exports.DeletePurchase = DeletePurchase;
////////////////////////////get all purchase details////////////////////////////
const getAllData = async () => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db
            .prepare(`SELECT projects.pname,purchases.* FROM projects  
    RIGHT JOIN purchases
    ON projects.pid = purchases.project`)
            .all(); //? is a placeholder
        //console.log("mainRow inner",mainRow)
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
    console.log('insertPurchasePayment', data);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        // console.log("PurchasePayment dtaa",data)
        const totalPaidAmount = db
            .prepare(`SELECT sum(amount) as sum FROM  purchasepayments  WHERE purchaseid=?`)
            .get(data.purchaseid); //? is a placeholder
        console.log('totalPaidAmount last', totalPaidAmount);
        const total = totalPaidAmount.sum + data.amount;
        const insertSql1 = `UPDATE purchases SET totalpaid=? WHERE purchaseid=?`;
        const stmt1 = db.prepare(insertSql1);
        const info1 = stmt1.run(total, data.purchaseid);
        const lastInsertRowid1 = info1.lastInsertRowid;
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
///////////////////////////////////////////////////previous and next////////////////////////////////////////////////////
const getPrevMaterialItem = async (id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        let prevRow;
        if (id) {
            const prevIdSql = `SELECT * FROM purchases WHERE purchaseid < ? ORDER BY purchaseid DESC LIMIT 1`;
            prevRow = db.prepare(prevIdSql).get(id);
            console.log('prevRow1111', prevRow);
        }
        else {
            const prevIdSql2 = `SELECT * FROM purchases ORDER BY purchaseid DESC LIMIT 1`;
            prevRow = db.prepare(prevIdSql2).get();
        }
        if (prevRow?.purchaseid) {
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
            const nextIdSql = `SELECT * FROM purchases WHERE purchaseid > ? ORDER BY purchaseid ASC LIMIT 1`;
            nextRow = db.prepare(nextIdSql).get(id);
        }
        else {
            const nextIdSql2 = `SELECT * FROM purchases ORDER BY purchaseid ASC LIMIT 1`;
            nextRow = db.prepare(nextIdSql2).get();
        }
        if (nextRow?.purchaseid) {
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
