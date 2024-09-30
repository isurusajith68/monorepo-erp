'use client'
import { useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'
import { handleGoogleCallback } from '@/components/features/auth/auth-action'
import { toast } from '@/components/ui/use-toast'

export default function GoogleCallback() {
  const router = useRouter()
  const hasRunRef = useRef(false)

  useEffect(() => {
    // Prevent running the effect more than once
    if (hasRunRef.current) return
    hasRunRef.current = true

    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      if (code) {
        try {
          const { success, message } = await handleGoogleCallback(code)

          if (success) {
            router.push('/dashboard')
            toast({
              title: 'Login successful',
            })
          } else {
            router.push('/login')
            toast({
              title: 'Login failed',
              description: 'you are not authorized',
              variant: 'destructive',
            })
          }
        } catch (err) {
          console.error('Error during login:', err)
          router.push('/login')
        }
      } else {
        router.push('/login')
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}
