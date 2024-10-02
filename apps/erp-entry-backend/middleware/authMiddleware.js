import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const requireAuth = (req, res, next) => {
  const token = req.cookies.authToken
  console.log('token', req.cookies)

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.redirect('/login')
      } else {
        console.log('decodedToken', decodedToken)
        next()
      }
    })
  } else {
    // res.redirect("/login")
    res.send('error')
  }
}
