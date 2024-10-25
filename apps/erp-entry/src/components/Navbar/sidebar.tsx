import { Link } from 'react-router-dom'
import { RiHotelLine } from 'react-icons/ri'
import { MdOutlineCalculate } from 'react-icons/md'
import { FaPeopleGroup } from 'react-icons/fa6'
import { FaAddressBook } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { Home } from 'lucide-react'
import useModuleStore from '@/app/stores/modules-store'
import { useEffect, useState } from 'react'

interface Person {
  name: string
  age: number
  isStudent: boolean
}

const icons = { MdOutlineCalculate, FaPeopleGroup, FaAddressBook, Home }

// export const description =
// 'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.'

const Sidebar = ({ logout }: { logout: any }) => {
  const [module, setModule] = useState([])

  const { modules } = useModuleStore()

  useEffect(() => {
    if (modules != undefined) {
      //console.log('modules11', modules.list)

      setModule(modules.list)
      //console.log('module22', modules.list)
    }
  }, [modules])

  return (
    <div className="hidden  bg-muted/40 md:block   fixed top-0 left-0 h-full w-[220px] lg:w-[260px]  ">
      <div className="flex h-full max-h-screen flex-col ">
        <div className="flex h-14 items-center  px-4 lg:h-[60px] lg:px-6 bg-blue-400 border-r border-b">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <RiHotelLine className="w-8 h-8" />
            <span className="">ERP Entry</span>
          </Link>
        </div>
        <div className="flex-1  bg-blue-50 pt-4 flex flex-col">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 ">
            {module &&
              module.map((m: any) => {
                const IconComponent = icons[m.icon]
                return (
                  <div
                    key={m.modid}
                    className="flex   gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <button
                      className="flex w-[90%] gap-4 text-center rounded-xl   bg-blue-800 text-white py-2 px-4 mb-1  hover:bg-blue-600 transition"
                      onClick={() => window.open(`${m.url}`)}
                    >
                      {IconComponent && <IconComponent className="h-5 w-4" />}
                      {m.modname}
                    </button>
                  </div>
                )
              })}
          </nav>

          <button
            className="ml-10 text-center mb-6 w-[60%]  rounded-lg bg-red-600 text-white py-2 px-4 mt-auto  hover:bg-red-500 transition"
            onClick={() => {
              logout()
            }}
          >
            <div className="flex gap-3 items-center justify-center">
              <FiLogOut />
              Logout
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
