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
import { DeleteRecipts, SelectAllRecipts } from './recipt-action'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
export default function ReciptsList() {
  const [reciept, setReciept] = useState<any>([])
  const [searchId, setSearchId] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchType, setSearchType] = useState('all')

  const router = useRouter()

  useEffect(() => {
    SelectAllRecipts().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        console.log(reversedData)
        setReciept(reversedData) // Set the reversed array to state
      } else {
        console.log('error')
      }
    })
  }, [])

  const handleEdit = (id: number) => {
    router.push(`/reciepts/${id}`)
  }

  const deleteAction = async (id: number) => {
    if (id) {
      await DeleteRecipts(Number(id))
      toast({
        className: 'text-blue-600',
        title: 'Reciept',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })
      SelectAllRecipts().then((response) => {
        if (response.success) {
          console.log(response.data)
          setReciept(response.data)
        } else {
          console.log('error')
        }
      })

      router.push('/reciepts')
    }
  }

  const AddNew = () => {
    router.push(`/reciepts/add`)
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

  const filteredRecipts = reciept.filter((reciept) => {
    // Check if the project type matches the search type or if "all" is selected
    const matchesProjectType =
      searchType === 'all' ||
      reciept.project.toLowerCase() === searchType.toLowerCase()

    // Check if the project ID, name, and date match the search criteria
    const matchesSearchCriteria =
      reciept.id.toString().includes(searchId) &&
      reciept.name.toLowerCase().includes(searchName.toLowerCase())

    // Return true only if all conditions are met
    return matchesProjectType && matchesSearchCriteria
  })
  //...
  return (
    <>
      <div className="ml-5 mt-20 text-xl font-semibold">
        <div className="flex">
          <h1 className="text-3xl font-bold pb-3">Reciepts</h1>
          <Button
            onClick={AddNew}
            type="button"
            className="lg:ml-[80%]  h-9 text-white bg-green-600"
          >
            +Add New
          </Button>
        </div>
        <hr className="bg-green-400 h-0.5" />

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-4 gap-16 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[80%]">
            <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
              <label className="font-extralight text-sm mt-2">No</label>
              <Input
                type="search"
                className="pl-3 pr-3 py-2 border border-gray-300 rounded-2xl"
                placeholder=""
                value={searchId}
                onChange={handleSearchChangeID}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2">Name</label>
              <Input
                type="search"
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-2xl"
                placeholder=""
                value={searchName}
                onChange={handleSearchChangeName}
              />
            </div>
            {/*   <div className="flex flex-col-2 gap-1 lg:w-[100%] ">
              <label className="font-extralight text-sm mt-2 lg:w-[30%]">
                P-Type
              </label>
              <Select
                onValueChange={(value) => setSearchType(value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-[200px] rounded-2xl border-2 border-gray-300 ml-2">
                  <SelectValue placeholder="Select Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>

                   Add more project types as needed 
                </SelectContent>
              </Select>
            </div>*/}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 pl-12 pr-4  border-green-300">
        <Table className="rounded-xl border border-green-300 overflow-hidden">
          <TableHeader className="bg-green-300 text-center border border-green-300">
            <TableRow>
              <TableHead className="text-center px-4 py-2">Recipt ID</TableHead>
              <TableHead className="text-center px-4 py-2">Recipt No</TableHead>
              <TableHead className="text-center px-4 py-2">Name</TableHead>
              <TableHead className="text-center px-4 py-2">
                Phone Number
              </TableHead>
              <TableHead className="text-center px-4 py-2">Email</TableHead>
              <TableHead className="text-center px-4 py-2">
                Payment Method
              </TableHead>
              <TableHead className="text-center px-4 py-2">Amount</TableHead>
              <TableHead className="text-center px-4 py-2">
                Bank Account
              </TableHead>
              <TableHead className="text-center px-4 py-2">Project</TableHead>
              <TableHead className="text-center px-4 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-green-50">
            {filteredRecipts.map((reciept, index) => (
              <TableRow key={index} className="hover:bg-green-100">
                <TableCell className="text-center px-4 py-2">
                  {reciept.id}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {reciept.rno}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {reciept.name}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {reciept.pnumber}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {reciept.email}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {reciept.pmethod}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {reciept.amount}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {reciept.baccount}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {reciept.project}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  <div className="flex gap-5 ml-2">
                    <div>
                      <Button
                        onClick={() => handleEdit(reciept.id)}
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
                              onClick={() => deleteAction(reciept.id)}
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
