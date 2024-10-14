import React, { useState } from 'react'

interface DateRate {
  date: string
  price: number
  checkoutOnly?: boolean
}

const initialDates: DateRate[] = [
  { date: '2024-10-13', price: 55125 },
  { date: '2024-10-14', price: 55125 },
  { date: '2024-10-15', price: 54375 },
  { date: '2024-10-16', price: 54375 },
  // Add more dates and prices here as needed
]

const months = ['October 2024', 'November 2024']

const CalendarScreen: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<string | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(0) // 0 -> October 2024

  const handleDateClick = (date: string) => {
    if (!checkInDate) {
      setCheckInDate(date)
    } else if (checkInDate && !checkOutDate && date > checkInDate) {
      setCheckOutDate(date)
    } else {
      setCheckInDate(date)
      setCheckOutDate(null)
    }
  }

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentMonth > 0) {
      setCurrentMonth(currentMonth - 1)
    } else if (direction === 'next' && currentMonth < months.length - 1) {
      setCurrentMonth(currentMonth + 1)
    }
  }

  //const formatDate = (date: string) => new Date(date).toLocaleDateString();

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Heritance Kandalama (LKR)</h1>
        <div>
          <p>Adults & Children: 2/0</p>
          <p>Dates of Stay</p>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          className={`p-2 ${currentMonth === 0 ? 'opacity-50' : ''}`}
          onClick={() => handleMonthChange('prev')}
          disabled={currentMonth === 0}
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">{months[currentMonth]}</h2>
        <button
          className={`p-2 ${
            currentMonth === months.length - 1 ? 'opacity-50' : ''
          }`}
          onClick={() => handleMonthChange('next')}
          disabled={currentMonth === months.length - 1}
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 text-center">
        {/* Days of the Week */}
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>

        {/* Dates */}
        {initialDates.map(({ date, price }) => (
          <div
            key={date}
            className={`p-4 border rounded-lg ${
              date === checkInDate
                ? 'bg-green-200'
                : date === checkOutDate
                ? 'bg-blue-200'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleDateClick(date)}
          >
            <p className="font-bold">{new Date(date).getDate()}</p>
            <p className="text-sm">LKR {price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="flex justify-between mt-6">
        <button className="bg-gray-300 py-2 px-4 rounded">Go Back</button>
        <button className="bg-yellow-500 text-white py-2 px-6 rounded">
          Confirm Dates of Stay
        </button>
      </div>
    </div>
  )
}

export default CalendarScreen
