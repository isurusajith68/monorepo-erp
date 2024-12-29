import { useGetAllRoomReportDetails } from '@/app/bookings/_services/queries'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function RoomSelections() {
  const { data, isLoading, error } = useGetAllRoomReportDetails()

  console.log('dddddddddddddddd', data)

  if (isLoading) return <div>Loading...</div>
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((room) => (
          <div
            key={room.roomno}
            className="p-4 bg-green-300 rounded-lg shadow-lg"
          >
            <h3 className="font-bold text-2xl">{`Room ${room.roomno}`}</h3>
            <p className="text-xl font-bold">{room.roomtype}</p>
            <p className="text-xl font-bold">{room.roomview}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-green-500 px-2 py-1 rounded font-bold">
                RO: {room.roprice}
              </span>
              <span className="bg-green-500 px-2 py-1 rounded font-bold">
                BB: {room.bbprice}
              </span>
              <span className="bg-green-500 px-2 py-1 rounded font-bold">
                HB: {room.hbprice}
              </span>
              <span className="bg-green-500 px-2 py-1 rounded font-bold">
                FB: {room.fbprice}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default RoomSelections
