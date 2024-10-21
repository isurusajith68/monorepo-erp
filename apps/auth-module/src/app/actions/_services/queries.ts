import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useActions = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['actions'],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}getactions`)
      console.log('response actions', response)
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
      console.log('response useGetDocumentsAll', response)
      return response.data
    },
  })
}

export const useGetDocumentsByModule = (selectedModule: number) => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['documentsbymodule', selectedModule],
    queryFn: async () => {
      const response = await Axios.get(
        `${apiUrl}documentsbymodule/${selectedModule}`,
      )
      console.log('response documentsbymodule', response)
      return response.data
    },
  })
}
