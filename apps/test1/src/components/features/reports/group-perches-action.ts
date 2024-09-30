'use server'

import Database from 'better-sqlite3'

export const getAllGoods = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
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
      `,
      )
      .all()

    return Promise.resolve({ success: true, msg: '', data: [...mainRow] })
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//////////////////////////////////////////////////////////

export const getAllService = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
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
      `,
      )
      .all()

    return Promise.resolve({ success: true, msg: '', data: [...mainRow] })
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//////////////////////////////////////////////////////////

export const getAllAssets = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
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
      `,
      )
      .all()

    return Promise.resolve({ success: true, msg: '', data: [...mainRow] })
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//////////////////////////////////////////////////////////

export const getAllUtilities = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
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
      `,
      )
      .all()

    return Promise.resolve({ success: true, msg: '', data: [...mainRow] })
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//////////////////////////////////////////////////////////

export const getAllProjectAmount = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
        SELECT 
        project, 
          COUNT(*) as count, 
          SUM(totalamount) as totalamount
        FROM 
           purchases
        GROUP BY 
          project
      `,
      )
      .all()

    return Promise.resolve({ success: true, msg: '', data: [...mainRow] })
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//////////////////////////////////////////////////////////

export const getAllProjectDueAmount = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
        SELECT 
        project, 
          COUNT(*) as count, 
          SUM(totalpaid) as totalpaid
        FROM 
           purchases
        GROUP BY 
          project
      `,
      )
      .all()

    return Promise.resolve({ success: true, msg: '', data: [...mainRow] })
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//////////////////////////////////////////////

export const getAllPurches = async (): Promise<any> => {
  //this promise rerturn the id data(user details)
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    //main table
    const mainRow = db.prepare(`SELECT * FROM purchases `).all() //? is a placeholder

    return Promise.resolve({ success: true, msg: '', data: [...mainRow] }) //mainrow have all data of the id(sperad it)
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}
