import express from 'express'
import cors from 'cors'
import bookingRouter from './routes/booking-router'
import erp from './routes/erp-system-router'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/bookings', bookingRouter)
app.use('/erp', erp)

export default app
