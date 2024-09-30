import {
  MutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateBookingMutation = () => {
  const bapi = import.meta.env.VITE_API_BOOKINGAPI
  console.log('aaaqqq', bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: any) => {
      console.log('paramsss', params.dirtyValues)
      console.log('paramsss', bapi + params.id)

      try {
        const res = await axios.put(`${bapi}${params.id}`, params.dirtyValues)
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
  console.log('aaaqqq', bapi)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: any) => {
      console.log('paramsss', params.dirtyValues)
      console.log('paramsss', bapi + params.id)

      try {
        const res = await axios.put(`${bapi}${params.id}`, params.dirtyValues)
        return res
      } catch (error) {
        console.error('Error in API call:', error)
        throw error
      }
    },
  })
}
