import { toast as toastify } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function useToast() {
  return {
    success: (message: string) => toastify.success(message),
    error: (message: string) => toastify.error(message),
  }
}
