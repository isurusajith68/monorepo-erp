import { useQuery } from '@tanstack/react-query'
import { getBookings } from './api'
import Axios from 'axios'

export function useGetBooking(id: string | undefined) {
  const bapi = import.meta.env.VITE_API_BOOKINGAPI
  // console.log("first",id)
  return useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}${id ?? 0}`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
export function useGetPrevBooking(id: string | undefined) {
  const bapi = import.meta.env.VITE_API_BOOKINGAPI
  // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
  return useQuery({
    queryKey: ['prev', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}prev/${id ?? 0}`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
export function useGetNextBooking(id: string | undefined) {
  const bapi = import.meta.env.VITE_API_BOOKINGAPI
  // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
  return useQuery({
    queryKey: ['next', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}next/${id ?? 0}`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
