import { useQuery } from '@tanstack/react-query'
import { getBookings } from './api'
import Axios from 'axios'
const bapi = import.meta.env.VITE_API_BOOKINGAPI

export function useGetBooking(id: string | undefined) {
  // console.log("first",id)
  return useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}bookings/${id ?? 0}`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
export function useGetAllBooking() {
  // console.log("first",id)
  return useQuery({
    queryKey: ['allbookings'],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}allbookings`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
export function useGetPrevBooking(id: string | undefined) {
  // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
  return useQuery({
    queryKey: ['prev', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}bookings/prev/${id ?? 0}`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
export function useGetNextBooking(id: string | undefined) {
  // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
  return useQuery({
    queryKey: ['next', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}bookings/next/${id ?? 0}`)
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
      data1 = await Axios.get(`${bapi}allroomdetails`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}

export function useGetAllRoom() {
  // console.log("first",id)
  return useQuery({
    queryKey: ['room'],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`http://localhost:4000/lib`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
