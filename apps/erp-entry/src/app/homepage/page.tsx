import { Button } from '@/components/ui/button'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  const [data, setData] = useState('')

  const getData = async () => {
    const response = await Axios.get('http://localhost:10000/getData', {
      withCredentials: true, // This ensures cookies are sent with the request
    })
    console.log('first')
    setData(response.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-green-500  to-white-500">
      <h1 className="text-6xl font-extrabold text-white mb-10">Ceyinfo ERP</h1>
      {/* <p>{data}</p> */}
      <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={() => {
          navigate('login')
        }}
      >
        Login
      </button>
    </div>
  )
}
