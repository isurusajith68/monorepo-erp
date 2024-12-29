import { create } from 'zustand'

// let timeZone;

export const useTimeStore = create((set) => ({
  timeZone: 'Asia/Colombo',
  // setTimeZone: () => set(( ) => ({ timeZone: 'Asia/Colombo' })),
  setTimeZone: (newtimezone) => set({ timeZone: newtimezone }),
}))
