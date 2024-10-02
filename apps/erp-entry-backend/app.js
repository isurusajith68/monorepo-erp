//const express = require('express')
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { pool } from './database.js'
import bcrypt from 'bcrypt'
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import { jwtVerify } from 'jose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { requireAuth } from './middleware/authMiddleware.js'

dotenv.config()

const SALT_ROUNDS = 10

const app = express()
const port = 10000
//app.use(cors());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5175'],
    credentials: true,
  }),
)
app.use(bodyParser.json()) // To parse JSON data
app.use(cookieParser())

app.get('/getData', (req, res) => {
  res.cookie('jala', true)
  res.cookie('helaaa', true)

  res.send('car data is stored in cookies')
})

/////////////////////////////////////////////////////add user//////////////////////////////////////////////////

app.post('/registerUser', async (req, res) => {
  const { email, password, role, username } = req.body

  try {
    const sqlCheck = `SELECT 1 as name FROM users WHERE email = $1 `

    const res1 = await pool.query(sqlCheck, [email])

    if (res1.rows.length > 0) {
      return res.send({ success: false, message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const sqlInsert = `INSERT INTO users ( email, password,username) VALUES ($1, $2,$3)`
    const insrtedData = await pool.query(sqlInsert, [
      email,
      hashedPassword,
      username,
    ])

    console.log('insrtedData', insrtedData)

    if (insrtedData.rowCount == 1) {
      console.log('added')
      return res.send({
        success: true,
        message: 'User registered successfully',
      })
    }

    //     await pool.query(sqlCheck).then(async(res)=>{

    //       if (res.rows.length > 0) {
    //       return { success: false, message: "User already exists" };
    //     }
    //     console.log("qqqq")
    //     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // console.log("hashedPassword",hashedPassword)
    //     const sqlInsert = `INSERT INTO login ( email, password) VALUES ($1, $2)`;
    //     await pool.query(sqlInsert, [email, hashedPassword]);

    //     return { success: true, message: "User registered successfully" };}).catch(
    //       console.log((err)=>{
    //         console.log(err)
    //         return { success: false, message: error.message };
    //       })
    //     )
  } catch (error) {
    console.error('Error in backend-', error)
    return res.send({ success: false, message: error.message })
  }
})

///////////////////////////////////////////////////login//////////////////////////////////////////////////////////

// app.post("/login",requireAuth, (req, res1) => {
app.post('/login', (req, res1) => {
  const { email, password } = req.body
  console.log('Received data:', { password, email })

  // const insert=`INSERT INTO login (email, password)
  // VALUES ('${email}','${password}');`

  const select = `SELECT *
                  FROM users
                  WHERE email='${email}';`

  pool
    .query(select)
    .then(async (res) => {
      if (res.rows.length > 0) {
        const userData = {
          email: res.rows[0].email,
          password: res.rows[0].password,
          id: res.rows[0].id,
          username: res.rows[0].username,
        }
        console.log('userData', userData)

        const isPasswordValid = await bcrypt.compare(
          password,
          userData.password,
        )
        console.log('isPasswordValid', isPasswordValid)

        if (!isPasswordValid) {
          return { success: false, message: 'Invalid credentials' }
        }

        const token = createSessionToken(userData.id)

        // const cookie = serialize("authToken", token, {
        //   httpOnly: true,
        //   maxAge: 60 * 60 * 24,
        //   path: "/",
        // });

        // cookie().set({
        //   name: "authToken",
        //   value: token,
        //   httpOnly: true,
        //   maxAge: 60 * 60 * 24,
        //   path: "/",
        // });

        // res1.cookie("authToken1", "your_token_value", {
        //   httpOnly: true,
        //   maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        //   path: "/",
        //   sameSite: "Lax",
        //   secure: false, // Set to true if using HTTPS
        // });

        res1.cookie('authToken', token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          path: '/',
        })

        return res1.send({
          success: true,
          username: userData.username,
          message: 'User logged in successfully',
        })
      } else {
        res1.json({ message: 'User not found' })
      }
    })
    .catch(
      console.log((err) => {
        console.log(err)
        return { success: false, message: error.message }
      }),
    )
})

app.get('/logout', (req, res) => {
  try {
    // const cookie = serialize("authToken", "", {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   path: "/",
    //   expires: new Date(0),
    // });

    res.cookie('authToken', '', {
      httpOnly: true,
      maxAge: -1,
      path: '/',
    })

    return res.send({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error in logoutUser action:', error)
    return res.send({ success: false, message: error.message })
  }
})

const createSessionToken = (userId) => {
  const payload = { userId }
  const options = { expiresIn: '1d' }
  console.log(jwt.sign(payload, process.env.JWT_SECRET, options))
  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

app.post('/addrole', (req, res) => {
  console.log('name', req.body.purchasedetails)

  req.body.purchasedetails.map(async (r) => {
    try {
      const sqlCheck = `SELECT 1 as role FROM userroles WHERE role = $1 `

      const res1 = await pool.query(sqlCheck, [r.name])
      console.log('res', res1)

      if (res1.rows.length > 0) {
        return res.send({ success: false, message: 'User already exists' })
      }

      const sqlInsert = `INSERT INTO userroles ( role, description) VALUES ($1, $2)`
      const insrtedData = await pool.query(sqlInsert, [
        r.name,
        r.description ?? 0,
      ])

      console.log('insrtedData', insrtedData)
    } catch (err) {
      console.log('error is ', err)
      res.send({ success: false, message: err.message })
    }
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
