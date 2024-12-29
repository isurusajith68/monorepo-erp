import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
const bapi = import.meta.env.VITE_API_BOOKINGAPI

export const useUpdateRegistrationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: any) => {
      try {
        const res = await axios.put(
          `${bapi}registrations/${params.id}`,
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

//-----------------------------------------------------------------
export const useUpdateCheckinCheckoutMutation = () => {
  return useMutation({
    mutationFn: async (updatedItems: any) => {
      try {
        const res = await axios.post(
          `${bapi}update-checkin-checkout`,
          JSON.stringify({ items: updatedItems }),
          {
            withCredentials: true,
          },
        )
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}

// update checkin and checkout date finaly
export const useUpdateDateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: any) => {
      try {
        const res = await axios.put(
          `${bapi}registrations/${params.id}`,
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

//update checkin and checkout dates

export const useUpdateRegistrationDatesMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: any) => {
      console.log('params', params)

      try {
        const res = await axios.patch(`${bapi}times/${params.id}`, {
          checkinTime: params.checkinTime,
          checkoutTime: params.checkoutTime,
        })
        // console.log("ressssssssssssssssssssssss",res)
        return res
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}

export const useInsertRegistrationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const res = await axios.post(`${bapi}registration`, data.data)
        // console.log("ressssssssssssssssssssssss",res.data)
        return res.data
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}

export const useDeleteRegistrationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      console.log('helloooooo', data)
      // console.log("geeth",bapi + params.data.id)

      try {
        const res = await axios.delete(
          `${bapi}deleteRegistration/${data.id}`,
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
