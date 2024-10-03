import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export function useGetRegistrations(id: any | undefined) {
  return useQuery({
    queryKey: ['registration', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`http://localhost:4000/registration/${id ?? 0}`)
      return data1.data.data
    },
  })
}

export function useGetAllRegisrations() {
  // const bapi = import.meta.env.VITE_API_BOOKINGAPI
  // console.log("first",id)
  return useQuery({
    queryKey: ['allregistration'],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`http://localhost:4000/allregistration`)
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}

export function useGetPrevRegistration(id: string | undefined) {
  const bapi = import.meta.env.VITE_API_BOOKINGAPI
  // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
  return useQuery({
    queryKey: ['prev', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(
        `http://localhost:4000/registration/prev/${id ?? 0}`,
      )
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
export function useGetNextRegistraion(id: string | undefined) {
  const bapi = import.meta.env.VITE_API_BOOKINGAPI
  // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
  return useQuery({
    queryKey: ['next', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(
        `http://localhost:4000/registration/next/${id ?? 0}`,
      )
      // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
      return data1.data.data
    },
  })
}
