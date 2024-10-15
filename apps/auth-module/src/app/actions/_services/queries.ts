import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useActions = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['actions'],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}getactions`)
      console.log('response', response)
      return response.data
    },
  })
}

export const useGetDocumentsAll = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['documentsAll'],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}documentsall`)
      console.log('response', response)
      return response.data
    },
  })
}
