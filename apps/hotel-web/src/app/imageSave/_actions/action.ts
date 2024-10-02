'use server'

import Database from 'better-sqlite3'

export const insertPurchase = async (formData: FormData) => {
  console.log('formData', formData)
  const db = new Database(process.env.DB_NAME)

  try {
    db.pragma('journal_mode = WAL')

    // Extract files from the form data
    const files = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('receipt'))
      .map(([, value]) => value as File)

    if (files.length === 0) {
      throw new Error('No files uploaded')
    }

    // Prepare the SQL statement for inserting images
    const insertSql = `INSERT INTO invoiceimages (image) VALUES (?)`
    const stmt = db.prepare(insertSql)

    const insertResults = []

    for (const file of files) {
      console.log('File Name:', file.name)
      console.log('File Type:', file.type)
      console.log('File Size:', file.size)

      // Convert file to binary buffer
      const fileBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(fileBuffer)
      console.log('Binary Data:', buffer)

      // Insert the binary data into the database
      const info = stmt.run(buffer)

      insertResults.push({
        success: info.changes === 1,
        lastInsertRowid: info.lastInsertRowid,
        fileName: file.name,
      })
    }

    // Check if all inserts were successful
    const allSuccessful = insertResults.every((result) => result.success)

    return {
      success: allSuccessful,
      msg: allSuccessful ? '' : 'Some inserts failed',
      lastInsertRowids: insertResults.map((result) => result.lastInsertRowid),
    }
  } catch (error) {
    console.error('Error in Server action-insert-', error)
    return { success: false, msg: error.message, lastInsertRowids: [] }
  } finally {
    db.close()
  }
}

export const getImage = async (imageId: number) => {
  const db = new Database(process.env.DB_NAME)

  try {
    db.pragma('journal_mode = WAL')

    // Retrieve the image data from the database
    const selectSql = `SELECT image FROM invoiceimages WHERE id = ?`
    const stmt = db.prepare(selectSql)
    const row = stmt.get(imageId)
    console.log('row', row.image)

    if (row && row.image) {
      return { success: true, image: row.image }
    } else {
      return { success: false, msg: 'Image not found' }
    }
  } catch (error) {
    console.error('Error in Server action-getImage-', error)
    return { success: false, msg: error.message }
  } finally {
    db.close()
  }
}
