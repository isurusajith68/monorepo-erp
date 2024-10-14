import { useState } from 'react'
import RoomRates from './RoomRates'
import GuestInformationForm from './GuestInformationForm'

const rooms = [
  {
    name: 'Room Only Rate',
    price: 'USD 89.08',
    viewRates: ['FB', 'HB', 'RO', 'BB'],
  },
  {
    name: 'Bed and Breakfast Rate',
    price: 'USD 95.17',
    viewRates: ['RO', 'BB'],
  },
  {
    name: 'Business Traveller Offer',
    price: 'USD 164.04',
    viewRates: ['BB', 'FB'],
  },
  { name: 'Suite Offer', price: 'USD 182.05', viewRates: ['FB', 'RO'] },
  { name: 'Standard Rate', price: 'USD 131.00', viewRates: ['RO', 'BB'] },
]

//  <RoomRates viewRates={rooms[0].viewRates} />

export default function BookingPage() {
  const [expandedRoom, setExpandedRoom] = useState(null)

  const toggleRoomRates = (roomName: any) => {
    setExpandedRoom(expandedRoom === roomName ? null : roomName)
  }

  return (
    <div className="p-8">
      {/* Search Bar */}
      <div className="flex space-x-4 mb-8">
        <select className="border p-2">
          <option>Hillroots kandy</option>
          <option>The Kingsbury</option>
          {/* Add other hotels here */}
        </select>
        <input type="date" className="border p-2" />
        <input type="date" className="border p-2" />
        <input
          type="text"
          placeholder="Promotion Code"
          className="border p-2"
        />
        <button className="bg-yellow-500 text-white p-2">Search</button>
      </div>

      {/* Rooms & Offers */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left side - Room list */}
        <div className="col-span-6">
          <h2 className="text-lg font-bold mb-4">Available Rooms & Offers</h2>
          {rooms.map((room) => (
            <div key={room.name} className="border mb-4 p-4 bg-gray-100">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{room.name}</h3>
                  <p>From: {room.price}</p>
                </div>
                <button
                  className="bg-gray-800 text-white px-4 py-2"
                  onClick={() => toggleRoomRates(room.name)}
                >
                  View Rates
                </button>
              </div>
              {expandedRoom === room.name && <RoomRates />}
            </div>
          ))}
        </div>

        {/* Right side - Room details */}
        <div className="col-span-6">
          <h2 className="text-lg font-bold mb-4">Property Details</h2>
          <img src="img/room5.jpg" alt="Room" className="mb-4" />
          <div className="grid grid-cols-4 gap-2">
            {/* Placeholder for room images */}
            <img src="/img/aboutn.jpg" alt="Room" />
            <img src="/img/Capture.jpg" alt="Room" />
            <img src="img/Capture4.jpg" alt="Room" />
            <img src="img/Capture7.jpg" alt="Room" />
          </div>
        </div>
      </div>
      <div>
        <GuestInformationForm />
      </div>
    </div>
  )
}
