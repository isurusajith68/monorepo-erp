import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useGetDocuments = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}getdocuments`)
      console.log('response', response)

      console.log('gropedaa', response.data.documents)
      const inventory = [
        { name: 'asparagus', type: 'vegetables', quantity: 5 },
        { name: 'bananas', type: 'fruit', quantity: 0 },
        { name: 'goat', type: 'meat', quantity: 23 },
        { name: 'cherries', type: 'fruit', quantity: 5 },
        { name: 'fish', type: 'meat', quantity: 22 },
      ]

      const grouped = Object.groupBy(response.data.documents, (d) => d.modname)
      console.log('groped2222', grouped)

      return grouped
    },
  })
}
