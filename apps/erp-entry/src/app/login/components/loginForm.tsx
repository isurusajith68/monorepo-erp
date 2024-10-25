import { NavLink, useNavigate } from 'react-router-dom'
import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { useGetUser } from '../services/queries'
import useModuleStore from '@/app/stores/modules-store'

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(2, 'Password must be at least 6 characters long'),
})

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState()

  const [module, setModule] = useState([])

  const { modules } = useModuleStore()

  useEffect(() => {
    if (modules != undefined) {
      console.log('modules11', modules.list)

      setModule(modules.list)
      console.log('module22', modules.list)
    }
  }, [modules])

  const toggleVisibility = () => setIsVisible(!isVisible)

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { data: dataLogin, isFetched } = useGetUser(userData)

  const handleGoogleLogin = async () => {
    setLoading(true)
    // setTimeout(() => {
    //   setLoading(false);
    //   navigate("/dashboard");
    // }, 2000);

    navigate('/dashboard')
  }

  useEffect(() => {
    if (dataLogin && dataLogin.success) {
      toast({
        title: 'Logging successfull',
        description: dataLogin.message,
      })
      window.localStorage.setItem('loggedin', 'true')

      navigate(`/dashboard/${dataLogin.rid}`)
    } else {
      if (dataLogin) {
        toast({
          variant: 'destructive',
          title: 'Login Error',
          description: dataLogin.message,
        })
      }
    }
  }, [dataLogin])

  const onSubmit = async (data: any) => {
    const login = async () => {
      //   const response = await Axios.post('http://localhost:10000/login', data, {
      //     withCredentials: true, // This ensures cookies are sent with the request
      //   })

      setUserData(data)
      // console.log('Login response1', dataLogin)
    }

    await login()

    // navigate("/");
  }

  return (
    // <div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 sm:px-6 lg:px-8">
    <div className="flex h-screen w-full items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-slate-100 p-8 shadow-lg rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isVisible ? 'text' : 'password'}
                        placeholder="********"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {isVisible ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                'Redirecting...'
              ) : (
                <span className="ml-2">Login with Google</span>
              )}
            </Button>
          </form>
        </Form>
        <div className="text-sm text-center">
          <span className="text-gray-600">
            Don’t have an account?{' '}
            <NavLink
              to="/signup"
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Sign up
            </NavLink>
          </span>
        </div>
        <div className="text-sm text-center">
          <NavLink
            to="/forgot"
            className="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Forgot Password?
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
