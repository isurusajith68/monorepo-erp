import { create } from 'zustand'

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
