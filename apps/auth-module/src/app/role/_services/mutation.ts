import { useMutation } from '@tanstack/react-query'
import Axios from 'axios'

const useMuate = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useMutation({
    mutationFn: async (newRole: any) => {
      const response = await Axios.post(`${apiUrl}addrole`, newRole)
      console.log(response)
      return response.data
    },
  })
}

export default useMuate
