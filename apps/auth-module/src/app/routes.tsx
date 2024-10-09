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
import Test from './testfile/page'
import TanstackForm from './role/_components/form-role-tan'

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
      <Route path="/test" element={<Test />}></Route>
      <Route path="/tform" element={<TanstackForm />}></Route>
      {/* this is a public route */}
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Route>,
  ),
)
