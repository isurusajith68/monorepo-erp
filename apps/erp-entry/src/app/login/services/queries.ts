import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useGetUser = (data: any) => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['login', data],
    queryFn: async () => {
      if (data) {
        const response = await Axios.post(`${apiUrl}login`, data)
        console.log('response login data ', response)
        return response.data
      } else {
        return null
      }
    },
  })
}
