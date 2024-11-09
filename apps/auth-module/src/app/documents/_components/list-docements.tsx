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
import { useState } from 'react'
import Navbar from '@/components/commonUi/navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetModules } from '@/app/modules/_services/queries'
import useHotelIdStore from '@/app/stores/modules-store'

export default function ListDocuments() {
  const { hotelid } = useHotelIdStore()

  const { data } = useGetDocuments(hotelid)

  const [searchTerm, setSearchTerm] = useState('')
  const { data: modules } = useGetModules(hotelid)

  return (
    <div className="mx-[10%]  ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        {/* Tab Buttons */}
        <Navbar />
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold ml-10 mt-6 w-[220px]">
            Documents List
          </p>

          <div className="flex justify-end w-full mr-10 mt-6">
            {/* <div className="relative">
              <FaUserCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Search by Module Name"
                className="border rounded-full pl-10 pr-4 py-2 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div> */}

            {/* Module Select */}
            <div className="w-[20%] ">
              <Select
                onValueChange={(value) => {
                  setSearchTerm(value)
                }}
              >
                <SelectTrigger className="border-2">
                  <SelectValue placeholder="Select Module" />
                </SelectTrigger>
                <SelectContent>
                  {modules?.modules.map((module) => (
                    <SelectItem key={module.modid} value={module.modname}>
                      {module.modname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="m-10">
          <Table className="rounded-lg w-[100%]">
            <TableCaption className="pt-4">
              List of your system documents.
            </TableCaption>

            <TableBody>
              {data &&
                Object.keys(data).map((modname, index) => {
                  const rows = data[modname].filter((row) =>
                    row.modname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  )

                  if (rows.length === 0) return null // Skip empty results**************************

                  return (
                    <div key={index}>
                      <p className="uppercase text-xl mb-6">{modname}</p>
                      <TableHeader className="bg-blue-400 ">
                        <TableRow>
                          <TableHead className="w-[20%] text-center text-black">
                            ID
                          </TableHead>
                          <TableHead className="w-[20%] text-center text-black">
                            DOCUMENT
                          </TableHead>
                          <TableHead className="w-[20%] text-center text-black">
                            DESCRIPTION
                          </TableHead>
                          {/* <TableHead className="w-[50%] text-center text-black">
                            MODULE
                          </TableHead> */}
                        </TableRow>
                      </TableHeader>

                      {rows.map((row) => (
                        <TableRow key={row.docid}>
                          <TableCell className="font-medium text-center">
                            {row.docid}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.docname}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.description}
                          </TableCell>
                          {/* <TableCell className="text-center">
                            {row.modname}
                          </TableCell> */}
                        </TableRow>
                      ))}
                    </div>
                  )
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
