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
import { DeleteCus, DeleteCustomer, getAllData } from './customer-actions'

import { useRouter } from 'next/navigation'

import { toast } from '@/components/ui/use-toast'

export default function Customerlist() {
  const [customers, setCustomers] = useState([])
  const [searchId, setSearchId] = useState('')
  const [selectedCustomerType, setselectedCustomerType] = useState('all')
  const [searchName, setSearchName] = useState('')

  const router = useRouter()

  useEffect(() => {
    // get data from customer table
    getAllData().then((response) => {
      if (response.success) {
        const sortedData = response.data.sort((a: any, b: any) => b.id - a.id)
        setCustomers(sortedData)
      } else {
        console.log('error')
      }
    })
  }, [])
  //push to update customer page
  const handleEdit = (id: number) => {
    router.push(`/customers/${id}`)
  }

  // Real-time search filtering
  const filteredInvoices = customers.filter((customer: any) => {
    const matchesId = customer.id
      .toString()
      .toLowerCase()
      .includes(searchId.toLowerCase())
    const matchesName = customer.cname
      .toLowerCase()
      .includes(searchName.toLowerCase())

    const matchesProjectType =
      selectedCustomerType === 'all' ||
      customer.ctype.toLowerCase() === selectedCustomerType.toLowerCase()

    return matchesId && matchesName && matchesProjectType
  })
  // customer delete function
  const deleteAction = async (id) => {
    if (id) {
      console.log(id)
      await DeleteCus(Number(id))
      toast({
        className: 'text-red-600',
        title: 'Customer',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })

      getAllData().then((response) => {
        if (response.success) {
          const sortedData = response.data.sort((a: any, b: any) => b.id - a.id)
          setCustomers(sortedData)
        } else {
          console.log('error')
        }
      })
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center pb-4 mt-16 ">
        <div>
          <p className="text-xl font-bold pb-6 pt-6 ml-5">Customer List</p>
        </div>
        <div>
          <Button
            className=" mr-5 bg-green-600"
            type="button"
            onClick={() => router.push('/customers/add')}
          >
            +Add new
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
            onValueChange={(value) => setselectedCustomerType(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-[200px] rounded border-2 border-gray-300 ml-2">
              <SelectValue placeholder="Select Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customer Types</SelectItem>
              <SelectItem value="Person">Person</SelectItem>
              <SelectItem value="Company">Company</SelectItem>

              {/* Add more project types as needed */}
            </SelectContent>
          </Select>
        </div>
        <Table className="rounded-xl overflow-hidden">
          <TableHeader className="bg-green-300 text-center">
            <TableRow>
              <TableHead className="text-center">Customer ID</TableHead>
              <TableHead className="text-center">Customer Name</TableHead>
              <TableHead className="text-center">Customer Type</TableHead>
              <TableHead className="text-center">Phone Number</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-left"> NIC/BRN</TableHead>
              <TableHead className="text-left"> Address</TableHead>
              <TableHead className="text-left"> Cus/Company Reg Date</TableHead>
              <TableHead className="text-left"> </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-green-50">
            {filteredInvoices.map((invoice: any) => (
              <TableRow key={invoice.id}>
                <TableCell className="text-center">{invoice.id}</TableCell>
                <TableCell className="text-center">{invoice.cname}</TableCell>

                <TableCell className="text-center">{invoice.ctype}</TableCell>
                <TableCell className="text-center">{invoice.phone}</TableCell>
                <TableCell className="text-center">{invoice.email}</TableCell>
                <TableCell className="text-center">{invoice.nic}</TableCell>
                <TableCell className="text-center">
                  {invoice.location}
                </TableCell>
                <TableCell className="text-center">{invoice.rdate}</TableCell>
                <TableCell className="text-center flex">
                  <Button
                    className="bg-green-600 ml-5"
                    onClick={() => handleEdit(invoice.id)}
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
                          delete your data and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600"
                          onClick={() => deleteAction(invoice.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
