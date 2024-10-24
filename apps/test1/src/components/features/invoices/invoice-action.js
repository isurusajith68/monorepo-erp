"use strict";
'use server';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInvoices = exports.updateInvoiceReceipt = exports.insertInvoiceReceipt = exports.getNextMaterialItem = exports.getPrevMaterialItem = exports.getLastMaterialItemId = exports.getFirstMaterialItemId = exports.getAllData = exports.DeleteInvoice = exports.updateInvoice = exports.getInvoice = exports.insertInvoice = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
//----------insert------------
const insertInvoice = async (data) => {
    // console.log("data",process.env.DB_NAME,data)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const insertSql = `INSERT INTO invoices (customername,invoicedate,project,duedate,invoiceno,itype,ctype,currency,subtotal,discount,totalAmount,remark,totalpaid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) `;
        const stmt = db.prepare(insertSql);
        const info = stmt.run(data.customername, data.invoicedate, data.project, data.duedate, data.invoiceno, data.itype, data.ctype, data.currency, data.subtotal, data.discount, data.totalAmount, data.remark, data.totalpaid);
        //console.log(info);                          //show all data of the data object
        console.log('data hello', data); //this is the object.show all data of the data object
        const lastInsertRowid = info.lastInsertRowid;
        //detail table
        const insertSqlDetail = `INSERT INTO invoicedetails (invoiceid,itemdetails,quentity,tax,amount,price ) VALUES (?,?,?,?,?,? ) `;
        const stmt2 = db.prepare(insertSqlDetail);
        //loop
        //add forign key value to rows
        data.invoicedetails = data.invoicedetails.map((r) => {
            return { ...r, invoiceid: lastInsertRowid };
        });
        for (const row of data.invoicedetails) {
            const info2 = stmt2.run(row.invoiceid, row.itemdetails, row.quentity, row.tax, row.amount, row.price);
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
exports.insertInvoice = insertInvoice;
//------------retrieve---------------
const getInvoice = async (id) => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db
            .prepare(`SELECT * FROM  invoices  WHERE invoiceid=?`)
            .get(id); //? is a placeholder
        //detail table
        const detailRows = db
            .prepare(`SELECT invoiceid,itemdetails,quentity,tax,amount,price FROM  invoicedetails  WHERE invoiceid=?`)
            .all(id);
        console.log('mainRow', mainRow);
        console.log('detailrow', detailRows);
        return Promise.resolve({
            success: true,
            msg: '',
            data: { ...mainRow, invoicedetails: detailRows },
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
exports.getInvoice = getInvoice;
//-------update-----------
const updateInvoice = async (data, dirtyValues, id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME); //make db connection and provide bettersqlite methods
    /*const invoicedetails = data.invoicedetails
    console.log("dirtyValues.invoicedetails",dirtyValues.invoicedetails)
    delete dirtyValues.invoicedetails                                          //no need this bcz already didnt send invoicedetails data
    console.log("dirtyValues.invoicedetails",dirtyValues.invoicedetails)   */
    console.log('dirtyValues change', dirtyValues); //show all changed values without itemdetails object
    const colDefs = Object.keys(dirtyValues).map((f) => `${f} = ?`); //take all updated fields name to a array
    console.log('coldef', colDefs);
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
    const sql = `UPDATE invoices SET ${colDefs.join(',')} WHERE invoiceid=?`;
    //console.log("sql",sql)                                                     //it just a db query string.shows this "UPDATE invoices SET ${colDefs.join(',')} WHERE invoiceid=?"
    //console.log("values",values)
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
        const sqlDel = `DELETE FROM invoicedetails WHERE invoiceid = ?`;
        const stmtDel = db.prepare(sqlDel); //complided query
        const infoDel = stmtDel.run(id); //this used to run prepared query.donst return anythind
        //console.log("infoDel",infoDel)
        //now insert new records
        const lastInsertRowid = id;
        const insertSqlDetail = `INSERT INTO invoicedetails (invoiceid,itemdetails,quentity,price,tax,amount ) 
                              VALUES (?,?,?,?,?,? )  `;
        const stmt2 = db.prepare(insertSqlDetail);
        console.log('data 0', data);
        console.log('data.invoicedetails1', data.invoicedetails);
        //loop
        //add forign key value to rows
        data.invoicedetails = data.invoicedetails.map((r) => {
            return { ...r, invoiceid: lastInsertRowid };
        }); //create new object using this {...r,invoiceid:lastInsertRowid}
        console.log('data.invoicedetails2', data.invoicedetails);
        for (const row of data.invoicedetails) {
            const info2 = stmt2.run(row.invoiceid, row.itemdetails, row.quentity, row.price, row.tax, row.amount);
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
exports.updateInvoice = updateInvoice;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DeleteInvoice = async (id) => {
    console.log('Deleting invoice with ID:', id);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    db.pragma('journal_mode = WAL');
    try {
        // Delete from invoicedetails table first
        const sqlDel1 = `DELETE FROM invoicedetails WHERE invoiceid = ?`;
        const stmtDel1 = db.prepare(sqlDel1);
        const infoDel1 = stmtDel1.run(id);
        console.log('Deleted from invoicedetails:', infoDel1);
        // Delete from invoicedetails table first
        const sqlDel3 = `DELETE FROM invoicereceipt WHERE invoiceid = ?`;
        const stmtDel3 = db.prepare(sqlDel3);
        const infoDel3 = stmtDel3.run(id);
        console.log('Deleted from invoicereceipt:', infoDel3);
        // Delete from invoices table
        const sqlDel2 = `DELETE FROM invoices WHERE invoiceid = ?`;
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
//  export const updateMaterialItem= async (id: number, dirtyValues: any,  detailRows:  z.infer<typeof detailRowSchema>[]) => {
//    const db = new Database(process.env.DB_NAME);
//    db.pragma('journal_mode = WAL');
//    try {
//     const updateColumnNames =  [  "code","descriptionshort","descriptionlong","baseunit","bcrumbcategory","bcrumbcategoryid" ]
//     const updateParams =  GetUpdateQueryBYColNames(updateColumnNames,id,dirtyValues,"materialitems")
//        if (updateParams.values.length > 0) {
//           const stmt = db.prepare(updateParams.sql);
//           const info = stmt.run(updateParams.values);
//        }
//     //delete and insert detail table rows
//     const sqlDel = `DELETE FROM materialitemunits WHERE materialitemid = ?`
//      const stmtDel = db.prepare( sqlDel);
//      const infoDel = stmtDel.run(id);
//      //now insert new records
//      const lastInsertRowid= id
//     const insertSqlDetail =   `INSERT INTO materialitemunits (id,materialitemid,otherunit,conversionfactor ) VALUES (?,?,?,? ) `
//      const stmt2 = db.prepare(insertSqlDetail);
//      detailRows = detailRows.map((r:any) => {return {...r,materialitemid:id}})
//      for(const row of detailRows){
//      const info2 = stmt2.run(row.id,row.materialitemid,row.otherunit,row.conversionfactor);
//      }
//      return Promise.resolve({success:true,msg:""  });
//    }
//    catch (er) {
//      console.log("Error in Server action-update-",er)
//       return Promise.resolve({success:false,msg:er  });
//    }finally {
//       db.close()
//    }
//  }
console.log('hello');
//  export const GetUpdateQueryBYColNames = (dbColNames:string[],id:number,dirtyValues:any,tableName:string) => {
//    const columnName: string[] = [];
//    const valuesMain: any[] = [];
//    for (const prop in dirtyValues) {
//        if (dbColNames.find(c => c == prop)) {
//          columnName.push( `${prop} = ? `);
//          valuesMain.push(dirtyValues[prop]);
//        }
//    }
//      if(columnName.length!=0){
//            let updateQueryMain = `UPDATE ${tableName} SET ${columnName.join(",")}  WHERE id = ? `;
//            valuesMain.push(id);
//            return { sql: updateQueryMain, values:valuesMain  }
//        }else{
//           console.log("no column to update query-" + tableName)
//           return  { sql: "", values:[]  }
//        }
// }
//--------------------delete---------------------------------
//  export const DeleteInvoice = async (id: number) => {
//   console.log(id)
//   const db = new Database(process.env.DB_NAME);
//   db.pragma('journal_mode = WAL');
//   try {
//                   //delete invoice table
//      const sqlDel1 = `DELETE FROM invoicedetails WHERE invoiceid = ?`            //first of all delete foreign key table row
//                                                                                  //bcz cannont delete primary key that in a table as forign key.
//      const stmtDel2 = db.prepare(sqlDel1);
//      const infoDel2 = stmtDel2.run(id);
//                   //delete invoicedetails table
//      const sqlDel = `DELETE FROM invoices WHERE invoiceid = ?`
//      const stmtDel = db.prepare(sqlDel);
//      const infoDel = stmtDel.run(id);
//      return Promise.resolve({ success: true, msg: "", data: {}});
//   }
//   catch (er) {
//       console.log("Error in Server action-delete-",er)
//      return Promise.resolve({ success: false, msg: er, data: {} });
//   } finally {
//      db.close()
//   }
// }
const getAllData = async () => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db
            .prepare(`SELECT projects.pname,invoices.* FROM projects  
    RIGHT JOIN invoices
    ON projects.pid = invoices.project`)
            .all(); //? is a placeholder
        console.log('mainRow pasindu', mainRow);
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
const getFirstMaterialItemId = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        let prevRow, prevIdSql;
        prevIdSql = `select min(id) as id from invoices `;
        prevRow = db.prepare(prevIdSql).get();
        if (prevRow?.id) {
            return Promise.resolve({ success: true, msg: '', data: prevRow.id });
        }
        else {
            return Promise.resolve({ success: true, msg: '', data: 0 });
        }
    }
    catch (er) {
        console.log('Error in Server action-getFirstMaterialItemId-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getFirstMaterialItemId = getFirstMaterialItemId;
const getLastMaterialItemId = async () => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        let prevRow, prevIdSql;
        prevIdSql = `select max(id) as id from invoices `;
        prevRow = db.prepare(prevIdSql).get();
        if (prevRow?.id) {
            return Promise.resolve({ success: true, msg: '', data: prevRow.id });
        }
        else {
            return Promise.resolve({ success: true, msg: '', data: 0 });
        }
    }
    catch (er) {
        console.log('Error in Server action-getFirstMaterialItemId-', er);
        return Promise.resolve({ success: false, msg: er, data: {} });
    }
    finally {
        db.close();
    }
};
exports.getLastMaterialItemId = getLastMaterialItemId;
// export const getPrevMaterialItem = async (id: number): Promise<any> => {
//   const db = new Database(process.env.DB_NAME);
//  try {
//    db.pragma('journal_mode = WAL');
//   let  prevRow,prevIdSql
//    if(id){
//      prevIdSql = `select max(id) as id from invoices   where invoiceid < ? `
//      prevRow = db.prepare(prevIdSql).get(id);
//    }else{
//      prevIdSql = `select max(id) as id from invoices `
//      prevRow = db.prepare(prevIdSql).get();
//    }
//    if(prevRow?.id){
//        console.log("previd",prevRow)
//        return Promise.resolve({ success: true, msg: "", data:   prevRow.id   });
//    }else{
//         return Promise.resolve({ success: true, msg: "", data:0   });
//    }
//     }
//    catch (er) {
//       console.log("Error in Server action-getPrevMaterialItem-",er)
//     return Promise.resolve({success:false,msg:er , data:{} });
//  }finally {
//     db.close()
//  }
// }
const getPrevMaterialItem = async (id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        let prevRow;
        if (id) {
            const prevIdSql = `SELECT * FROM invoices WHERE invoiceid < ? ORDER BY invoiceid DESC LIMIT 1`;
            prevRow = db.prepare(prevIdSql).get(id);
        }
        else {
            const prevIdSql2 = `SELECT * FROM invoices ORDER BY invoiceid DESC LIMIT 1`;
            prevRow = db.prepare(prevIdSql2).get();
        }
        if (prevRow?.invoiceid) {
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
// export const getNextMaterialItem = async (id: number): Promise<any> => {
//   const db = new Database(process.env.DB_NAME);
//  try {
//   let nextRow
//    db.pragma('journal_mode = WAL');
//     if(id){
//         const nextIdSql = `select min(invoiceid) as invoiceid from invoices   where invoiceid > ?  `
//           nextRow = db.prepare(nextIdSql).get(id);
//     }else{
//          const nextIdSql2 = `select min(invoiceid) as invoiceid from invoices   `
//           nextRow = db.prepare(nextIdSql2).get();
//     }
//    if(nextRow?.id){
//        console.log("nextid",nextRow)
//        return Promise.resolve({ success: true, msg: "", data: nextRow.invoiceid });
//    }else{
//         return Promise.resolve({ success: true, msg: "",data:0   });
//    }
//     }
//    catch (er) {
//       console.log("Error in Server action-getNextMaterialItem-",er)
//     return Promise.resolve({success:false,msg:er , data:{} });
//  }finally {
//     db.close()
//  }
// }
const getNextMaterialItem = async (id) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        let nextRow;
        db.pragma('journal_mode = WAL');
        if (id) {
            const nextIdSql = `SELECT * FROM invoices WHERE invoiceid > ? ORDER BY invoiceid ASC LIMIT 1`;
            nextRow = db.prepare(nextIdSql).get(id);
        }
        else {
            const nextIdSql2 = `SELECT * FROM invoices ORDER BY invoiceid ASC LIMIT 1`;
            nextRow = db.prepare(nextIdSql2).get();
        }
        if (nextRow?.invoiceid) {
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
// export const getNextMaterialItem = async (id: number): Promise<any> => {
//   const db = new Database(process.env.DB_NAME);
//   try {
//     let nextRow;
//     db.pragma('journal_mode = WAL');
//     if (id) {
//       const nextIdSql = `SELECT * FROM invoices WHERE invoiceid > ? ORDER BY invoiceid ASC LIMIT 1`;
//       nextRow = db.prepare(nextIdSql).get(id);
//     } else {
//       const nextIdSql2 = `SELECT * FROM invoices ORDER BY invoiceid ASC LIMIT 1`;
//       nextRow = db.prepare(nextIdSql2).get();
//     }
//     if (nextRow?.invoiceid) {
//       return Promise.resolve({ success: true, msg: "", data: nextRow });
//     } else {
//       return Promise.resolve({ success: true, msg: "", data: {} });
//     }
//   } catch (er) {
//     console.log("Error in Server action-getNextMaterialItem-", er);
//     return Promise.resolve({ success: false, msg: er, data: {} });
//   } finally {
//     db.close();
//   }
// };
const insertInvoiceReceipt = async (data) => {
    console.log('data', process.env.DB_NAME, data);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const totalPaidAmount = db
            .prepare(`SELECT sum(amount) as sum FROM  invoicereceipt  WHERE invoiceid=?`)
            .get(data.invoiceid); //? is a placeholder
        console.log('totalPaidAmount last allamu', totalPaidAmount);
        console.log('first', data.amount);
        const total = totalPaidAmount.sum + data.amount;
        console.log('total', total);
        const insertSql1 = `UPDATE invoices SET totalpaid=? WHERE invoiceid=?`;
        const stmt1 = db.prepare(insertSql1);
        const info1 = stmt1.run(total, data.invoiceid);
        const lastInsertRowid1 = info1.lastInsertRowid;
        const insertSql = `INSERT INTO invoicereceipt (invoiceid,paymeth,amount,pdate,paccount) VALUES (?,?,?,?,?) `;
        const stmt = db.prepare(insertSql);
        const info = stmt.run(data.invoiceid, data.paymeth, data.amount, data.pdate, data.paccount);
        console.log(info);
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
exports.insertInvoiceReceipt = insertInvoiceReceipt;
const updateInvoiceReceipt = async (dirtyfields, id) => {
    console.log('data', dirtyfields, id);
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    const colDefs = Object.keys(dirtyfields).map((f) => `${f} = ?`);
    const values = Object.keys(dirtyfields).map((f) => dirtyfields[f]);
    // for (const key in dirtyfields) {
    //    colDefs.push(`${key} = ?`)
    // }
    const sql = `UPDATE invoicereceipt SET ${colDefs.join(',')} WHERE id=?`;
    console.log('sql', sql);
    console.log('values', values);
    const stmt = db.prepare(sql);
    const info = stmt.run(...values, id);
};
exports.updateInvoiceReceipt = updateInvoiceReceipt;
//////////////////////////////////////////////
const getAllInvoices = async () => {
    //this promise rerturn the id data(user details)
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        db.pragma('journal_mode = WAL');
        //main table
        const mainRow = db.prepare(`SELECT * FROM  invoices`).all(); //? is a placeholder
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
exports.getAllInvoices = getAllInvoices;
