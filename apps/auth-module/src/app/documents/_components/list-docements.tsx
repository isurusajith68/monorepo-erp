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

export default function ListDocements() {
  const { data } = useGetDocuments()

  return (
    <div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold ml-10 mt-6 w-[180px]">
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
        <div className="m-10 ">
          <Table className="rounded-md overflow-hidden">
            <TableCaption className="pt-4">
              List of your sysem docements.
            </TableCaption>
            <TableHeader className="bg-blue-400">
              <TableRow className="justify-center">
                <TableHead className="w-[10%] text-center text-black">
                  ID
                </TableHead>
                <TableHead className="w-[30%] text-center text-black">
                  DOCUMENT
                </TableHead>
                <TableHead className="w-[30%] text-center text-black">
                  DESCRIPTION
                </TableHead>
                <TableHead className="w-[30%] text-center text-black">
                  MODULE
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data &&
                data.documents.map((document, index) => (
                  <TableRow key={document.docid}>
                    <TableCell className="font-medium text-center">
                      {document.docid}
                    </TableCell>
                    <TableCell className="text-center">
                      {document.docname}
                    </TableCell>
                    <TableCell className="text-center">
                      {document.description}
                    </TableCell>
                    <TableCell className="text-center">
                      {document.modname}
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
