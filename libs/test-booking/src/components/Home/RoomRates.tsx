import { useState } from 'react'

// RoomType interface
interface RoomType {
  name: string
  rates: { type: string; price: number }[]
}

interface RoomRatesProps {
  room: RoomType
  onAdd: (room: RoomType, rateType: string, price: number) => void
}

const RoomRates = ({ room, onAdd }: RoomRatesProps) => {
  const [selectedRate, setSelectedRate] = useState<string>(room.rates[0].type)

  const handleRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRate(e.target.value)
  }

  const getPrice = () => {
    return room.rates.find((rate) => rate.type === selectedRate)?.price
  }

  return (
    <div className="p-4 border-t border-gray-300">
      <h3 className="font-bold">{room.name}</h3>
      <div className="flex justify-between items-center mt-2">
        <select
          value={selectedRate}
          onChange={handleRateChange}
          className="border p-2 rounded w-48"
        >
          {room.rates.map((rate, index) => (
            <option key={index} value={rate.type}>
              {rate.type} : USD {rate.price.toFixed(2)}
            </option>
          ))}
        </select>
        <button
          onClick={() => onAdd(room, selectedRate, getPrice() || 0)}
          className="bg-[#a2925d] text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default function RoomList() {
  const [viewRates, setViewRates] = useState(false)
  const [selectedRooms, setSelectedRooms] = useState<
    { name: string; type: string; price: number }[]
  >([])

  const rooms: RoomType[] = [
    {
      name: 'Superior Room',
      rates: [
        { type: 'Single', price: 131.0 },
        { type: 'Bed & Breakfast', price: 219.0 },
      ],
    },
    {
      name: 'Deluxe Room',
      rates: [
        { type: 'Single', price: 141.0 },
        { type: 'Bed & Breakfast', price: 235.0 },
      ],
    },
    {
      name: 'Standard',
      rates: [
        { type: 'Single', price: 141.0 },
        { type: 'Bed & Breakfast', price: 235.0 },
      ],
    },
    {
      name: 'Suite',
      rates: [
        { type: 'Single', price: 141.0 },
        { type: 'Bed & Breakfast', price: 235.0 },
      ],
    },
    // Add more rooms as needed
  ]

  const handleAddRoom = (room: RoomType, rateType: string, price: number) => {
    setSelectedRooms([
      ...selectedRooms,
      { name: room.name, type: rateType, price },
    ])
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h2 className="font-bold">Standard Rate</h2>
        <button
          onClick={() => setViewRates(!viewRates)}
          className="bg-[#a2925d] px-4 py-2 text-white"
        >
          {viewRates ? 'Hide Rates' : 'View Rates'} From: USD 131.00
        </button>
      </div>

      {viewRates && (
        <div className="bg-white p-4">
          <p className="text-green-600 font-bold">✔ Book Now, Pay Later.</p>
          {rooms.map((room, index) => (
            <RoomRates key={index} room={room} onAdd={handleAddRoom} />
          ))}
        </div>
      )}

      {selectedRooms.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100">
          <h3 className="font-bold">Selected Rooms:</h3>
          <ul>
            {selectedRooms.map((room, index) => (
              <li key={index} className="mt-2">
                {room.name} - {room.type} : USD {room.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
