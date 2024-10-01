import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const isLoggedIn = window.localStorage.getItem('loggedin')
  return isLoggedIn === 'true' ? <Outlet></Outlet> : <Navigate to="/" />
}
