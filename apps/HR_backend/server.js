const express = require('express')
const cors = require('cors')
const pool = require('./database')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/b', (req, res) => {
  //add employee

  const a = req.body['emname']
  const b = req.body['ememail']
  const c = req.body['emmobile']
  const d = req.body['emdesignation']
  const e = req.body['emdepartment']
  const f = req.body['emhiredate']
  const g = req.body['emaddress']
  const h = req.body['emsalary']
  const i = req.body['emstatus']

  const insertSTMT = `INSERT INTO employees (emname, ememail, emmobile, emdesignation, emdepartment, emhiredate, emaddress, emsalary, emstatus) VALUES ('${a}','${b}','${c}','${d}','${e}','${f}','${g}','${h}', '${i}' )`
  pool
    .query(insertSTMT)
    .then((response) => {
      console.log('Data saved')
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  console.log(req.body)
  res.send('response recived :' + req.body)
})

app.post('/emp', (req, res) => {
  const {
    emname,
    ememail,
    emmobile,
    emdesignation,
    emdepartment,
    emhiredate,
    emaddress,
    emsalary,
    emstatus,
  } = req.body

  const insertSTMT = `
    INSERT INTO employees (emname, ememail, emmobile, emdesignation, emdepartment, emhiredate, emaddress, emsalary, emstatus) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,  $9)

    RETURNING id;`

  pool
    .query(insertSTMT, [
      emname,
      ememail,
      emmobile,
      emdesignation,
      emdepartment,
      emhiredate,
      emaddress,
      emsalary,
      emstatus,
    ])
    .then((response) => {
      const lastInsertRowid = response.rows[0].id
      console.log('Employee saved')
      res.json({ success: true, msg: '', lastInsertRowid })
    })
    .catch((err) => {
      console.error('Insert failed', err)
      res.json({ success: false, msg: 'Insert failed', lastInsertRowid: 0 })
    })
})

//update employee
app.put('/employee/:id', (req, res) => {
  const { id } = req.params
  const dirtyfields = req.body

  // Prepare column definitions and values from dirtyfields
  const colDefs = Object.keys(dirtyfields).map(
    (field, index) => `${field} = $${index + 1}`,
  )
  const values = Object.values(dirtyfields)

  if (colDefs.length === 0) {
    // No changes to be made, exit early
    return res.json({ success: false, msg: 'No fields to update' })
  }

  // Construct the SQL query
  const updateSQL = `UPDATE employees SET ${colDefs.join(', ')} WHERE id = $${colDefs.length + 1} RETURNING *`

  // Execute the update query
  pool
    .query(updateSQL, [...values, id])
    .then((response) => {
      if (response.rowCount > 0) {
        res.json({
          success: true,
          msg: 'employee updated successfully',
          updatedEmployee: response.rows[0],
        })
      } else {
        res.json({
          success: false,
          msg: 'employee not found or no changes made',
        })
      }
    })
    .catch((err) => {
      console.error('Error executing update query:', err)
      res.json({
        success: false,
        msg: 'Error updating employee',
        error: err.message,
      })
    })
})

// get employee details by id
app.get('/employee/:id', (req, res) => {
  const { id } = req.params

  const getEmployeeQuery = `SELECT * FROM employees WHERE id = $1`

  pool
    .query(getEmployeeQuery, [id])
    .then((response) => {
      if (response.rows.length > 0) {
        const employeeData = response.rows[0]
        res.json({ success: true, msg: '', data: employeeData })
      } else {
        res.json({ success: false, msg: 'employee not found', data: {} })
      }
    })
    .catch((err) => {
      console.error('Error fetching employee:', err)
      res.json({ success: false, msg: 'Error fetching employee', data: {} })
    })
})

// get all employees

app.get('/getAllemployees', (req, res) => {
  const getAllEmployeeQuery = `SELECT * FROM employees`

  pool
    .query(getAllEmployeeQuery)
    .then((response) => {
      if (response.rows.length > 0) {
        const employeeData = response.rows // Get all rows
        res.json({ success: true, msg: '', data: employeeData })
      } else {
        res.json({ success: false, msg: 'No employee found', data: [] })
      }
    })
    .catch((err) => {
      console.error('Error fetching employee:', err)
      res.json({ success: false, msg: 'Error fetching employee', data: [] })
    })
})

//delete  employee

app.delete('/deleteemploye/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Prepare the SQL query
    const sqlDel = 'DELETE FROM employees WHERE id = $1'
    const result = await pool.query(sqlDel, [id])

    // Check if any row was deleted
    if (result.rowCount > 0) {
      res
        .status(200)
        .json({ success: true, msg: 'employee deleted successfully', data: {} })
    } else {
      res
        .status(404)
        .json({ success: false, msg: 'employees not found', data: {} })
    }
  } catch (error) {
    console.error('Error deleting employees:', error)
    res.status(500).json({ success: false, msg: 'Server error', data: {} })
  }
})

app.listen(4000, () => console.log('server is running on port 4000'))
