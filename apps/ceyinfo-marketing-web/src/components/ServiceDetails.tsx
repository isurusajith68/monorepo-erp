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
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

const features = [
  {
    title: 'Admin Application',
    description: 'Comprehensive admin controls and user management',
    icon: <Icons.admin />,
    pop: 'gsdsagadsgaggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
  },
  {
    title: 'Finance Management',
    description: 'Complete financial tracking and reporting',
    icon: <Icons.finance />,
  },
  {
    title: 'Authentication',
    description: 'Manage permission',
    icon: <Icons.authentication />,
  },
  {
    title: 'Booking Application',
    description: 'Comprehensive admin controls and user management',
    icon: <Icons.booking />,
  },
  {
    title: 'Inventory Control',
    description: 'Inventory tracking and management',
    icon: <Icons.inventory />,
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
  },
]

export function ServiceDetails() {
  const [selectedFeature, setSelectedFeature] = useState(null)

  const handleCardClick = (feature: any) => {
    setSelectedFeature(selectedFeature === feature ? null : feature)
  }

  return (
    <div className="p-6 text-center">
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
              <PopoverContent className="bg-white p-4 rounded-md shadow-md animate-fade-in-up w-full text-center">
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.pop}</p>
                <Button
                  variant="outline"
                  className="mt-4"
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
