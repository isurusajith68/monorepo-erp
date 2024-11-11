import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Module = {
  modules: number[]
  addModules: (modules: number[]) => void
  removeAllModules: () => void
}

const useModuleStore = create<Module>((set) => ({
  modules: [],
  addModules: (modules: number[]) => set({ modules: modules }),
  removeAllModules: () => set({ modules: [] }),
}))

export default useModuleStore

interface HotelIdStore {
  hotelid: number
  roleid: number
  setHotelId: (hotelid: number) => void
  setRoleId: (roleid: number) => void
  removeAllIds: () => void
}

export const useHotelIdStore = create(
  persist<HotelIdStore>(
    (set) => ({
      hotelid: 0,
      roleid: 0,
      setHotelId: (hotelid: number) => set({ hotelid }),
      setRoleId: (roleid: number) => set({ roleid }),
      removeAllIds: () => set({ hotelid: 0, roleid: 0 }),
    }),
    {
      name: 'hotel-id-storage', // Unique name for the localStorage key
      getStorage: () => localStorage, // or sessionStorage if you prefer session-based persistence
    },
  ),
)

// import { create } from 'zustand'
// type Module = {
//   modules: number[]
//   addModules: () => void
//   removeAllModules: () => void
// }

// const useModuleStore = create<Module>((set) => ({
//   modules: [],
//   addModules: (modules: any) => set({ modules: modules }),
//   removeAllModules: () => set({ modules: [] }),
// }))

// export default useModuleStore
