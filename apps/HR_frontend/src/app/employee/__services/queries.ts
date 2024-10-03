//this is for employee

import { useQuery } from '@tanstack/react-query'
import { getBookings } from './api'
import Axios from 'axios'

export function useGetEmployee(id: string | undefined) {
  const bapi = import.meta.env.VITE_API_EMPLOYEEAPI
  // console.log("first",id)
  return useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}${id ?? 0}`)

      return data1.data.data
    },
  })
}
export function useGetAllEmployee() {
  return useQuery({
    queryKey: ['allEmployees'],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`http://localhost:4000/allEmployees`)

      return data1.data.data
    },
  })
}
export function useGetPrevEmployee(id: string | undefined) {
  const bapi = import.meta.env.VITE_API_EMPLOYEEAPI

  return useQuery({
    queryKey: ['prev', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}prev/${id ?? 0}`)

      return data1.data.data
    },
  })
}
export function useGetNextEmployee(id: string | undefined) {
  const bapi = import.meta.env.VITE_API_EMPLOYEEAPI
  // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
  return useQuery({
    queryKey: ['next', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`${bapi}next/${id ?? 0}`)

      return data1.data.data
    },
  })
}
