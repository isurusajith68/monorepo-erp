'use client'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { MdCancel } from 'react-icons/md'
import { MdOutlineCancel } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { DeleteVendor, getAllData } from './vendor-actions'

export default function Customerlist() {
  const ITEMS_PER_PAGE = 20
  const [vendors, setVendors] = useState([])
  const [searchId, setSearchId] = useState('')
  const [selectedvendorsendorType, setselectedVendorType] = useState('all')
  const [searchName, setSearchName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  useEffect(() => {
    getAllData().then((response) => {
      if (response.success) {
        //setVendors(response.data);
        const reversedData = response.data.reverse()
        setVendors(reversedData)
      } else {
        console.log('error')
      }
    })
  }, [])

  const handleEdit = (id: number) => {
    router.push(`/vendors/${id}`)
  }

  const filteredVendors = vendors.filter((vendor: any) => {
    const matchesId = vendor.vendorid
      .toString()
      .toLowerCase()
      .includes(searchId.toLowerCase())
    const matchesName = vendor.vendorname
      .toLowerCase()
      .includes(searchName.toLowerCase())

    const matchesVendorType =
      selectedvendorsendorType === 'all' ||
      vendor.vendortype.toLowerCase() === selectedvendorsendorType.toLowerCase()

    return (
      matchesId && matchesName && matchesVendorType
    ) /* 1. if this all true,return the current 
                                                               processing value to filteredVendors
                                                              2.this all variables are boolean type variables
                                                              3.this || is a just or operator and === also same
                                                              4.filter method only pass passed value to the the
                                                               filteredVendors
                                                              5.filter method exermine the gave function and if pass the
                                                              current value against to the function,then return value */
  })

  const deleteAction = async (id) => {
    if (id) {
      console.log(id)
      await DeleteVendor(Number(id))
      toast({
        className: 'text-red-600',
        title: 'Vendor',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })

      getAllData().then((response) => {
        if (response.success) {
          const reversedData = response.data.reverse()
          setVendors(reversedData)
        } else {
          console.log('error')
        }
      })
    }
  }
  //...

  const totalPages = Math.ceil(filteredVendors.length / ITEMS_PER_PAGE)
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className="flex justify-between items-center pb-4 mt-16">
        <div>
          <p className="text-xl font-bold pb-6 pt-6 ml-5">Vendor List</p>
        </div>
        <div>
          <Button
            className=" mr-12 bg-green-600"
            type="button"
            onClick={() => router.push('/vendors')}
          >
            Add new
          </Button>
        </div>
      </div>
      <hr className="w-[95%] border-[1.5px]  border-green-300 mb-4 ml-2" />
      <div className="px-10 py-8">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="mr-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <Select
            onValueChange={(value) => setselectedVendorType(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-[200px] rounded border-2 border-gray-300 ml-2">
              <SelectValue placeholder="Select Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendor Types</SelectItem>
              <SelectItem value="Person">Person</SelectItem>
              <SelectItem value="Company">Company</SelectItem>

              {/* Add more project types as needed */}
            </SelectContent>
          </Select>
        </div>
        <Table className="rounded-xl overflow-hidden">
          <TableHeader className="bg-green-300 text-center">
            <TableRow>
              <TableHead className="text-center">Vendor ID</TableHead>
              <TableHead className="text-center">Vendor Name</TableHead>
              <TableHead className="text-center">Vendor Type</TableHead>
              <TableHead className="text-center">Phone Number</TableHead>
              <TableHead className="text-center">Email</TableHead>

              <TableHead className="text-center"> Location</TableHead>

              <TableHead className="text-center">Action </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-green-50">
            {filteredVendors.map((vendor: any) => (
              <TableRow key={vendor.vendorid}>
                <TableCell className="text-center">{vendor.vendorid}</TableCell>
                <TableCell className="text-center">
                  {vendor.vendorname}
                </TableCell>

                <TableCell className="text-center">
                  {vendor.vendortype}
                </TableCell>
                <TableCell className="text-center">
                  {vendor.phonenumber}
                </TableCell>
                <TableCell className="text-center">{vendor.email}</TableCell>

                <TableCell className="text-center">
                  {vendor.vendoraddress}
                </TableCell>

                <TableCell className="flex justify-center">
                  <Button
                    className="bg-green-600 ml-5"
                    onClick={() => handleEdit(vendor.vendorid)}
                    type="button"
                  >
                    Edit
                  </Button>

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
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteAction(vendor.vendorid)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {/* <div className="flex justify-center mt-4">
          <Button
            className="mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            className="ml-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div> */}
      </div>
    </div>
  )
}
