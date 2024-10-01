const express = require('express')
const cors = require('cors')
const pool = require('./database')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/booking', (req, res) => {
  console.log(req.body)
  res.send('response recived :' + req.body)
})

app.listen(4000, () => console.log('server is running on port 4000'))
