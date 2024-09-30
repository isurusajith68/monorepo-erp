'use server'

import Database from 'better-sqlite3'
import { pid } from 'process'

import React from 'react'
import { SiTruenas } from 'react-icons/si'

//----------insert------------

export const InsertProject = async (data: any) => {
  console.log('data', process.env.DB_NAME, data)
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    // main table
    const insertSql = `INSERT INTO projects (powner, pname, estibudget, prdate, pdate, pdescription) VALUES (?, ?, ?, ?, ?, ?)`

    const stmt = db.prepare(insertSql)
    const info = stmt.run(
      data.powner,
      data.pname,
      data.estibudget,
      data.prdate,
      data.pdate,
      data.pdescription,
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

export const getProject = async (pid: Number): Promise<any> => {
  //this promise rerturn the id data(user details)
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    //main table
    const mainRow = db.prepare(`SELECT * FROM  projects  WHERE pid=?`).get(pid) //? is a placeholder

    return Promise.resolve({ success: true, msg: '', data: { ...mainRow } }) //mainrow have all data of the id(sperad it)
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//-------update-----------

export const updateProject = async (dirtyfields: any, pid: string) => {
  console.log('data', dirtyfields, pid)
  const db = new Database(process.env.DB_NAME)
  const colDefs: string[] = Object.keys(dirtyfields).map(
    (f: string) => `${f} = ?`,
  )
  const values = Object.keys(dirtyfields).map((f: string) => dirtyfields[f])

  // for (const key in dirtyfields) {
  //    colDefs.push(`${key} = ?`)
  // }

  const sql = `UPDATE projects SET ${colDefs.join(',')} WHERE pid=?`
  console.log('sql', sql)
  console.log('values', values)
  const stmt = db.prepare(sql)
  const info = stmt.run(...values, pid)
}

//-----------delete-----------

export const DeleteProjects = async (pid: number) => {
  const db = new Database(process.env.DB_NAME)
  db.pragma('journal_mode = WAL')
  try {
    const sqlDel = `DELETE FROM projects WHERE pid = ?`

    const stmtDel = db.prepare(sqlDel)
    const infoDel = stmtDel.run(pid)

    return Promise.resolve({ success: true, msg: '', data: {} })
  } catch (er) {
    console.log('Error in Server action-delete-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

export const SelectAllProjects = async () => {
  const db = new Database(process.env.DB_NAME)
  db.pragma('journal_mode = WAL')
  try {
    const sqlSelect = `SELECT * FROM projects`

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

export const getAllProjects = async (): Promise<any> => {
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')
    const projects = db.prepare(`SELECT pid, pname FROM projects`).all()
    return Promise.resolve({ success: true, msg: '', data: projects })
  } catch (error) {
    console.log('Error in Server action-getAllProjects-', error)
    return Promise.resolve({ success: false, msg: error, data: [] })
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
      const prevIdSql = `SELECT * FROM projects WHERE pid < ? ORDER BY pid DESC LIMIT 1`
      prevRow = db.prepare(prevIdSql).get(id)
    } else {
      const prevIdSql2 = `SELECT * FROM projects ORDER BY pid DESC LIMIT 1`
      prevRow = db.prepare(prevIdSql2).get()
    }

    if (prevRow?.pid) {
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
      const nextIdSql = `SELECT * FROM projects WHERE pid > ? ORDER BY pid ASC LIMIT 1`
      nextRow = db.prepare(nextIdSql).get(id)
    } else {
      const nextIdSql2 = `SELECT * FROM projects ORDER BY pid ASC LIMIT 1`
      nextRow = db.prepare(nextIdSql2).get()
    }

    if (nextRow?.pid) {
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

//////////////////////////////////////////////////

export const SelectProjects = async (): Promise<any> => {
  //this promise rerturn the id data(user details)
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    //main table
    const mainRow = db
      .prepare(
        `SELECT projects.pname,purchases.* FROM projects  
    RIGHT JOIN purchases
    ON projects.pid = purchases.project`,
      )
      .all() //? is a placeholder

    return Promise.resolve({ success: true, msg: '', data: [...mainRow] }) //mainrow have all data of the id(sperad it)
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}

//////////////////////////////////////////////////

export const SelectInvoices = async (): Promise<any> => {
  //this promise rerturn the id data(user details)
  const db = new Database(process.env.DB_NAME)
  try {
    db.pragma('journal_mode = WAL')

    //main table
    const mainRow = db
      .prepare(
        `SELECT projects.pname,invoices.* FROM projects  
    RIGHT JOIN invoices
    ON projects.pid = invoices.project`,
      )
      .all() //? is a placeholder

    return Promise.resolve({ success: true, msg: '', data: [...mainRow] }) //mainrow have all data of the id(sperad it)
  } catch (er) {
    console.log('Error in Server action-getitem-', er)
    return Promise.resolve({ success: false, msg: er, data: {} })
  } finally {
    db.close()
  }
}
