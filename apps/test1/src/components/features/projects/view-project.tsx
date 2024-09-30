'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { useEffect, useState } from 'react'
import { DeleteProjects, SelectAllProjects } from './project-action'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

export default function ProjectList() {
  const [projects, setProjects] = useState<any>([])
  const [searchId, setSearchId] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchType, setSearchType] = useState('all')
  const [searchDate, setSearchDate] = useState('')

  const router = useRouter()

  useEffect(() => {
    SelectAllProjects().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array

        setProjects(reversedData) // Set the reversed array to state
      } else {
        console.log('error')
      }
    })
  }, [])

  const handleEdit = (pid: number) => {
    router.push(`/projects/${pid}`)
  }

  const deleteAction = async (id: number) => {
    if (id) {
      await DeleteProjects(Number(id))
      toast({
        className: 'text-blue-600',
        title: 'Project',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })
      SelectAllProjects().then((response) => {
        if (response.success) {
          console.log(response.data)
          setProjects(response.data)
        } else {
          console.log('error')
        }
      })

      router.push('/projects')
    }
  }
  const AddNew = () => {
    router.push(`/projects/add`)
  }

  //search project
  const handleSearchChangeID = (e) => {
    setSearchId(e.target.value)
  }
  const handleSearchChangeName = (e) => {
    setSearchName(e.target.value)
  }
  const handleSearchChangeType = (e) => {
    setSearchType(e.target.value)
  }
  const handleSearchChangeDate = (e) => {
    setSearchDate(e.target.value)
  }

  const filteredProjects = projects.filter((project) => {
    // Check if the project type matches the search type or if "all" is selected
    const matchesProjectType =
      searchType === 'all' ||
      project.ptype.toLowerCase() === searchType.toLowerCase()

    // Check if the project ID, name, and date match the search criteria
    const matchesSearchCriteria =
      project.pid.toString().includes(searchId) &&
      project.pname.toLowerCase().includes(searchName.toLowerCase()) &&
      project.prdate.includes(searchDate)

    // Return true only if all conditions are met
    return matchesProjectType && matchesSearchCriteria
  })

  //...
  return (
    <>
      <div className="ml-5 mt-20 text-xl font-semibold">
        <div className="flex">
          <h1 className="text-3xl font-bold pb-3">Projects</h1>
          <Button
            onClick={AddNew}
            type="button"
            className="lg:ml-[80%]  h-9  text-white bg-green-600"
          >
            +Add New
          </Button>
        </div>
        <hr className="bg-green-400 h-0.5" />

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-4 gap-16 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[80%]">
            <div className="flex flex-col-2 gap-3 lg:w-[60%] ">
              <label className="font-extralight text-sm mt-2">No</label>
              <Input
                type="search"
                className="pl-3 pr-3 py-2 border border-gray-300 "
                placeholder=""
                value={searchId}
                onChange={handleSearchChangeID}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-48">
                Project Name
              </label>
              <Input
                type="search"
                className="pl-8 pr-3 py-2 border border-gray-300 "
                placeholder=""
                value={searchName}
                onChange={handleSearchChangeName}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 lg:w-[40%]">
                Reg: Date
              </label>
              <Input
                type="date"
                className="pl-1 pr-3 py-2 border border-gray-300 "
                placeholder=""
                value={searchDate}
                onChange={handleSearchChangeDate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 pl-12 pr-4 border-green-300">
        <Table className="rounded-xl border border-green-300 overflow-hidden">
          <TableHeader className="bg-green-200 text-center border border-green-300">
            <TableRow>
              <TableHead className="text-center px-4 py-2">
                Project No
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Project Owner
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Project Name
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Estimate Budget
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Project Re:Date
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Project End Date
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Description
              </TableHead>
              <TableHead className="text-center px-4 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-green-50">
            {filteredProjects.map((project, index) => (
              <TableRow
                key={index}
                className={
                  index % 2 === 0 ? 'hover:bg-green-100' : 'hover:bg-green-100'
                }
              >
                <TableCell className="text-center px-4 py-2">
                  {project.pid}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {project.powner}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {project.pname}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {project.estibudget}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {project.prdate}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {project.pdate}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {project.pdescription}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  <div className="flex gap-5 ml-2">
                    <div>
                      <Button
                        onClick={() => handleEdit(project.pid)}
                        className="bg-green-600"
                      >
                        Edit
                      </Button>
                    </div>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button className="ml-5 bg-green-600 bg-destructive">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteAction(project.pid)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
