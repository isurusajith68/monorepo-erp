import React from 'react'


function RoomPage({rooms} : {rooms:any}) {
  return (
    <div>
         <section id='room' className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <div className="mb-10">
           <div className='flex ml-[45%]'>
           <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2 mr-2"></div>
            <h2 className="text-l font-semibold text-yellow-500 uppercase">Our Rooms</h2>
            <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2"></div>
           </div>
            <p className="text-4xl font-bold  mt-4">Explore Our Rooms</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-5 mr-5">
            {rooms.map((room:any, index:any) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={room.imageUrl} alt={room.roomtitle} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-yellow-500 font-bold text-lg">{room.roomprice}/Night</span>
                    <div className="flex items-center">
                      {[...Array(room.rating)].map((_, i) => (
                        <i key={i} className="fa fa-star text-yellow-500"></i>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{room.roomtitle}</h3>
                  <ul className="flex space-x-4 text-gray-600 mt-4">
                    <li><i className="fa fa-bed"></i> {room.roombeds} Bed</li>
                    <li><i className="fa fa-bath"></i> {room.roombath} Bath</li>
                    {room.otherfacility && (
                      <li><i className="fa fa-wifi"></i> {room.otherfacility}</li>
                    )}
                  </ul>
                  <p className="text-gray-600 mt-4">
                    {room.roomsdescription}
                  </p>
                  <div className="flex justify-between mt-6">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                      View Detail
                    </button>
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default RoomPage