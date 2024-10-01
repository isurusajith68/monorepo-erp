import { Toaster } from '@/components/ui/toaster'
import { router } from './routes'
import { RouterProvider } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Toaster />
      {/* initialize browser router */}
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}
