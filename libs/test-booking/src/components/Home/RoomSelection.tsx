import React, { useState } from 'react'

interface Room {
  name: string
  imageUrl: string
  description: string
  deals: { name: string; originalPrice: number; discountedPrice: number }[]
  maxOccupants: number
  size: string
}

const rooms: Room[] = [
  {
    name: 'Luxury Twin',
    imageUrl: '/path/to/luxury-twin.jpg',
    description:
      'Luxury Rooms are located in the Sigiriya wing. They are larger than Superior Rooms...',
    deals: [
      {
        name: 'Breakfast Included',
        originalPrice: 73500,
        discountedPrice: 55125,
      },
      { name: 'Half Board', originalPrice: 78500, discountedPrice: 58875 },
      { name: 'Full Board', originalPrice: 83500, discountedPrice: 62625 },
    ],
    maxOccupants: 3,
    size: '388 ft² / 36 m²',
  },
]

const RoomSelection: React.FC = () => {
  const [currency, setCurrency] = useState('LKR')
  const [exchangeRate, setExchangeRate] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value
    setCurrency(selectedCurrency)

    // Adjust rates based on selected currency (simplified)
    if (selectedCurrency === 'USD') setExchangeRate(0.003)
    else if (selectedCurrency === 'EUR') setExchangeRate(0.0028)
    else setExchangeRate(1) // Default is LKR
  }

  const formatPrice = (price: number) => {
    return (price * exchangeRate).toFixed(2)
  }

  const openModal = (room: Room) => {
    setSelectedRoom(room)
    setShowModal(true)
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Hillroost Kandy (LKR)</h1>
        <div>
          <label htmlFor="currency" className="mr-2">
            Currency:
          </label>
          <select
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            className="border p-2"
          >
            <option value="LKR">LKR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      {/* Room List */}
      {rooms.map((room) => (
        <div
          key={room.name}
          className="border-b py-4 flex justify-between items-center"
        >
          <div className="flex items-start">
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-48 h-32 object-cover"
            />
            <div className="ml-4">
              <h3 className="text-xl font-bold">{room.name}</h3>
              <p className="text-sm">{room.description}</p>
              <p className="text-sm">Max Occupants: {room.maxOccupants}</p>
              <p className="text-sm">Size: {room.size}</p>
              <button
                className="text-blue-600 underline mt-2"
                onClick={() => openModal(room)}
              >
                View Room Details
              </button>
            </div>
          </div>
          <div className="text-right">
            {room.deals.map((deal) => (
              <div key={deal.name} className="mb-2">
                <span>{deal.name}:</span>
                <div>
                  <span className="line-through mr-2 text-gray-400">
                    {formatPrice(deal.originalPrice)}
                  </span>
                  <span className="font-bold">
                    {formatPrice(deal.discountedPrice)} {currency}
                  </span>
                </div>
              </div>
            ))}
            <button className="bg-gold text-white py-2 px-4 mt-4">Book</button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold">{selectedRoom.name}</h2>
            <p>{selectedRoom.description}</p>
            <button
              className="bg-red-500 text-white py-2 px-4 mt-4"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomSelection
