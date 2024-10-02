import { Button } from '@/components/ui/button'
import '@/App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <>
      {/* <h1 className='text-6xl'>hello</h1>
     <Button>hello</Button> */}
      <Toaster />
      {/* initialize browser router */}
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
