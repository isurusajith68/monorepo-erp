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
import { useEffect, useState } from 'react'
import { DeleteBank, SelectAllBank } from './bank-action'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
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

export default function BanksList() {
  const [bank, setBank] = useState<any>([])
  const [searchId, setSearchId] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchType, setSearchType] = useState('all')

  const router = useRouter()

  useEffect(() => {
    SelectAllBank().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array

        setBank(reversedData) // Set the reversed array to state
      } else {
        console.log('error')
      }
    })
  }, [])

  const handleEdit = (id: number) => {
    router.push(`/bank/${id}`)
  }

  const deleteAction = async (id: number) => {
    if (id) {
      await DeleteBank(Number(id))
      toast({
        className: 'text-blue-600',
        title: 'Bank',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })
      SelectAllBank().then((response) => {
        if (response.success) {
          console.log(response.data)
          setBank(response.data)
        } else {
          console.log('error')
        }
      })

      router.push('/bank')
    }
  }

  const AddNew = () => {
    router.push(`/bank/add`)
  }

  //search project
  const handleSearchChangeID = (e: any) => {
    setSearchId(e.target.value)
  }
  const handleSearchChangeName = (e: any) => {
    setSearchName(e.target.value)
  }

  const filteredBank = bank.filter((bank: any) => {
    // Check if the project type matches the search type or if "all" is selected
    const matchesProjectType =
      searchType === 'all' ||
      bank.acctype.toLowerCase() === searchType.toLowerCase()

    // Check if the project ID, name, and date match the search criteria
    const matchesSearchCriteria =
      bank.accnumber.toString().includes(searchId) &&
      bank.oname.toLowerCase().includes(searchName.toLowerCase())

    // Return true only if all conditions are met
    return matchesProjectType && matchesSearchCriteria
  })
  //...
  return (
    <>
      <div className="ml-5 mt-20 text-xl font-semibold">
        <div className="flex items-center ">
          <h1 className="text-3xl font-bold ">Bank Accounts</h1>
          <Button
            onClick={AddNew}
            type="button"
            className="h-9 text-white bg-green-600 lg:ml-[70%]"
          >
            +Add New
          </Button>
        </div>
        <hr className="bg-green-400 h-0.5 mt-2" />

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-4 gap-16 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[80%]">
            <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
              <label className="font-extralight text-sm mt-2 w-24">
                Acc-No.
              </label>
              <Input
                type="search"
                className="pl-3 pr-3 py-2 border border-gray-300 "
                placeholder=""
                value={searchId}
                onChange={handleSearchChangeID}
              />
            </div>
            {/* <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2">Owner Name</label>
              <Input
                type="search"
                className="pl-8 pr-3 py-2 border border-gray-300 "
                placeholder=""
                value={searchName}
                onChange={handleSearchChangeName}
              />
            </div>
            */}
            <div className="flex flex-col-2 gap-1 lg:w-[100%] ">
              <label className="font-extralight text-sm mt-2 lg:w-[30%]">
                Acc-Type
              </label>
              <Select
                onValueChange={(value) => setSearchType(value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-[200px]  border-2 border-gray-300 ml-2">
                  <SelectValue placeholder="Select Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Current">Current</SelectItem>
                  <SelectItem value="Savings">Savings</SelectItem>

                  {/* Add more project types as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 pl-12 pr-4  border-green-300">
        <Table className="rounded-xl border border-green-300 overflow-hidden">
          <TableHeader className="bg-green-300 text-center border border-green-300">
            <TableRow>
              <TableHead className="text-center px-4 py-2">
                Account ID
              </TableHead>
              <TableHead className="text-center px-4 py-2">Bank Name</TableHead>
              <TableHead className="text-center px-4 py-2">
                Account Type
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Account Branch
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Account Number
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Current Amount
              </TableHead>
              <TableHead className="text-center px-4 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-green-50">
            {filteredBank.map((bank: any, index: any) => (
              <TableRow key={index} className="hover:bg-green-100">
                <TableCell className="text-center px-4 py-2">
                  {bank.id}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.bname}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.acctype}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.accbranch}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.accnumber}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.camount}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  <div className="flex gap-5 ml-2">
                    <div>
                      <Button
                        onClick={() => handleEdit(bank.id)}
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
                              onClick={() => deleteAction(bank.id)}
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
