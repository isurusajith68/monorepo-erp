import { useQuery } from '@tanstack/react-query'
import { getBookings } from './api'

export function useTodosIds() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getBookings,
  })
}
