//const express = require('express')
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { pool } from './database.js'

const app = express()
const port = 10000
app.use(cors())
app.use(bodyParser.json()) // To parse JSON data

// app.get('/getData',(req,res)=>{
//   res.send("hello page,backend working")
// })

app.post('/sendData', (req, res) => {
  const { email, password } = req.body
  console.log('Received data:', { password, email })

  // const insert=`INSERT INTO login (email, password)
  // VALUES ('${email}','${password}');`

  const select = `SELECT (email, password)
FROM login
WHERE email='${email}' AND password='${password}';`

  pool
    .query(select)
    .then((res) => {
      console.log('select', res)
    })
    .catch(
      console.log((err) => {
        console.log(err)
      }),
    )

  // Send a response back to the client
  res.json({ message: 'Data received successfully', data: req.body })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

try {
  const sqlSelect = `SELECT * FROM users WHERE email = ?`
  const stmtSelect = db.prepare(sqlSelect)
  const user = stmtSelect.get(email)

  if (!user) {
    return { success: false, message: 'User not found' }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return { success: false, message: 'Invalid credentials' }
  }

  const token = createSessionToken(user.id)
  // const cookie = serialize("authToken", token, {
  //   httpOnly: true,
  //   maxAge: 60 * 60 * 24,
  //   path: "/",
  // });
  cookies().set({
    name: 'authToken',
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return {
    success: true,
    message: 'User logged in successfully',
    //   cookie,
  }
} catch (error) {
  console.error('Error in Server action-login-', error)
  return { success: false, message: error.message }
} finally {
  db.close()
}
