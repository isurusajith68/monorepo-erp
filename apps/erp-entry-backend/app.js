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
    origin: [
      'http://localhost:5173',
      'http://localhost:5175',
      'http://localhost:5174',
    ],
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

  const select = `SELECT e.rid,e.erpuser,e.hotelid,u.password,u.username
                FROM employees AS e
                INNER JOIN users AS u
                ON e.id = u.empid AND e.email='${email}'`

  pool
    .query(select)
    .then(async (res) => {
      console.log('resaaa', res)

      if (res.rows.length > 0) {
        const userData = {
          password: res.rows[0].password,
          rid: res.rows[0].rid,
          username: res.rows[0].username,
          hotelid: res.rows[0].hotelid,
        }
        console.log('userData', userData)

        const isPasswordValid = await bcrypt.compare(
          password,
          userData.password,
        )
        console.log('isPasswordValid', isPasswordValid)

        if (!isPasswordValid) {
          return res1.send({ success: false, message: 'Invalid credentials' })
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
          rid: userData.rid,
          hotelid: userData.hotelid,
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

console.clear()

/***********************************************************************/
/****************************AUTH MODULE********************************/
/***********************************************************************/

/////////////////////////////////////////////////////////////////////
////////////////////////////ROLES////////////////////////////////////

app.post('/addrole', async (req, res) => {
  const inserts = req.body?.roles?.inserts
  const updates = req.body?.roles?.updates
  const deletes = req.body?.roles?.deletes
  const ignoredRoles = []
  const insertedRoles = []
  const updatedRoles = []
  const deletedRoles = []
  try {
    //inserts
    for (let a = 0; inserts.length > a; a++) {
      let r = inserts[a]
      const sqlCheck = `SELECT 1 as role FROM userroles WHERE role = $1 `
      const res1 = await pool.query(sqlCheck, [r.role])

      if (res1.rows.length > 0) {
        ignoredRoles.push(r.role)
      } else {
        const sqlInsert = `INSERT INTO userroles ( role, description,hotelid) VALUES ($1, $2,$3)`
        const insrtedData = await pool.query(sqlInsert, [
          r.role,
          r.description ?? 0,
          r.hotelid,
        ])
        insertedRoles.push(r.role)
      }
    }

    //updates

    for (let a = 0; updates.length > a; a++) {
      let r = updates[a]
      const [sqlUpdate, vals] = getUpdateQuery(r, 'userroles', 'rid')

      const res1 = await pool.query(sqlUpdate, vals)

      if (res1.rowCount > 0) {
        updatedRoles.push(r)
      }
    }

    //deletes

    for (let a = 0; deletes.length > a; a++) {
      let r = deletes[a]
      const sqlDelete = `DELETE FROM userroles WHERE rid=$1; `
      const res1 = await pool.query(sqlDelete, [r])

      if (res1.rowCount > 0) {
        deletedRoles.push(r)
      }
    }

    res.send({
      success: true,
      message: '',
      process: {
        ignoredRoles: ignoredRoles,
        insertedRoles: insertedRoles,
        updatedRoles: updatedRoles,
        deletedRoles: deletedRoles,
      },
    })
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    })
  }
})

app.get('/getroles/:hotelid', (req, res) => {
  const { hotelid } = req.params
  const dbquery = `SELECT * FROM userroles where hotelid=$1 or hotelid=0 ORDER BY rid;`
  pool.query(dbquery, [hotelid]).then((dbres) => {
    if (dbres.rows.length > 0) {
      res.send({ success: true, roles: dbres.rows })
    }
  })
})

/////////////////////////////////////////////////////////////////////
////////////////////////////MODULES////////////////////////////////////

app.get('/getmodules/:hotelid', (req, res) => {
  const { hotelid } = req.params

  // const dbquery = `SELECT * FROM modules ORDER BY modid;`
  const dbquery = `SELECT m.*
FROM modules m
INNER JOIN hotelmodulemap hm ON m.modid = hm.modid
WHERE hm.hotelid = $1;`
  pool.query(dbquery, [hotelid]).then((dbres) => {
    if (dbres.rows.length > 0) {
      res.send({ success: true, modules: dbres.rows })
    }
  })
})

/////////////////////////////////////////////////////////////////////
////////////////////////////DOCUMENTS////////////////////////////////////

app.get('/getdocuments/:hotelid', (req, res) => {
  const { hotelid } = req.params
  // const dbquery = `SELECT documents.*,modules.modname FROM modules RIGHT JOIN documents ON documents.modid=modules.modid  ORDER BY documents.docid;`
  const dbquery = `SELECT documents.*, modules.modname 
FROM modules 
RIGHT JOIN documents ON documents.modid = modules.modid 
INNER JOIN hotelmodulemap ON hotelmodulemap.hotelid = $1 AND hotelmodulemap.modid = modules.modid
ORDER BY documents.docid;`

  pool.query(dbquery, [hotelid]).then((dbres) => {
    if (dbres.rows.length > 0) {
      res.send({ success: true, documents: dbres.rows })
    }
  })
})

app.get('/documentsall', (req, res) => {
  const dbquery = `SELECT * FROM documents ORDER BY docid;`

  pool.query(dbquery).then((dbres) => {
    if (dbres.rows.length > 0) {
      res.send({ success: true, documents: dbres.rows })
    }
  })
})

app.get('/documentsbymodule/:selectedModule', (req, res) => {
  const selectedModule = req.params.selectedModule
  const dbquery = `SELECT * FROM documents WHERE modid=${selectedModule} ORDER BY docid;`

  pool.query(dbquery).then((dbres) => {
    if (dbres.rows.length > 0) {
      res.send({ success: true, documents: dbres.rows })
    }
  })
})

/////////////////////////////////////////////////////////////////////
////////////////////////////ACTIONS////////////////////////////////////

app.get('/getactions/:hotelid', (req, res) => {
  const { hotelid } = req.params
  // const dbquery = `SELECT * FROM actions ORDER BY actid;`
  const dbquery = `SELECT a.* FROM actions a INNER JOIN hotelmodulemap hm ON a.modid = hm.modid and hm.hotelid=$1
ORDER BY a.actid`

  pool.query(dbquery, [hotelid]).then((dbres) => {
    if (dbres.rows.length > 0) {
      res.send({ success: true, actions: dbres.rows })
    }
  })
})

/////////////////////////////////////////////////////////////////////
////////////////////////////PERMISSIONS////////////////////////////////////

app.get('/getpermissons/:roleid/:modid', (req, res) => {
  const modid = req.params.modid
  const roleid = req.params.roleid

  const dbquery = `SELECT a.docid, COALESCE(p.permission IS NOT NULL, false) AS permission ,
                   a.actid, a.actname ,p.permissionid FROM actions a 
                   left join  permissions p on a.actid=p.actid AND p.rid=${roleid}
                   WHERE a.modid=${modid}
                   ORDER BY permissionid;`

  pool.query(dbquery).then((dbres) => {
    if (dbres.rows.length > 0) {
      res.send({ success: true, list: dbres.rows })
    }
  })
})

app.post('/addpermission', async (req, res) => {
  const { truePermissions, rid, module } = req.body

  console.log('rid', req.body)
  try {
    const sqlDelete = `DELETE FROM permissions WHERE rid=${rid} and modid=${module}`
    const res1 = await pool.query(sqlDelete)

    truePermissions.map(async (p) => {
      const sqlInsert = `INSERT INTO permissions ( rid, modid,docid,actid,permission) VALUES (${rid},${module},${
        p.docid
      },${p.actid},${true})`
      const res2 = await pool.query(sqlInsert)
    })

    if (res1.rows.length > 0) {
    }
  } catch (error) {
    console.log('error', error)
  }
})

app.get('/userpermissions/:roleid', (req, res) => {
  const roleid = req.params.roleid

  console.log('roleid', roleid)

  const query = `SELECT p.modid,m.modname,m.url FROM permissions AS p INNER JOIN modules AS m 
                 ON p.modid=m.modid AND p.rid='${roleid}'`

  pool.query(query).then((dbres) => {
    console.log('dbres', dbres)

    if (dbres.rows.length > 0) {
      res.send({ success: true, list: dbres.rows })
    }
  })
})

app.get('/permittedModules/:roleid', (req, res) => {
  const roleid = req.params.roleid

  console.log('roleid', roleid)

  const query = `SELECT p.modid,m.modname,m.url,m.icon FROM permissions AS p INNER JOIN modules AS m 
                 ON p.modid=m.modid AND p.rid='${roleid}'
                 group by p.modid,m.modname,m.url,m.icon  `

  pool.query(query).then((dbres) => {
    console.log('dbres', dbres)

    if (dbres.rows.length > 0) {
      res.send({ success: true, list: dbres.rows })
    }
  })
})
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
