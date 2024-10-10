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
import getUpdateQuery from './utils.js'
// import { client_encoding } from 'pg/lib/defaults.js'

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

/////////////////////////////////////////////////////////////////
//////////////////////////ADD USER///////////////////////////////

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

/////////////////////////////////////////////////////////////////
//////////////////////////LOGIN//////////////////////////////////

// app.post("/login",requireAuth, (req, res1) => {
app.post('/login', (req, res1) => {
  const { email, password } = req.body
  console.log('Received data:', { password, email })

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

/////////////////////////////////////////////////////////////////
//////////////////////////LOGOUT/////////////////////////////////

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

/////////////////////////////////////////////////////////////////////
////////////////////////////ROLES////////////////////////////////////

app.post('/addrole', (req, res) => {
  console.log('name', req.body?.roles)

  const inserts = req.body?.roles?.inserts
  const updates = req.body?.roles?.updates
  const deletes = req.body?.roles?.deletes
  const ignoredRoles = []
  const insertedRoles = []
  const updatedRoles = []

  let insert = async (r) => {
    try {
      console.log('hello')
      const sqlCheck = `SELECT 1 as role FROM userroles WHERE role = $1 `
      const res1 = await pool.query(sqlCheck, [r.role])

      if (res1.rows.length > 0) {
        ignoredRoles.push(r.role)
        console.log('ignoredRoles', ignoredRoles)
        console.log(r.role, 'Role already exists')
        return
      }

      const sqlInsert = `INSERT INTO userroles ( role, description) VALUES ($1, $2)`
      const insrtedData = await pool.query(sqlInsert, [
        r.role,
        r.description ?? 0,
      ])
      insertedRoles.push(r.role)
    } catch (err) {
      console.log('error is ', err)
      res.send({ success: false, message: err.message })
    }
  }

  let update = async (r) => {
    try {
      console.log('hello')

      const [sqlUpdate, vals] = getUpdateQuery(r, 'userroles', 'rid')
      console.log('sqlUpdate', sqlUpdate)
      console.log('vals', vals)

      const res1 = await pool.query(sqlUpdate, vals)

      console.log('res1', res1)

      if (res1.rowCount > 0) {
        updatedRoles.push(r)
        console.log('updatedRoles', updatedRoles)
        return
      }
    } catch (err) {
      console.log('error is ', err)
      res.send({ success: false, message: err.message })
    }
  }

  async function processInsert() {
    if (inserts != undefined) {
      for (let a = 0; inserts.length > a; a++) {
        let r = inserts[a]
        await insert(r)
      }

      // return res.send({
      //   success: true,
      //   ignoredRoles: ignoredRoles,
      //   insertedRoles: insertedRoles,
      //   message: 'Role added successfully',
      // })
    }
  }
  processInsert()

  async function processUpdate() {
    if (updates != undefined) {
      for (let a = 0; updates.length > a; a++) {
        let r = updates[a]
        await update(r)
      }
    }
  }
  processUpdate()

  async function processUpdate() {
    if (updates != undefined) {
      for (let a = 0; updates.length > a; a++) {
        let r = updates[a]
        await update(r)
      }
    }
  }
  processUpdate()
})

app.get('/getroles', (req, res) => {
  const dbquery = `SELECT * FROM userroles;`
  pool.query(dbquery).then((dbres) => {
    if (dbres.rows.length > 0) {
      const roles = { rows: dbres.rows }
      res.send({ success: true, roles: roles })
    }
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
