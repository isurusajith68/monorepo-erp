// components/RoomList.tsx
import Image from 'next/image'

export default function RoomList({
  rooms,
  roomdescription,
}: {
  rooms
  roomdescription: any
}) {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Rooms</h2>
          <p className="mt-4 text-gray-600">
            {roomdescription.roomsdescription}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room: any, index: any) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={room.imageUrl}
                alt={room.roomtitle}
                layout="responsive"
                width={600}
                height={500}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">
                    {room.roomtitle}
                  </h3>
                  <p className="mt-1 text-white">{room.roomprice}</p>
                  {/* <div className='w-32'>
                  <p className="mt-1 text-white">{room.roomsdescription}</p>
                  </div> */}
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <button className="bg-amber-500 text-white py-2 px-4 rounded">
                  From {room.roomprice}/Night
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
