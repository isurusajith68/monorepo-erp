import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'
// const bapi = import.meta.env.VITE_API_BOOKINGAPI

export function useGetAllRoom() {
  // console.log("first",id)
  return useQuery({
    queryKey: ['room'],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`http://localhost:4000/lib`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1
    },
  })
}
