import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'

export const useGetModules = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['models'],
    queryFn: async () => {
      const response = await Axios.get(`${apiUrl}getmodules`)
      //console.log('response', response)
      return response.data
    },
  })
}

export const useGetPermissions = (selectedModule, selectedRole) => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useQuery({
    queryKey: ['permissons', selectedModule, selectedRole],
    queryFn: async () => {
      const response = await Axios.get(
        `${apiUrl}getpermissons/${selectedRole}/${selectedModule}`,
      )
      console.log('response useGetPermissions', response)
      return response.data
    },
  })
}

import { useMutation } from '@tanstack/react-query'

export const useAddPermission = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  return useMutation({
    mutationFn: async (newpermission: any) => {
      const response = await Axios.post(`${apiUrl}addpermission`, newpermission)
      console.log(response)
      return response.data
    },
  })
}
