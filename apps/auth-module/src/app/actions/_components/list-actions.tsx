import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetModules } from '@/app/modules/_services/queries'
import Navbar from '@/components/commonUi/navbar'
import { useActions, useGetDocumentsByModule } from '../_services/queries'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

export default function ListActions() {
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const { data } = useActions()
  const { data: modules } = useGetModules()
  const { data: documents } = useGetDocumentsByModule(selectedModule)

  const filteredActions = data?.actions.filter((action) => {
    return (
      (!selectedModule || action.modid === selectedModule) &&
      (!selectedDocument || action.docid === selectedDocument)
    )
  })

  return (
    <div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        {/* Tab Buttons */}
        <Navbar />
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold ml-10 mt-6 w-[150px]">
            Action List
          </p>

          <div className="flex justify-end w-full mr-10 mt-6 gap-6">
            {/* Module Select */}
            <div className="w-[20%] ">
              <Select
                onValueChange={(value) => {
                  setSelectedModule(value)
                }}
              >
                <SelectTrigger className="border-2">
                  <SelectValue placeholder="Select Module" />
                </SelectTrigger>
                <SelectContent>
                  {modules?.modules.map((module) => (
                    <SelectItem key={module.modid} value={module.modid}>
                      {module.modname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Document Select */}
            <div className="w-[20%] ">
              <Select
                onValueChange={(value) => {
                  setSelectedDocument(value)
                }}
              >
                <SelectTrigger className="border-2">
                  <SelectValue placeholder="Select Document" />
                </SelectTrigger>
                <SelectContent>
                  {documents?.documents.map((doc) => (
                    <SelectItem key={doc.docid} value={doc.docid}>
                      {doc.docname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="m-10 ">
          <Table className="rounded-md overflow-hidden">
            <TableCaption className="pt-4">
              A list of your sysem actions.
            </TableCaption>
            <TableHeader className="bg-blue-400">
              <TableRow className="justify-center">
                <TableHead className="w-[20%] text-center text-black">
                  ID
                </TableHead>
                <TableHead className="w-[40%] text-center text-black">
                  ACTION
                </TableHead>
                <TableHead className="w-[40%] text-center text-black">
                  DESCRIPTION
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredActions &&
                filteredActions.map((action, index) => (
                  <TableRow key={action.actid}>
                    <TableCell className="font-medium text-center">
                      {action.actid}
                    </TableCell>
                    <TableCell className="text-center">
                      {action.actname}
                    </TableCell>
                    <TableCell className="text-center">
                      {action.description}
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
