'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { use, useState } from 'react'
import { InputWithIcon } from '@/components/ui/input-with-icon'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { loginUser, registerUser } from '@/components/features/auth/auth-action'
import { NextResponse } from 'next/server'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const FormSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { success, message } = await registerUser(
        data.username,
        data.email,
        data.password,
      )
      if (success) {
        toast({ title: 'Register successful' })
        //navigate
        router.push('/login')
      } else {
        toast({ title: 'Register failed', description: message })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Something went wrong.' })
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className=" bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h2 className="  text-3xl font-extrabold text-gray-900">
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
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
