import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useGetModules = (hotelid: number) => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}getmodules/${hotelid}`)
      //console.log('response', response)
      return response.data
    },
  })
}
