import { useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { FaCheckCircle, FaChevronRight } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

const features = [
  {
    title: 'Admin Application',
    description: 'Comprehensive admin controls and user management',
    icon: <Icons.admin />,
    popdescription:
      'This app is designed to secure access toq systems and documents by providing robust authentication, user role management, and permission settings.',
    list: {
      item1: 'User Role Management',
      item2: 'Permission Controls',
      item3: 'Document Viewing and Access',
    },
  },
  {
    title: 'Finance Management',
    description: 'Complete financial tracking and reporting',
    icon: <Icons.finance />,
    popdescription:
      'This app is designed to simplify financial tasks for hotels, providing an easy way to manage invoices, track purchases, and control expenses.',
    list: {
      item1: 'Invoice Management',
      item2: 'Purchase Tracking',
      item3: 'Expense Management',
      item4: 'Financial Reporting',
    },
  },
  {
    title: 'Authentication',
    description: 'Manage permission',
    icon: <Icons.authentication />,
    popdescription:
      'This app is designed to secure access toq systems and documents by providing robust authentication, user role management, and permission settings.',
    list: {
      item1: 'User Role Management',
      item2: 'Permission Controls',
      item3: 'Document Viewing and Access',
    },
  },
  {
    title: 'Booking Application',
    description: 'Comprehensive admin controls and user management',
    icon: <Icons.booking />,
    popdescription:
      'This app streamlines hotel operations by combining room booking, guest registration, and front office management. It provides a central platform for handling reservations, guest check-ins and check-outs, and other essential front desk functions to ensure seamless service and an excellent guest experience.',
    list: {
      item1: 'Room Booking',
      item2: 'Guest Registration',
      item3: 'Front Desk Management',
    },
  },
  {
    title: 'Inventory Control',
    description: 'Inventory tracking and management',
    icon: <Icons.inventory />,
    popdescription:
      'This app is designed to streamline inventory operations by centralizing item management, request processing, and store management.It provides an efficient way to track stock levels, handle item requests',
    list: {
      item1: 'Item Addition',
      item2: 'Item Request Management',
      item3: 'Store Management',
    },
  },
  {
    title: 'Web Templates',
    description: 'Customize web templates',
    icon: <Icons.templates />,
  },
  {
    title: 'HR Management',
    description: 'Human resources management',
    icon: <Icons.templates />,
    popdescription:
      'This app centralizes human resource functions, including staff management, attendance tracking, and leave management.',
    list: {
      item1: 'Staff Management',
      item2: 'Attendance Tracking',
      item3: 'Leave Management',
      item4: 'Reports',
    },
  },
]

export function ServiceDetails() {
  const [selectedFeature, setSelectedFeature] = useState(null)

  const handleCardClick = (feature: any) => {
    setSelectedFeature(selectedFeature === feature ? null : feature)
  }

  return (
    <div className="p-6 text-center" id="test">
      <h2 className="text-3xl font-bold">
        Powerful Features For Your Hotel System
      </h2>
      <p className="text-gray-600 mt-2">
        Discover our comprehensive suite of tools designed to streamline hotel
        operations and elevate productivity across every department.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {features.map((feature: any, index) => (
          <Popover key={index} open={selectedFeature === feature}>
            <PopoverTrigger asChild>
              <Card
                onClick={() => handleCardClick(feature)}
                className="cursor-pointer p-4 bg-blue-100 hover:bg-blue-200 transition duration-300 transform hover:scale-105"
              >
                <CardHeader className="flex items-center space-x-2">
                  {feature.icon}
                  <CardTitle className="text-lg font-medium">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </PopoverTrigger>
            {selectedFeature === feature && (
              <PopoverContent className="bg-white p-4 rounded-md shadow-md animate-fade-in-up w-[750px] ">
                <h3 className="text-lg font-bold text-center">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.popdescription}</p>
                <ul className="ml-5 ">
                  {feature.list?.item1 && (
                    <li className="flex items-center ">
                      <FaCheckCircle className="text-green-400 h-5 w-5 mr-2" />
                      {feature.list?.item1}
                    </li>
                  )}
                  {feature.list?.item2 && (
                    <li className="flex items-center ">
                      <FaCheckCircle className="text-green-400 h-5 w-5 mr-2" />
                      {feature.list?.item2}
                    </li>
                  )}
                  {feature.list?.item3 && (
                    <li className="flex items-center ">
                      <FaCheckCircle className="text-green-400 h-5 w-5 mr-2" />
                      {feature.list?.item3}
                    </li>
                  )}
                  {feature.list?.item4 && (
                    <li className="flex items-center ">
                      <FaCheckCircle className="text-green-400 h-5 w-5 mr-2" />
                      {feature.list?.item4}
                    </li>
                  )}
                  {feature.list?.item5 && (
                    <li className="flex items-center ">
                      <FaCheckCircle className="text-green-400 h-5 w-5 mr-2" />
                      {feature.list?.item5}
                    </li>
                  )}
                </ul>
                <Button
                  variant="outline"
                  className="mt-4 w-full bg-blue-300 hover:bg-blue-400"
                  onClick={() => setSelectedFeature(null)}
                >
                  Close
                </Button>
              </PopoverContent>
            )}
          </Popover>
        ))}
      </div>
    </div>
  )
}
