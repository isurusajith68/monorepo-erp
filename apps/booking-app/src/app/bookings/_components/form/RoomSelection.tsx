import React, { useState } from 'react'
import { useGetAllRoom } from '../../_services/queries'
// import { useGetAllRoom } from './queries/queries'
// import { Button } from '../ui/button'

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
  {
    name: 'Normal',
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
  {
    name: 'Suite',
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
  {
    name: 'Standard ',
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
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null)

  //--------------------------------------
  const [useSameAddress, setUseSameAddress] = useState(false)
  const [notifySpecialOffers, setNotifySpecialOffers] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

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
  const { data } = useGetAllRoom()
  console.log('first', data)

  return (
    <div>
      <header className=" top-0 z-50 flex h-14 items-center justify-center gap-4 border-b  backdrop-blur-md px-4 lg:h-[90px] lg:px-6 bg-[#89749A]">
        <div className="">
          <img src="icon.jpg" className="w-[60px] h-[80px] " />
        </div>
      </header>

      {/* jhg------------------------------------------------------------------ */}

      <div className="relative">
        {/* Background Image */}
        <div className="relative">
          <img
            src="banner.jpg"
            alt="Resort Background"
            className="w-full h-[500px] object-cover"
          />

          {/* Overlay Form */}
          <div className="absolute inset-x-0 bottom-0 bg-gray-100 bg-opacity-80 py-4">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-6 gap-4 items-center">
                {/* Property Selection */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold">
                    Property
                  </label>
                  <select className="w-full border border-gray-300 p-2 rounded">
                    <option>Hillroost Kandy</option>
                    {/* Add more options if needed */}
                  </select>
                </div>

                {/* Check-in Date */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold">
                    Check in
                  </label>
                  <input
                    type="date"
                    defaultValue="2024-10-14"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Check-out Date */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold">
                    Check out
                  </label>
                  <input
                    type="date"
                    defaultValue="2024-10-15"
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Flexible Dates */}
                <div className="col-span-1 flex items-center">
                  <input type="checkbox" id="flexibleDates" className="mr-2" />
                  <label
                    htmlFor="flexibleDates"
                    className="text-sm font-semibold"
                  >
                    Flexible Dates
                  </label>
                </div>

                {/* Adults */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold">Adults</label>
                  <select className="w-full border border-gray-300 p-2 rounded">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>

                {/* Children */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold">
                    Children
                  </label>
                  <select className="w-full border border-gray-300 p-2 rounded">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                  </select>
                </div>

                {/* Currency */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold">
                    Currency
                  </label>
                  <select className="w-full border border-gray-300 p-2 rounded">
                    <option>LKR</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>

                {/* Promo Code & Search Button */}
                <div className="col-span-2 flex flex-col justify-center">
                  <label className="block text-sm font-semibold underline cursor-pointer">
                    Use Promo Code
                  </label>
                </div>
                <div className="col-span-1">
                  <button className="bg-yellow-500 text-white py-2 px-4 rounded w-full">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* jhgjg-------------------------------------------------------------------- */}
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Hillroost Kandy (LKR)</h1>
          <div>
            <label htmlFor="currency" className="mr-2 font-bold">
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
          <div>
            <nav className="h-8 bg-red-600 items-center">
              <p className="text-white font-bold ml-5">Spence Escapes</p>
            </nav>
            <div
              key={room.name}
              className="border-b py-4 grid grid-cols-3 gap-1 "
            >
              <div className="flex items-start">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-48 h-32 object-cover"
                />
              </div>
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

              <div className="">
                {room.deals.map((deal) => (
                  <label
                    key={deal.name}
                    className="mb-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                    onClick={() => setSelectedDeal(deal.name)} // Handle deal selection
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="deal"
                        className="mr-2"
                        checked={selectedDeal === deal.name} // Control radio button state
                        onChange={() => setSelectedDeal(deal.name)} // Update state when selected
                      />
                      <p className="text-red-600 font-bold">
                        Deal: <span className="text-black ">{deal.name}:</span>
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="line-through mr-2 text-gray-400">
                        {formatPrice(deal.originalPrice)} {currency}
                      </span>
                      <span className="font-bold">
                        {formatPrice(deal.discountedPrice)} {currency}
                      </span>
                    </div>
                  </label>
                ))}
                {/* <Button > Book </Button> */}
                <div className="border border-green-500 flex items-center justify-between p-2 rounded-lg">
                  <div>{selectedDeal}</div>
                  <button className="bg-orange-300 text-black py-2 px-4 mt-4">
                    Book
                  </button>
                </div>
              </div>
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
      {/*  ------------------------------------------------------------------------------ */}

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-3 gap-8">
          {/* Your Reservation Section */}
          <div className="col-span-1 bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Your Reservation</h2>
            <div className="text-red-600 mb-2">
              <p className="font-bold">
                Deal: <span className="text-black">Breakfast Included</span>
              </p>
              <p>Superior King - 1 room</p>
              <p className="font-bold text-lg">LKR 61,250.00</p>
            </div>
            <div className="mb-4">
              <p>1 night & 2 adults</p>
              <p className="line-through">LKR 70,000.00</p>
              <p>LKR 61,250.00</p>
            </div>
            <div className="mb-4">
              <p>
                Total: <span className="font-bold">LKR 61,250.00</span>
              </p>
              <p>Included in the Rate:</p>
              <p>VAT & Service Charge: LKR 15,242.34</p>
            </div>
            <div className="text-blue-600">
              <p className="underline cursor-pointer">+ Another Request</p>
            </div>
          </div>

          {/* Guest Information Section */}
          <div className="col-span-1 bg-white p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Guest Information</h2>
            <p className="text-blue-600 underline mb-4 cursor-pointer">
              Been here before? Click here
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <select
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Country</option>
                <option value="lk">Sri Lanka</option>
                {/* Add more options as needed */}
              </select>
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </form>
          </div>

          {/* Payment Method Section */}
          <div className="col-span-1 bg-white p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <div className="flex space-x-2 mb-4">
              <img src="visa-secure.svg" alt="Visa" className="w-12" />
              <img src="master-secure.svg" alt="MasterCard" className="w-12" />
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="First and Last Name on Card"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useSameAddress}
                  onChange={() => setUseSameAddress(!useSameAddress)}
                />
                <label>Use the same address as contact information</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifySpecialOffers}
                  onChange={() => setNotifySpecialOffers(!notifySpecialOffers)}
                />
                <label>Notify me about special offers</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label>
                  I have read and agree to the{' '}
                  <a href="#" className="text-blue-600 underline">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </form>
            <p className="text-red-600 mt-4 text-sm">
              Please do not close the payment pop-up(s) until your transaction
              is completed. If you do not receive a booking confirmation via
              email, please contact the hotel directly.
            </p>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded w-full mt-4">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomSelection
