import { toast } from '@/hooks/use-toast'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function DashboardScreen() {
  const navigate = useNavigate()
  const [data, setData] = useState('')

  const logout = async () => {
    const response = await Axios.get('http://localhost:10000/logout', {
      withCredentials: true,
    })

    if (response.data.success) {
      toast({
        title: 'Logout successful',
        description: response.data.message,
      })
      window.localStorage.clear()
      navigate('/')
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-2/12 bg-slate-300 shadow-lg text-white flex flex-col justify-start items-start p-5">
        <h2 className="text-2xl font-bold mb-6">App Modules</h2>
        <button
          className="w-full text-left bg-blue-700 text-white py-2 px-4 mb-4 rounded hover:bg-blue-600 transition"
          onClick={() => window.open('http://localhost:5173/')}
        >
          Auth Module
        </button>
        <button
          className="w-full text-left bg-blue-700 text-white py-2 px-4 mb-4 rounded hover:bg-blue-600 transition"
          onClick={() => window.open('https://acc.ceyinfo.cloud/dashboard')}
        >
          Account App
        </button>
        <button
          className="w-full text-left bg-blue-700 text-white py-2 px-4 mb-4 rounded hover:bg-blue-600 transition"
          onClick={() => window.open('https://acc.ceyinfo.cloud/dashboard')}
        >
          HR App
        </button>
        <button
          className="w-full text-left bg-blue-700 text-white py-2 px-4 mb-4 rounded hover:bg-blue-600 transition"
          onClick={() => window.open('https://acc.ceyinfo.cloud/dashboard')}
        >
          Booking App
        </button>
        <button
          className="w-full text-left bg-blue-700 text-white py-2 px-4 mb-4 rounded hover:bg-blue-600 transition"
          onClick={() => window.open('https://acc.ceyinfo.cloud/dashboard')}
        >
          Admin
        </button>
        <button
          className="w-full text-left bg-red-600 text-white py-2 px-4 mt-auto rounded hover:bg-red-500 transition"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-10/12 bg-gray-100 p-10">
        <h1 className="text-4xl font-bold text-sky-600 mb-6">
          Welcome to Hotel, HILL ROOST
        </h1>
        <p>{data}</p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
          <p className="text-gray-700">
            {/* Content related to your dashboard can go here */}
            Use the sidebar to navigate through different modules.
          </p>
        </div>
      </div>
    </div>
  )
}
