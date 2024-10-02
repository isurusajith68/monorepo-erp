import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import RootLayout from './layout'
import HomePage from './homepage/page'
import Role from './role/page'

// create a browserRouter
export const router = createBrowserRouter(
  createRoutesFromElements(
    // wrap two childs inside the rootLayout
    // <Route path="/" element={<RootLayout />}>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />}></Route>
      {/* This defines the default child route under the root (/). */}
      {/* <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route> */}
      <Route path="/role" element={<Role />}></Route>

      {/* this is a public route */}
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Route>,
  ),
)
