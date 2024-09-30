'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { sendMail } from '@/components/features/auth/auth-action'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { otpTimeLeft, useForgetPasswordStore } from '@/store/forgetPassword'
import { Loader2 } from 'lucide-react'

export default function Component() {
  const [email, setEmailEnter] = useState('')
  const { setEmail } = useForgetPasswordStore()
  const [isLoading, setIsLoading] = useState(false)
  const { setTimeLeft } = otpTimeLeft()

  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      if (!email) {
        toast({
          title: 'Error',
          description: 'Email is required',
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      const res = await sendMail(email)

      if (res.success) {
        setEmail(email)
        setTimeLeft(60)
        router.push('/verify')

        toast({
          title: 'Success',
          description: res.message,
        })
      } else {
        toast({
          title: 'Error',
          description: res.message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.res?.message || 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we ll send you a otp to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmailEnter(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="link" onClick={() => router.push('/login')}>
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
