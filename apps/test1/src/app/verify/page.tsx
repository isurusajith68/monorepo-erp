'use client'
import React, {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from 'react'
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
import { toast } from '@/components/ui/use-toast'
import { verifyOTP } from '@/components/features/auth/auth-action'
import {
  otpTimeLeft,
  useForgetPasswordStore,
  useOtpSuccessStore,
} from '@/store/forgetPassword'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface VerifyOTPResponse {
  success: boolean
  message: string
}

export default function Component() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const { timeLeft, setTimeLeft } = otpTimeLeft()
  const [isExpired, setIsExpired] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { setSuccess } = useOtpSuccessStore()
  const { email } = useForgetPasswordStore()
  const router = useRouter()

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setIsExpired(true)
      toast({
        title: 'Error',
        description: 'OTP has expired. Please request a new one.',
        variant: 'destructive',
      })
    }
  }, [timeLeft])

  useEffect(() => {
    if (otp.join('').length === 6 && !isExpired) {
      handleSubmit()
    }
  }, [otp, isExpired])

  useEffect(() => {
    if (!email) {
      toast({
        title: 'Error',
        description: 'No email found',
        variant: 'destructive',
      })
      router.push('/forget')
    }
  }, [email])

  const handleChange = (
    element: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (isNaN(Number(element.target.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))])

    if (element.target.value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async () => {
    const otpString = otp.join('')

    if (isExpired) {
      toast({
        title: 'Error',
        description: 'OTP has expired. Please request a new one.',
        variant: 'destructive',
      })
      return
    }

    if (otpString.length === 6) {
      if (email) {
        const res: VerifyOTPResponse = await verifyOTP(email, otpString)

        if (res.success) {
          toast({ title: 'Success', description: res.message })
          setSuccess(true)
          router.push('/reset')
        } else {
          toast({
            title: 'Error',
            description: res.message,
            variant: 'destructive',
          })
        }
      } else {
        toast({
          title: 'Error',
          description: 'No email found. Please request OTP again.',
          variant: 'destructive',
        })
      }
    } else {
      toast({
        title: 'Error',
        description: 'Please enter a valid 6-digit OTP',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Enter OTP</CardTitle>
          <CardDescription>
            Please enter the 6-digit code sent to your email{' '}
            <span className="font-bold">{email}</span>.
            <div className="mt-1">
              <span className={isExpired ? 'text-red-500 text-xs ' : 'text-xs'}>
                {isExpired ? (
                  <>
                    OTP has expired. Please request a new one.
                    <Link
                      href="/forget"
                      className="text-blue-500 underline ml-1"
                    >
                      Resend OTP
                    </Link>
                  </>
                ) : (
                  `OTP will expire in ${timeLeft} seconds.`
                )}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex justify-between mb-6">
              {otp.map((data, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-2xl"
                  disabled={isExpired}
                />
              ))}
            </div>
            <Button
              type="button"
              className="w-full"
              disabled={isExpired || otp.join('').length !== 6}
              onClick={handleSubmit}
            >
              Verify OTP
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
