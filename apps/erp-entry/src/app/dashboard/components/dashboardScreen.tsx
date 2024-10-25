import { toast } from '@/hooks/use-toast'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  useGetPermittedModules,
  useGetUserPermission,
} from '../services/queries'
import useModuleStore from '@/app/stores/modules-store'

export default function DashboardScreen() {
  const navigate = useNavigate()
  const [data, setData] = useState('')

  const { addModules } = useModuleStore()

  const { rid } = useParams()

  const { data: permissions } = useGetUserPermission(rid)
  const { data: modules } = useGetPermittedModules(rid)

  useEffect(() => {
    addModules(modules)
  }, [modules])

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

      {/* Main Content */}
      <div className="w-full bg-gray-50 p-10">
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
