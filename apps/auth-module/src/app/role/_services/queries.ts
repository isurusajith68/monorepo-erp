import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useGetRoles = (hotelid: number) => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}getroles/${hotelid}`)
      console.log('response useGetRoles', response)
      return response.data
    },
  })
}
