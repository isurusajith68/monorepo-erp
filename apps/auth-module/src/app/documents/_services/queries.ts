import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useGetDocuments = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}getdocuments`)
      //console.log('response11', response)

      const grouped = Object.groupBy(response.data.documents, (d) => d.modname)
      //console.log("grouped",grouped)

      return grouped
    },
  })
}
