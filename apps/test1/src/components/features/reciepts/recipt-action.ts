'use server'

import Database from 'better-sqlite3'

import React from 'react'
import { SiTruenas } from 'react-icons/si'

//----------insert------------

export const InsertRecipt = async (data: any) => {
  console.log('data', process.env.DB_NAME, data)
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table
    const insertSql = `INSERT INTO recipts (rno, name, pnumber, email, pmethod, amount, baccount, project) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    const stmt = db.prepare(insertSql)
    const info = stmt.run(
      data.rno,
      data.name,
      data.pnumber,
      data.email,
      data.pmethod,
      data.amount,
      data.baccount,
      data.project,
    )

    console.log(info) // return changes and lastInsertRowid

    const lastInsertRowid = info.lastInsertRowid

    if (info.changes === 1) {
      return Promise.resolve({ success: true, msg: '', lastInsertRowid })
    } else {
      return Promise.reject({
        success: false,
        msg: 'Insert failed',
        lastInsertRowid: '0',
      })
    }
  } catch (er) {
    console.log('Error in Server action-insert-', er)
    return Promise.reject({ success: false, msg: er, lastInsertRowid: '0' })
  } finally {
    db.close()
  }
}
//------------retrieve---------------

export const getRecipts = async (id: Number): Promise<any> => {
  //this promise rerturn the id data(user details)
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    //main table
    const mainRow = db.prepare(`SELECT * FROM  recipts  WHERE id=?`).get(id) //? is a placeholder

    console.log('mainRow', mainRow)
    return Promise.resolve({ success: true, msg: '', data: { ...mainRow } }) //mainrow have all data of the id(sperad it)
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//-------update-----------

export const updateRecipts = async (dirtyfields: any, id: string) => {
  console.log('data', dirtyfields, id)
  const db = new Database(process.env.DB_NAME)
  const colDefs: string[] = Object.keys(dirtyfields).map(
    (f: string) => `${f} = ?`,
  )
  const values = Object.keys(dirtyfields).map((f: string) => dirtyfields[f])

  // for (const key in dirtyfields) {
  //    colDefs.push(`${key} = ?`)
  // }

  const sql = `UPDATE recipts SET ${colDefs.join(',')} WHERE id=?`
  console.log('sql', sql)
  console.log('values', values)
  const stmt = db.prepare(sql)
  const info = stmt.run(...values, id)
}

//-----------delete-----------

export const DeleteRecipts = async (id: number) => {
  const db = new Database(process.env.DB_NAME)
  db.pragma('journal_mode = WAL')
  try {
    const sqlDel = `DELETE FROM recipts WHERE id = ?`

    const stmtDel = db.prepare(sqlDel)
    const infoDel = stmtDel.run(id)

    return Promise.resolve({ success: true, msg: '', data: {} })
  } catch (er) {
    console.log('Error in Server action-delete-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

export const SelectAllRecipts = async () => {
  const db = new Database(process.env.DB_NAME)
  db.pragma('journal_mode = WAL')
  try {
    const sqlSelect = `SELECT * FROM recipts`

    const stmtSelect = db.prepare(sqlSelect)
    const rows = stmtSelect.all()

    return Promise.resolve({ success: true, msg: '', data: rows })
  } catch (er) {
    console.log('Error in Server action-select-', er)
    return Promise.resolve({ success: false, msg: er, data: [] })
  } finally {
    db.close()
  }
}

/////////////////////////////////////////////////////////////////

export const getPrevMaterialItem = async (id: number): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    let prevRow
    if (id) {
      const prevIdSql = `SELECT * FROM recipts WHERE id < ? ORDER BY id DESC LIMIT 1`
      prevRow = db.prepare(prevIdSql).get(id)
    } else {
      const prevIdSql2 = `SELECT * FROM recipts ORDER BY id DESC LIMIT 1`
      prevRow = db.prepare(prevIdSql2).get()
    }

    if (prevRow?.id) {
      return Promise.resolve({ success: true, msg: '', data: prevRow })
    } else {
      return Promise.resolve({ success: true, msg: '', data: {} })
    }
  } catch (er) {
    console.log('Error in Server action-getPrevMaterialItem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

export const getNextMaterialItem = async (id: number): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    let nextRow
    db.pragma('journal_mode = WAL')
    if (id) {
      const nextIdSql = `SELECT * FROM recipts WHERE id > ? ORDER BY id ASC LIMIT 1`
      nextRow = db.prepare(nextIdSql).get(id)
    } else {
      const nextIdSql2 = `SELECT * FROM recipts ORDER BY id ASC LIMIT 1`
      nextRow = db.prepare(nextIdSql2).get()
    }

    if (nextRow?.id) {
      return Promise.resolve({ success: true, msg: '', data: nextRow })
    } else {
      return Promise.resolve({
        success: true,
        msg: 'This is the last ID',
        data: {},
      })
    }
  } catch (er) {
    console.log('Error in Server action-getNextMaterialItem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}
