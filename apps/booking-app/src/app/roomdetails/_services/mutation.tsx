import {
  MutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
const bapi = import.meta.env.VITE_API_BOOKINGAPI

export const useUpdateRoomDetailsMutation = () => {
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: any) => {
      try {
        const res = await axios.put(
          `${bapi}roomdetails/${params.id}`,
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

export const useInsertRoomDetailsMutation = () => {
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      // console.log("helloooooo",data.data )
      // console.log("geeth",bapi + params.data.id)

      try {
        const res = await axios.post(`${bapi}roomdetails`, data.data)
        // console.log("ressssssssssssssssssssssss",res.data)
        return res.data
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}
