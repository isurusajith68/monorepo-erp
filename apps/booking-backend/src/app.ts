import express from 'express'
import cors from 'cors'
import bookingRouter from './routes/booking-router'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/bookings', bookingRouter)

export default app
