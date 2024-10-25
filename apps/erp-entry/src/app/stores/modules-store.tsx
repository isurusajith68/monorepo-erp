import { create } from 'zustand'

const useModuleStore = create((set) => ({
  modules: [],
  addModules: (modules: any) => set({ modules: modules }),
  removeAllModules: () => set({ modules: [] }),
}))

export default useModuleStore
