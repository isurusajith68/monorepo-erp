import LoginForm from '@/app/login/components/loginForm'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePageScreen() {
  const navigate = useNavigate()

  const [data, setData] = useState('')

  // const getData = async () => {
  //   const response = await Axios.get('http://localhost:10000/getData', {
  //     withCredentials: true, // This ensures cookies are sent with the request
  //   })
  //   setData(response.data)
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div className="flex  h-screen bg-gradient-to-r from-blue-600 to-cyan-200 ">
      <div className="w-7/12 p-6 ml-10 mt-[200px]">
        <h1 className="text-5xl font-extrabold text-white mb-10">
          Welcome to Ceyinfo ERP
        </h1>
        <p className="text-lg text-blue-100 max-w-md text-center transition-opacity duration-1000 ease-in-out">
          Manage your business operations efficiently with . Tailored for your
          unique needs and scalable as you grow.
        </p>
      </div>

      <div className="w-5/12 ">
        {/* <button
          className="h-[7%] bg-gradient-to-r from-blue-800 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            navigate('login')
          }}
        >
          Login
        </button> */}

        <LoginForm />
      </div>
    </div>
  )
}

// import { Button } from '@/components/ui/button'
// import Axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export default function HomePageScreen() {
//   const navigate = useNavigate()

//   const [data, setData] = useState('')

//   const getData = async () => {
//     const response = await Axios.get('http://localhost:10000/getData', {
//       withCredentials: true, // This ensures cookies are sent with the request
//     })
//     console.log('first')
//     setData(response.data)
//   }

//   useEffect(() => {
//     getData()
//   }, [])

//   return (
//     <div className="flex h-screen">
//       {/* Left Section */}
//       <div className="w-1/2 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 flex flex-col justify-center items-center">
//         <h1 className="text-6xl font-extrabold text-white mb-5">
//           Welcome to Ceyinfo ERP
//         </h1>
//         <p className="text-lg text-blue-100 max-w-md text-center">
//           Manage your business operations efficiently with Ceyinfo ERP. Tailored
//           for your unique needs and scalable as you grow.
//         </p>
//       </div>

//       {/* Right Section */}
//       <div className="w-1/2 bg-gradient-to-r from-blue-500 via-blue-300 to-white flex flex-col justify-center items-center">
//         <button
//           className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl mb-6"
//           onClick={() => {
//             navigate('login')
//           }}
//         >
//           Login
//         </button>
//         <p className="text-sm text-gray-600">
//           Don't have an account?{' '}
//           <span
//             onClick={() => navigate('signup')}
//             className="text-blue-600 cursor-pointer hover:underline"
//           >
//             Sign up here
//           </span>
//         </p>
//       </div>
//     </div>
//   )
// }
