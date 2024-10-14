import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetDocuments } from '../_services/queries'
import { FaUserCircle } from 'react-icons/fa'
import { useEffect } from 'react'
import { useGetModules } from '@/app/modules/_services/queries'

export default function ListActions() {
  const { data } = useGetModules()

  return (
    <div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold ml-10 mt-6 w-[150px]">
            Module List
          </p>

          <div className="flex justify-end w-full mr-10 mt-6">
            <div className="relative">
              <FaUserCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Search by Module Name"
                className="border rounded-full pl-10 pr-4 py-2 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="m-10 ">
          <Table className="rounded-md overflow-hidden">
            <TableCaption className="pt-4">
              A list of your sysem modules.
            </TableCaption>
            <TableHeader className="bg-blue-400">
              <TableRow className="justify-center">
                <TableHead className="w-[20%] text-center text-black">
                  ID
                </TableHead>
                <TableHead className="w-[40%] text-center text-black">
                  MODULE
                </TableHead>
                <TableHead className="w-[40%] text-center text-black">
                  DESCRIPTION
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data &&
                data.modules.map((module, index) => (
                  <TableRow key={module.modid}>
                    <TableCell className="font-medium text-center">
                      {module.modid}
                    </TableCell>
                    <TableCell className="text-center">
                      {module.modname}
                    </TableCell>
                    <TableCell className="text-center">
                      {module.description}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
