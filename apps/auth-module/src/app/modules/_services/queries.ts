import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useGetModules = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}getmodules`)
      console.log('response', response)
      return response.data
    },
  })
}
