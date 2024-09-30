'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
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
import {
  handleGoogleCallback,
  loginUser,
  redirectToGoogleLogin,
  registerUser,
} from '@/components/features/auth/auth-action'
import { NextResponse } from 'next/server'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

const Login = () => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    const authUrl = await redirectToGoogleLogin()
    window.location.href = authUrl
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { success, message } = await loginUser(data.email, data.password)
      if (success) {
        toast({ title: 'Login successful' })
        //navigate
        router.push('/dashboard')
      } else {
        toast({
          title: 'Login failed',
          description: message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      if (code) {
        try {
          const data = await handleGoogleCallback(code)
          // setUserInfo(data);
        } catch (err) {
          // setError("Error logging in");
        }
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-lg">
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
                <>
                  <Image
                    src="https://cdn-teams-slug.flaticon.com/google.jpg"
                    className="w-6 h-6"
                    alt="google icon"
                    width={100}
                    height={100}
                  />
                  <span className="ml-2">Login with Google</span>
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="text-sm text-center">
          <span className="text-gray-600">
            Don t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Sign up
            </Link>
          </span>
        </div>
        <div className="text-sm text-center">
          <Link
            href="/forget"
            className="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
