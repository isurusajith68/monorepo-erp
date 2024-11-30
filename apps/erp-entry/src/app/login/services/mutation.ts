import { useMutation } from '@tanstack/react-query'
import Axios from 'axios'

const useMuate = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await Axios.post(`${apiUrl}login`, data)
      console.log('res111', response)
      return response
    },
  })
}

export default useMuate
