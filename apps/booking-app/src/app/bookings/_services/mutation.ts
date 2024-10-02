import {
  MutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateBookingMutation = () => {
  const bapi = import.meta.env.VITE_API_BOOKINGAPI
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: any) => {
      // console.log("paramsss",params.dirtyValues )
      // console.log("paramsss",bapi + params.id)

      try {
        const res = await axios.put(`${bapi}${params.id}`, params.dirtyValues)
        // console.log("ressssssssssssssssssssssss",res)
        return res
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },

    // onSettled: async (_, error, variables) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     await queryClient.invalidateQueries({ queryKey: ["booking"] });
    //     await queryClient.invalidateQueries({
    //       queryKey: ["booking", { id: variables.id }],
    //     });
    //   }
    // },
  })
  // const mutation = useMutation({
  //            mutationFn: (params : any) => {
  //              return Axios.put(`${process.env.DB_NAME}${params.id}`, params.dirtyValues);
  //            },
  //          });
  //  return mutation;
}

export const useInsertBookingMutation = () => {
  const bapi = import.meta.env.VITE_API_BOOKINGAPI
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      // console.log("helloooooo",data.data )
      // console.log("geeth",bapi + params.data.id)

      try {
        const res = await axios.post(`${bapi}`, data.data)
        // console.log("ressssssssssssssssssssssss",res.data)
        return res.data
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}

export const useDeleteBookingMutation = () => {
  const bapi = import.meta.env.VITE_API_BOOKINGAPI
  // console.log("aaaqqq",bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      // console.log("helloooooo",data.data )
      // console.log("geeth",bapi + params.data.id)

      try {
        const res = await axios.delete(`${bapi}delete/${data.id}`, data.id)
        // console.log("ressssssssssssssssssssssss",res.data)
        return res.data
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}
