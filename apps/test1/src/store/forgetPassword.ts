import { create } from 'zustand'

interface ForgetPasswordState {
  email: string
  setEmail: (email: string) => void
}

interface OtpSuccessState {
  success: boolean
  setSuccess: (success: boolean) => void
}

interface OtpTimeLeftState {
  timeLeft: number
  setTimeLeft: (timeLeft: number) => void
}

export const useForgetPasswordStore = create<ForgetPasswordState>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
}))

export const useOtpSuccessStore = create<OtpSuccessState>((set) => ({
  success: false,
  setSuccess: (success) => set({ success }),
}))

export const otpTimeLeft = create<OtpTimeLeftState>((set) => ({
  timeLeft: 0,
  setTimeLeft: (timeLeft: number) => set({ timeLeft }),
}))
