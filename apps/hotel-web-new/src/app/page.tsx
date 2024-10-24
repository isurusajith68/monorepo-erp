import { RouterProvider } from 'react-router-dom'
import { router } from './router'
// import Axios from "axios";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
