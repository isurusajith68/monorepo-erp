import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
//import { registerUser } from "./auth/auth-actions";  // Replace with your actual registerUser function
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { InputWithIcon } from '@/components/ui/input-with-icon'
import Axios from 'axios'
import { toast, useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FormSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(2, 'Password must be at least 6 characters long'),
  // role: z.string().min(1,"Role must be selected."),
})

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const { toast } = useToast()

  function onSubmit(data: any) {
    console.log('data', data)
    const registerUser = async () => {
      try {
        const response = await Axios.post(
          'http://localhost:10000/registerUser',
          data,
        )
        console.log('response.data', response)

        if (response.data.success) {
          toast({ title: 'Register successful' })
          navigate('/login') // Redirect to login page after successful registration
        } else {
          toast({
            variant: 'destructive',
            title: 'Register failed',
            description: response.data.message,
          })
        }
      } catch (err) {
        console.log('error response', err)
      }
    }

    registerUser()
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-green-300  to-white-500 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        <InputWithIcon
                          type={isVisible ? 'text' : 'password'}
                          placeholder="********"
                          {...field}
                          icon={
                            isVisible ? (
                              <EyeOff
                                size={20}
                                onClick={toggleVisibility}
                                className="cursor-pointer"
                              />
                            ) : (
                              <Eye
                                size={20}
                                onClick={toggleVisibility}
                                className="cursor-pointer"
                              />
                            )
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Acountant">Acountant</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Sign In
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
