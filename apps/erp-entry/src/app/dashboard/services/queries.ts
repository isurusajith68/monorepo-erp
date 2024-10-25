import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useGetUserPermission = (rid: any) => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['userPermissions', rid],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}userpermissions/${rid}`)
      console.log('response login q ', response)
      return response.data
    },
  })
}
export const useGetPermittedModules = (rid: any) => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['permittedModules', rid],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}permittedModules/${rid}`)
      console.log('response permittedModules', response)
      return response.data
    },
  })
}
