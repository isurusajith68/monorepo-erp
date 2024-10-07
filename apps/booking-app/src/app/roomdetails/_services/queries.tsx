import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'
const bapi = import.meta.env.VITE_API_BOOKINGAPI

export function useGetRoomDetails(id: string | undefined) {
  // console.log("first",id)
  return useQuery({
    queryKey: ['roomdetails', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}roomdetails/${id ?? 0}`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
export function useGetAllRoomDetails() {
  // console.log("first",id)
  return useQuery({
    queryKey: ['allroomdetails'],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}roomdetails`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
