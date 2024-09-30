import axios from 'axios'

const BASE_URL = 'http://localhost:8080'
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getBookings = async () => {
  return (await axiosInstance.get('todos')).data
}
