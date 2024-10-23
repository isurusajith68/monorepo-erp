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
import Navbar from '@/components/commonUi/navbar'

export default function ListDocements() {
  const { data } = useGetDocuments()

  return (
    <div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        {/* Tab Buttons */}
        <Navbar />
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold ml-10 mt-6 w-[220px]">
            Docements List
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
        <div className="m-10  ">
          <Table className="rounded-lg w-[100%]   ">
            <TableCaption className="pt-4">
              List of your sysem docements.
            </TableCaption>

            <TableBody>
              {data &&
                Object.keys(data).map((modname, index) => {
                  const rows = data[modname]

                  return (
                    <div>
                      <div key={index}>
                        <p className="uppercaseb text-xl mb-6">{modname}</p>
                        <TableHeader className="bg-blue-400  w-[200%]   ">
                          <TableRow>
                            <TableHead className="w-[30%]  text-center text-black">
                              ID
                            </TableHead>
                            <TableHead className="w-[40%]   text-center text-black  ">
                              DOCUMENT
                            </TableHead>
                            <TableHead className=" w-[30%]   text-center text-black">
                              DESCRIPTION
                            </TableHead>
                            <TableHead className="w-[50%]    text-center text-black">
                              MODULE
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        {rows.map((row) => (
                          <TableRow key={row.docid} className=" ">
                            <TableCell className="  font-medium text-center">
                              {row.docid}
                            </TableCell>
                            <TableCell className="  text-center">
                              {row.docname}
                            </TableCell>
                            <TableCell className=" text-center">
                              {row.description}
                            </TableCell>
                            <TableCell className=" text-center">
                              {row.modname}
                            </TableCell>
                          </TableRow>
                        ))}
                      </div>
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
