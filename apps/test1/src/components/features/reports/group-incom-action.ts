'use server'

import Database from 'better-sqlite3'

export const getAllIncome = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
      SELECT 
        itype, 
        COUNT(*) as count, 
        SUM(totalAmount) as totalAmount
      FROM 
        invoices
      GROUP BY 
        itype
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

//////////////////////////////////////////////////

export const getAllIncomePerson = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
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

//////////////////////////////////////////////////

export const getAllIncomeCompany = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
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
    `,
      )
      .all()

    console.log('mainrow', mainRow)
    return Promise.resolve({ success: true, msg: '', data: [...mainRow] })
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//////////////////////////////////////////////////

export const getAllDueAmount = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table with group by purchaser type
    const mainRow = db
      .prepare(
        `
      SELECT 
        itype, 
        COUNT(*) as count, 
        SUM(totalpaid) as totalpaid
      FROM 
        invoices
         
      GROUP BY 
        itype
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
