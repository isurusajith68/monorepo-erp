//this is for empployee

import {
  MutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateEmployeeMutation = () => {
  const bapi = import.meta.env.VITE_API_EMPLOYEEAPI
  const queryClient = useQueryClient()
  console.log('sewwwwwwwwwwwwwwwwwwwwwwwwww')

  return useMutation({
    mutationFn: async (params: any) => {
      // console.log("paramsss",params.dirtyValues )
      // console.log("paramsss",bapi + params.id)
      console.log('sewwwwwwwwwwwwwwwwwwwwwwwwww', params)

      try {
        const res = await axios.put(
          `http://localhost:4000/employee/${params.id}`,
          params.dirtyValues,
        )
        // console.log("ressssssssssssssssssssssss",res)
        return res
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}

export const useInsertEmployeeMutation = () => {
  // const bapi = import.meta.env.VITE_API_EMPLOYEEAPI
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      // console.log("helloooooo",data.data )
      // console.log("geeth",bapi + params.data.id)

      try {
        const res = await axios.post(`http://localhost:4000/emp`, data.data)
        // console.log("ressssssssssssssssssssssss",res.data)
        return res.data
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}

export const useDeleteEmployeeMutation = () => {
  const bapi = import.meta.env.VITE_API_EMPLOYEEAPI
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const res = await axios.delete(`${bapi}delete/${data.id}`, data.id)

        return res.data
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}
