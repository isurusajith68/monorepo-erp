import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
      <div className="w-full flex float-start ">
        <p className="text-4xl p-2">nav bar</p>
      </div>
      <Outlet></Outlet>
    </div>
  )
}
