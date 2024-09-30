'use client'

import { Button } from '@/components/ui/button'
import { CiEdit } from 'react-icons/ci'
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useEffect, useState } from 'react'
//import { getAllData } from "./customer-actions";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  DeleteInvoice,
  getAllData,
  insertInvoiceReceipt,
  updateInvoiceReceipt,
} from './invoice-action'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from '@/components/ui/use-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { SelectAllBank } from '../bank/bank-action'

const FormSchema = z.object({
  paymeth: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  amount: z.coerce.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  pdate: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  paccount: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  invoiceid: z.number().optional(),
})

export default function Invoicelist() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      paymeth: '', // Set an appropriate default value
      amount: 0,
      pdate: new Date().toISOString().split('T')[0],
      paccount: '', // Set an appropriate default value
    },
  })
  const [invoicelist, setinvoicelist] = useState([])
  const [searchId, setSearchId] = useState('')
  const [searchName, setSearchName] = useState('')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedProjectType, setSelectedProjectType] = useState('all')
  const [accountDisabled, setAccountDisabled] = useState(false)
  const [banks, setBanks] = useState<any>([])

  const {
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  } = form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const id = getValues('id')

    if (id) {
      let dirtyValues: any = {}
      for (const key in dirtyFields) {
        dirtyValues[key] = data[key]
      }

      await updateInvoiceReceipt(dirtyValues, id.toString())
    } else {
      data.invoiceid = getValues('invoiceid') // Ensure invoiceid is set
      const objId = await insertInvoiceReceipt(data)
      setValue('id', objId.lastInsertRowid, { shouldDirty: false })
    }

    toast({
      className: 'text-blue-600',
      title: 'Payment',
      description: <span>Recorded successfully..</span>,
      duration: 2000,
    })

    // Close the dialog
    setOpen(false)

    // Reset form values
    form.reset()
  }

  useEffect(() => {
    const getCus = async () => {
      const cus = await getAllData()
      const sortedData = cus.data.sort(
        (a: any, b: any) => b.invoiceid - a.invoiceid,
      )
      setinvoicelist(sortedData) //set data to the usestate variable
    }
    getCus()

    SelectAllBank().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        console.log('reversedData', reversedData)
        setBanks(reversedData) // Set the reversed array to state
        console.log('banks', banks)
      } else {
        console.log('error')
      }
    })
  }, [])

  const deleteAction = async (id: number) => {
    if (id) {
      await DeleteInvoice(Number(id))
      toast({
        className: 'text-red-600',
        title: 'Invoice',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })
      const getCus = async () => {
        const cus = await getAllData()
        const sortedData = cus.data.sort(
          (a: any, b: any) => b.invoiceid - a.invoiceid,
        )
        setinvoicelist(sortedData)
      }
      getCus()

      router.push('/invoices/list')
    }
  }

  const filteredInvoices = invoicelist.filter((invoice: any) => {
    const matchesId = invoice.invoiceid
      .toString()
      .toLowerCase()
      .includes(searchId.toLowerCase())
    const matchesName = invoice.customername
      .toLowerCase()
      .includes(searchName.toLowerCase())

    const invoiceDate = new Date(invoice.invoicedate)
    const start = startDate ? new Date(startDate) : null
    const end = endDate ? new Date(endDate) : null

    const matchesDate =
      (!start || invoiceDate >= start) && (!end || invoiceDate <= end)

    const matchesProjectType =
      selectedProjectType === 'all' ||
      invoice.itype.toLowerCase() === selectedProjectType.toLowerCase()

    return matchesId && matchesName && matchesDate && matchesProjectType
  })

  return (
    <div>
      <div className="flex justify-between items-center pb-4 mt-16">
        <div>
          <p className="text-xl font-bold pb-6 pt-6 ml-5">Invoice Details</p>
        </div>
        <div>
          <Button
            className=" mr-16 bg-green-600"
            type="button"
            onClick={() => router.push('/invoices/add')}
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
          <div className="flex items-center ml-3">
            <p>Start Date</p>
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded ml-4"
            />
          </div>
          <div className="flex items-center ml-3">
            <p>End Date</p>
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded ml-4"
            />
            <Select
              onValueChange={(value) => setSelectedProjectType(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-[200px] rounded border-2 border-gray-300 ml-2">
                <SelectValue placeholder="Select Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Invoice Types</SelectItem>
                <SelectItem value="Person">Person</SelectItem>
                <SelectItem value="Company">Company</SelectItem>

                {/* Add more project types as needed */}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table className="rounded-xl overflow-hidden">
          <TableHeader className="bg-green-300 text-center">
            <TableRow>
              <TableHead className="text-center">Status </TableHead>
              <TableHead className="text-center">Invoice ID</TableHead>
              <TableHead className="text-center">Invoice No</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Invoice date</TableHead>
              <TableHead className="text-center">Customer Name</TableHead>
              <TableHead className="text-center">Due date</TableHead>

              <TableHead className="text-center">Project</TableHead>
              <TableHead className="text-left">Item Details</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-green-50">
            {filteredInvoices.map((invoice: any) => (
              <TableRow key={invoice.invoiceid}>
                <TableCell>
                  <p className="w-10 text-center text-[10px] rounded-lg bg-red-100">
                    status
                  </p>
                </TableCell>
                <TableCell className="text-center">
                  {invoice.invoiceid}
                </TableCell>
                <TableCell> {invoice.invoiceno}</TableCell>
                <TableCell> {invoice.itype}</TableCell>
                <TableCell className="text-center">
                  {invoice.invoicedate}
                </TableCell>
                <TableCell className="text-center">
                  {invoice.customername}
                </TableCell>
                <TableCell className="text-center">{invoice.duedate}</TableCell>

                <TableCell className="text-center">{invoice.pname}</TableCell>
                <TableCell className="text-center flex">
                  <Button
                    className="bg-green-600 ml-5"
                    onClick={() => {
                      router.push(`/invoices/${invoice.invoiceid}`)
                    }}
                    type="button"
                  >
                    Edit
                  </Button>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-green-600 ml-4"
                        type="button"
                        onClick={() => {
                          setValue('invoiceid', invoice.invoiceid)
                          setOpen(true)
                        }}
                      >
                        Record Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Record a Receipts</DialogTitle>
                      </DialogHeader>
                      <div className="flex-row gap-4 py-4">
                        <div className="items-center gap-4">
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-6"
                            >
                              <FormField
                                control={form.control}
                                name="paymeth"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Payment Method</FormLabel>
                                    <FormControl>
                                      <Select
                                        onValueChange={(value) => {
                                          field.onChange(value)
                                          if (value === 'Cash') {
                                            form.setValue('paccount', 'Cash') // Automatically select "BOC"
                                            setAccountDisabled(true) // Disable the Payment Account dropdown
                                          } else {
                                            setAccountDisabled(false) // Enable the Payment Account dropdown
                                          }
                                        }}
                                        defaultValue={field.value}
                                        {...field}
                                      >
                                        <SelectTrigger className="rounded border-2 border-green-600/40">
                                          <SelectValue placeholder="Select a payment method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Card">
                                            Card
                                          </SelectItem>
                                          <SelectItem value="Cash">
                                            Cash
                                          </SelectItem>
                                          <SelectItem value="Online">
                                            Online
                                          </SelectItem>
                                          <SelectItem value="Cheque">
                                            Cheque
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="paccount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Payment Account</FormLabel>
                                    <FormControl>
                                      <Select
                                        disabled={accountDisabled}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        {...field}
                                      >
                                        <SelectTrigger className="rounded border-2 border-green-600/40">
                                          <SelectValue placeholder="Select a payment account" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Cash">
                                            Cash
                                          </SelectItem>
                                          {banks.map((bank) => (
                                            <SelectItem
                                              key={bank.id}
                                              value={`${bank.bname} `}
                                            >
                                              {bank.bname}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600/40"
                                        placeholder=""
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="pdate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Payment Date</FormLabel>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600/40"
                                        placeholder=""
                                        type="date"
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />

                              <Button
                                type="submit"
                                className="bg-green-600 w-[80px]"
                                // onClick={}
                              >
                                Pay
                              </Button>
                            </form>
                          </Form>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    className="bg-green-600 ml-5"
                    onClick={() => {
                      router.push(`/invoices/print/${invoice.invoiceid}`)
                    }}
                    type="button"
                  >
                    Print
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
                          onClick={() => deleteAction(invoice.invoiceid)}
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
