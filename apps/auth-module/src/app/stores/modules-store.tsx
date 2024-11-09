import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HotelIdStore {
  hotelid: number
  addHotelId: (hotelid1: number) => void
  removeAllHotelId: () => void
}

const useHotelIdStore = create(
  persist<HotelIdStore>(
    (set) => ({
      hotelid: 0,
      addHotelId: (hotelid1: number) => set({ hotelid: hotelid1 }),
      removeAllHotelId: () => set({ hotelid: 0 }),
    }),
    {
      name: 'hotel-id-storage', // Unique name for the localStorage key
      getStorage: () => localStorage, // or sessionStorage if you prefer session-based persistence
    },
  ),
)

export default useHotelIdStore
