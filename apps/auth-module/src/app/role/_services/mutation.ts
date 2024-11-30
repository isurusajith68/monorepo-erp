import { useMutation } from '@tanstack/react-query'
import Axios from 'axios'

const useMuate = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useMutation({
    mutationFn: async (newRole: any) => {
      const response = await Axios.post(`${apiUrl}addrole`, newRole)
      console.log('mute re', response)
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch
      console.log('lllll')
    },
  })
}

export default useMuate
