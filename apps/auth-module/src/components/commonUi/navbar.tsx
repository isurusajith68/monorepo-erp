import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation() // Get current path

  const tabs = [
    { item: 'User Role List', route: '/roles' },
    { item: 'Module List', route: '/modules' },
    { item: 'Document List', route: '/documents' },
    { item: 'Action List', route: '/actions' },
    { item: 'Permission', route: '/permission' },
  ]

  return (
    <div className="">
      <div className="border-2 border-blue-200 shadow-sm m-6 p-4 rounded-md flex justify-center space-x-10">
        {tabs.map((tab) => (
          <Button
            key={tab.item}
            className={`px-8 py-2 rounded-full ${
              location.pathname === tab.route ? 'bg-blue-600' : 'bg-blue-900'
            } text-white`}
            onClick={() => navigate(tab.route)}
          >
            {tab.item}
          </Button>
        ))}
      </div>
    </div>
  )
}
