'use server'

import Database from 'better-sqlite3'

export const insertPurchase = async (formData: FormData) => {
  console.log('formData', formData)
  const db = new Database(process.env.DB_NAME)

  try {
    db.pragma('journal_mode = WAL')

    // Extract the file from the form data
    const file = formData.get('receipt') as File
    if (!file) {
      throw new Error('No file uploaded')
    }

    // Convert file to binary buffer
    const fileBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(fileBuffer)

    // Insert the binary data into the database
    const insertSql = `INSERT INTO invoiceimages (image) VALUES (?)`
    const stmt = db.prepare(insertSql)
    const info = stmt.run(buffer)

    if (info.changes === 1) {
      return { success: true, msg: '', lastInsertRowid: info.lastInsertRowid }
    } else {
      return { success: false, msg: 'Insert failed', lastInsertRowid: '0' }
    }
  } catch (error) {
    console.error('Error in Server action-insert-', error)
    return { success: false, msg: error.message, lastInsertRowid: '0' }
  } finally {
    db.close()
  }
}
