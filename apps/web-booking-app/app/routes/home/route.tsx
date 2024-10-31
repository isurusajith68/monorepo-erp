import { useState } from 'react'
import CheckAvailability from './_component/check-availability'
import RoomSelection from './_component/room-section'
import GuestInfoPayment from './_component/gust-info-payment'
import ConfirmReservation from './_component/confirm'

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1) // Tracks the current step in the navigation

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Layout */}
      <div className="flex w-[100%] h-36">
        <img src="img/about-.jpg" alt="" width={305} />
        <img src="img/about-1.jpg" alt="" width={306} />
        <img src="img/about-2.jpg" alt="" width={306} />
        <img src="img/about-3.jpg" alt="" width={306} />
        <img src="img/about-4.jpg" alt="" width={306} />
      </div>
      <div className="container mx-auto py-8">
        {/* Navigation Steps */}
        <nav className="flex justify-between h-12 items-center bg-gray-200 rounded-md shadow-sm ml-14 mr-14 ">
          {[
            'Check Availability',
            'Room Selection',
            'Guest Info & Payment',
            'Confirm Reservation',
          ].map((step, index) => (
            <div
              key={index}
              onClick={() => setCurrentStep(index + 1)}
              className={`h-full font-semibold  ml-5 text-center cursor-pointer${
                currentStep === index + 1
                  ? 'bg-white text-gray-700 h-full border-t-2 border-r-2 border-orange-900'
                  : 'bg-white text-gray-700'
              }`}
            >
              {index + 1}. {step}
            </div>
          ))}
        </nav>

        {/* Content based on selected step */}
        <div className="mt-8">
          {currentStep === 1 && <CheckAvailability />}
          {currentStep === 2 && <RoomSelection />}
          {currentStep === 3 && <GuestInfoPayment />}
          {currentStep === 4 && <ConfirmReservation />}
        </div>
      </div>
    </div>
  )
}
