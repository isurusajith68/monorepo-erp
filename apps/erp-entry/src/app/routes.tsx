import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import RootLayout from './layout'
import SignUp from './signup/page'
import Login from './login/page'
import HomePage from './homepage/page'
import Dashboard from './dashboard/page'
import ProtectedRoute from './protectedRoutes/page'

// create a browserRouter
export const router = createBrowserRouter(
  createRoutesFromElements(
    // wrap two childs inside the rootLayout
    //  <Route path="/" element={<RootLayout />}>
    <Route path="/">
      <Route index element={<HomePage />}></Route>{' '}
      {/* This defines the default child route under the root (/). */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/" element={<RootLayout />}>
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/loginl" element={<Navigate to="/login" />}></Route>
        </Route>
      </Route>
      {/* this is a public route */}
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Route>,
  ),
)
