import { Router } from 'express'
import pool from '../config/db'
import { Request, Response } from 'express'

const erp = Router()

erp.post('/erpcreate', async (req: Request, res: Response) => {
  try {
    // Extract form data
    const {
      firstname,
      middlename,
      lastname,
      phonenumber,
      email,
      nic,
      address1,
      address2,
      city,
      district,
      companyname,
    } = req.body

    // Create the JSON object to store in the details column
    const details = JSON.stringify({
      firstname,
      middlename,
      lastname,
      phonenumber,
      email,
      nic,
      address1,
      address2,
      city,
      district,
      companyname,
    })

    // Insert the object into the apprequests table
    const result = await pool.query(
      `INSERT INTO apprequests (details) VALUES ($1) RETURNING *`,
      [details],
    )

    res.status(201).json({
      message: 'Data saved successfully',
      data: result.rows[0],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to save data' })
  }
})

export default erp
