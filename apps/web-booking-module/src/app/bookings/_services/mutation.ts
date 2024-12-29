import {
  MutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
const bapi = import.meta.env.VITE_API_BOOKINGAPI

export const useUpdateBookingMutation = () => {
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: any) => {
      try {
        console.log('params', params)

        const res = await axios.patch(`${bapi}bookings/${params.id}`, params)

        return res
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}

export const useInsertBookingMutation = () => {
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      console.log('helloooooo', data.data)
      // console.log("geeth",bapi + params.data.id)

      try {
        const res = await axios.post(`${bapi}bookinginsert`, data.data)

        return res.data
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}

export const useDeleteBookingMutation = () => {
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      // console.log("helloooooo",data.data )
      // console.log("geeth",bapi + params.data.id)

      try {
        const res = await axios.delete(
          `${bapi}bookings/delete/${data.id}`,
          data.id,
        )
        // console.log("ressssssssssssssssssssssss",res.data)
        return res.data
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}

export const useInsertGuestInformationMutation = () => {
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqq', data.data)
      // console.log("geeth",bapi + params.data.id)

      try {
        const res = await axios.post(`${bapi}guestinformation`, data.data)
        // console.log("ressssssssssssssssssssssss",res.data)
        return res.data
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}
