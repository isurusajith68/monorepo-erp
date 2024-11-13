import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className=" w-60 h-32 bg-green-100 border border-green-400  rounded-md shadow-lg">
          <div className="bg-green-300">
            <h1 className="text-center font-medium">Bookings</h1>
          </div>
        </div>
        <div className=" w-60 h-32 bg-green-100 ml-10 border border-green-400 rounded-md shadow-lg">
          <div className="bg-green-300">
            <h1 className="text-center font-medium">Registration</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen mt-10">
        <div className="w-full max-w-xs p-6 bg-green-100 rounded-md shadow-lg">
          <h1 className="text-xl font-bold text-center mb-4">Booked Dates</h1>

          <div className="bg-green-400 py-2 rounded-t-md">
            <h1 className="text-center font-medium text-white">Calendar</h1>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />

          <div className="flex justify-center mt-4">
            <Button
              className="bg-green-400 rounded-lg hover:bg-green-700 hover:text-white"
              variant="outline"
              onClick={() => navigate('/booking/add')}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
