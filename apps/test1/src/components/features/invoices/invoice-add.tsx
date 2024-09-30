'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useEffect, useRef, useState } from 'react'
import {
  DeleteInvoice,
  getFirstMaterialItemId,
  getInvoice,
  getLastMaterialItemId,
  getNextMaterialItem,
  getPrevMaterialItem,
  insertInvoice,
  insertInvoiceReceipt,
  updateInvoice,
} from './invoice-action'
import { TiDeleteOutline } from 'react-icons/ti'
import { CgAdd } from 'react-icons/cg'
import { FaPlus } from 'react-icons/fa'
import { MdOutlineRemoveCircleOutline } from 'react-icons/md'
import { MIActionToolBar, MIDocTraverseToolBar } from './form-action-toolbar'
import { useRouter } from 'next/navigation'
import { Label } from '@radix-ui/react-label'
import {
  getAllCustomerNames,
  getAllCustomers,
} from '../customers/customer-actions'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAllProjects } from '../projects/project-action'
import { Textarea } from '@/components/ui/textarea'
import { SelectAllBank } from '../bank/bank-action'
///detailRowSchema chema////////////
const FormSchema2 = z.object({
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
export const detailRowSchema = z.object({
  id: z.coerce.number().optional(),
  itemdetails: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  quentity: z.coerce
    .number()
    .min(0, { message: 'Name must be at least 2 characters long' }),

  tax: z.coerce
    .number()
    .min(0, { message: 'Name must be at least 2 characters long' }),
  amount: z.coerce
    .number()
    .min(0, { message: 'Name must be at least 2 characters long' }),
  price: z.coerce
    .number()
    .min(0, { message: 'Name must be at least 2 characters long' }),
})

////////////////////////////////////////////////////////////////////
const FormSchema = z.object({
  customername: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  invoiceid: z.number().optional(),
  invoicedate: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  invoiceno: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  project: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  ctype: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  itype: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  currency: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  duedate: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  subtotal: z.coerce.number().optional(),
  totalAmount: z.coerce.number().optional(),
  dueamount: z.coerce.number().optional(),
  totalpaid: z.coerce.number().optional(),
  discount: z.coerce.number().optional(),
  remark: z.string().optional(),
  invoicedetails: z.array(detailRowSchema),
})

export default function InvoiceFormAdd({ id }: { id?: number }) {
  const router = useRouter()
  const aaa = 2
  const [customers, setCustomers] = useState([])
  const [projects, setProjects] = useState([])
  const [open, setOpen] = useState(false)
  const [paidStatus, setpaidStatus] = useState(false)
  const focusRef = useRef(null)
  const [accountDisabled, setAccountDisabled] = useState(false)
  const [banks, setBanks] = useState<any>([])

  useEffect(() => {
    // Fetch customers when the component mounts
    const fetchCustomers = async () => {
      const response = await getAllCustomers()
      if (response.success) {
        setCustomers(response.data)
      }
    }

    fetchCustomers()
    const fetchProjects = async () => {
      const response = await getAllProjects()
      if (response.success) {
        setProjects(response.data)
      }
    }

    fetchProjects()

    if (id) {
      const getCus = async () => {
        const cus = await getInvoice(Number(id ?? -1))
        form.reset(cus.data)

        setValue('dueamount', cus.data.totalAmount - cus.data.totalpaid)

        if (getValues('totalpaid') ?? 0 > 0) {
          setpaidStatus(true)
        }
      }
      getCus()
    }

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

    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [id])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      totalpaid: 0,
      discount: 0,
      currency: 'LKR',
      invoicedate: new Date().toISOString().split('T')[0],
      duedate: new Date().toISOString().split('T')[0],
      ctype: 'standard',
      remark: '',
      invoicedetails: [
        { itemdetails: '', quentity: 0, price: 0, tax: 0, amount: 0 },
      ],
    },
  })

  const form2 = useForm<z.infer<typeof FormSchema2>>({
    resolver: zodResolver(FormSchema2),
    defaultValues: {
      pdate: new Date().toISOString().split('T')[0],
    },
  })

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    getValues: getValues2,
    trigger,
    formState: {
      isDirty: isDirty2,
      dirtyFields: dirtyFields2,
      isLoading: isLoading2,
      isSubmitSuccessful: isSubmitSuccessful2,
      errors: error1,
    },
  } = form2

  const {
    control: control,
    handleSubmit: handleSubmit,
    watch: watch,
    setValue: setValue,
    getValues: getValues,
    formState: {
      isDirty: isDirty,
      dirtyFields: dirtyFields,
      isLoading: isLoading,
      isSubmitSuccessful: isSubmitSuccessful,
    },
  } = form

  const { fields, append, remove } = useFieldArray({
    name: 'invoicedetails',
    control: form.control,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const id = getValues('invoiceid')

    // Create a copy of the data without the `dueamount` field
    const { dueamount, ...dataWithoutDueAmount } = data // Destructure and exclude `dueamount`

    if (id) {
      let dirtyValues: any = {}

      for (const key in dirtyFields) {
        if (key !== 'invoicedetails' && key !== 'dueamount') {
          // Ensure `dueamount` is not part of dirty fields to be updated
          dirtyValues[key] = data[key]
        }
      }

      // Send `dataWithoutDueAmount` to the database
      await updateInvoice(dataWithoutDueAmount, dirtyValues, id.toString())

      toast({
        className: 'text-green-600',
        title: 'Invoice',
        description: <span>Updated successfully..</span>,
        duration: 5000,
      })
    } else {
      // For new insertions, also exclude `dueamount`
      const objId = await insertInvoice(dataWithoutDueAmount)
      setValue('invoiceid', objId.lastInsertRowid, { shouldDirty: false })

      toast({
        className: 'text-green-600',
        title: 'Invoice',
        description: <span>Added successfully..</span>,
        duration: 2000,
      })

      router.push(`/invoices/${objId.lastInsertRowid}`)
    }
  }

  const calculateSubtotal = () => {
    const subtotal = fields.reduce((total, field, index) => {
      const amount = Number(getValues(`invoicedetails.${index}.amount`)) || 0
      return total + amount
    }, 0)
    setValue('subtotal', subtotal, { shouldDirty: true })

    // Recalculate total amount with the current discount value
    const discount = Number(getValues('discount')) || 0
    calculateTotalAmount(discount)
  }

  const calculateTotalAmount = (discount) => {
    const subtotal = Number(getValues('subtotal')) || 0
    const totalAmount = subtotal - (subtotal * discount) / 100
    setValue('totalAmount', totalAmount, { shouldDirty: true })
  }

  const getPrevItem = async () => {
    const prevItem = await getPrevMaterialItem(id ?? 0)
    if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
      router.push(`/invoices/${prevItem.data.invoiceid}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached Start of Invoice ID</span>,
        duration: 2000,
      })
    }
  }
  const getNextItem = async () => {
    const nextItem = await getNextMaterialItem(id ?? 0)
    if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
      router.push(`/invoices/${nextItem.data.invoiceid}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>{nextItem.msg}</span>,
        duration: 2000,
      })
    }
  }

  const deleteAction = async () => {
    if (id) {
      await DeleteInvoice(Number(id))
      toast({
        className: 'text-red-600',
        title: 'Invoice',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })

      router.push('/invoices/list')
    }
  }

  async function onSubmit2(data: z.infer<typeof FormSchema2>) {
    try {
      if (id) {
        data.invoiceid = getValues('invoiceid') // Ensure invoiceid is set
        // Try inserting the invoice receipt
        const objId = await insertInvoiceReceipt(data)

        setValue('id', objId.lastInsertRowid, { shouldDirty: false })

        toast({
          className: 'text-green-600',
          title: 'Invoice',
          description: <span>Added successfully.</span>,
          duration: 2000,
        })

        // Close the dialog
        setOpen(false)

        // Reset form values
        form.reset()
      } else {
        data.invoiceid = getValues('invoiceid') // Ensure invoiceid is set

        // Try inserting the invoice receipt
        const objId = await insertInvoiceReceipt(data)
        setValue('id', objId.lastInsertRowid, { shouldDirty: false })
      }

      // If everything is successful, show the success toast
    } catch (error) {
      // Handle any errors that occur during the async operations
      console.error('An error occurred:', error)

      // Display an error toast to the user
      toast({
        className: 'text-red-600',
        title: 'Error',
        description: <span>Failed to record payment. Please try again.</span>,
        duration: 3000,
      })
    }
  }

  const handleValidateClick = async () => {
    const isValid = await trigger()
    if (isValid) {
      console.log('Form is valid!')
      onSubmit2(form2.getValues())
    } else {
      console.log('Form is invalid!')
    }
  }

  return (
    <div className="flex flex-col items-center pt-4 ml-5 mr-5 mt-12">
      <div className="grow pt-4">
        <div className="flex justify-between items-center pb-4">
          <div>
            {!id && (
              <p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Invoice</p>
            )}
            {id && (
              <p className="text-xl font-bold pb-6 pt-3 pl-6 ">
                Update Invoice
              </p>
            )}
          </div>
          {id && (
            <div>
              <Button
                className=" mr-5 bg-green-600"
                type="button"
                onClick={getPrevItem}
              >
                previous
              </Button>

              <Button
                className=" mr-5 bg-green-600"
                type="button"
                onClick={getNextItem}
              >
                next
              </Button>
            </div>
          )}
          <div>
            <Button
              className=" mr-10 bg-green-600"
              type="button"
              onClick={() => router.push('/invoices/list')}
            >
              View List
            </Button>
          </div>
        </div>

        <hr className="w-[95%] border-[1.5px]  border-green-300 mb-4" />
        <div className="flex justify-center ml-10">
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <div className="flex flex-wrap gap-6">
                  <div className="w-full md:w-[400px]">
                    <FormField
                      control={form.control}
                      name="invoiceid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Invoice ID</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              className="rounded border-2 border-green-600"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="invoiceno"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Invoice Ref No</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="rounded border-2 border-green-600"
                              placeholder=""
                              {...field}
                              ref={(el) => {
                                field.ref(el) // Manually call the field ref function
                                focusRef.current = el // Also assign the element to your custom ref
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || 'LKR'}
                            >
                              <SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <SelectValue placeholder="select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="LKR">LKR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duedate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="rounded border-2 border-green-600"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full md:w-[400px]">
                    <FormField
                      control={form.control}
                      name="customername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Name</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <SelectValue placeholder="Select a customer" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Customers</SelectLabel>
                                  <SelectItem value="other">Other</SelectItem>
                                  {customers.map((customer) => (
                                    <SelectItem
                                      key={customer.id}
                                      value={`${customer.cname}`}
                                    >
                                      {customer.cname}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="remark"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="pt-4 w-[120px]">
                            Remark
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little bit about yourself"
                              className="resize-none rounded border-2 border-green-600 "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="itype"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Invoice Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <SelectValue placeholder="select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Person">Person</SelectItem>
                                <SelectItem value="Company">Company</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="invoicedate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Invoice date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="rounded border-2 border-green-600"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="project"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select project</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <SelectValue placeholder="Select a project" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Project</SelectLabel>
                                  {projects.map((project) => (
                                    <SelectItem
                                      key={project.pid}
                                      value={`${project.pid} `}
                                    >
                                      {project.pname}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="w-full overflow-x-hidden">
                  <p className="text-xl font-bold pb-6 pt-6">Item Table</p>
                  <Button
                    type="button"
                    className="bg-green-600"
                    onClick={() =>
                      append({
                        itemdetails: '',
                        quentity: 0,
                        price: 0,
                        tax: 0,
                        amount: 0,
                      })
                    }
                  >
                    Add row
                  </Button>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {!paidStatus && <TableHead>REMOVE</TableHead>}
                        <TableHead>DISCRIPTION</TableHead>
                        <TableHead>QUANTITY</TableHead>
                        <TableHead>UNIT PRICE</TableHead>
                        <TableHead>TAX</TableHead>
                        <TableHead>AMOUNT</TableHead>
                        {!paidStatus && <TableHead>ADD</TableHead>}
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {fields.map((field, index) => (
                        <TableRow key={field.id}>
                          {!paidStatus && (
                            <TableCell className="p-1 text-center font-medium">
                              <Button
                                type="button"
                                variant={'outline'}
                                className="text-2xl"
                                onClick={() => {
                                  remove(index)
                                  calculateSubtotal() // Recalculate subtotal after removal
                                }}
                              >
                                <MdOutlineRemoveCircleOutline className="text-destructive" />
                              </Button>
                            </TableCell>
                          )}

                          <TableCell className="text-right">
                            <FormField
                              control={form.control}
                              name={`invoicedetails.${index}.itemdetails`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      disabled={paidStatus}
                                      className="rounded border-2 border-green-600"
                                      placeholder="item 1"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`invoicedetails.${index}.quentity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      disabled={paidStatus}
                                      className="rounded border-2 border-green-600"
                                      placeholder="Paid"
                                      {...field}
                                      onChangeCapture={(e) => {
                                        const quantity =
                                          Number(e.target.value) || 0
                                        const price =
                                          Number(
                                            getValues(
                                              `invoicedetails.${index}.price`,
                                            ),
                                          ) || 0
                                        const tax =
                                          Number(
                                            getValues(
                                              `invoicedetails.${index}.tax`,
                                            ),
                                          ) || 0
                                        const amount = quantity * price + tax
                                        setValue(
                                          `invoicedetails.${index}.amount`,
                                          amount,
                                        )
                                        calculateSubtotal() // Recalculate subtotal
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="text-right">
                            <FormField
                              control={form.control}
                              name={`invoicedetails.${index}.price`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      disabled={paidStatus}
                                      className="rounded border-2 border-green-600"
                                      placeholder="$250.00"
                                      {...field}
                                      onChangeCapture={(e) => {
                                        const price =
                                          Number(e.target.value) || 0
                                        const quantity =
                                          Number(
                                            getValues(
                                              `invoicedetails.${index}.quentity`,
                                            ),
                                          ) || 0
                                        const tax =
                                          Number(
                                            getValues(
                                              `invoicedetails.${index}.tax`,
                                            ),
                                          ) || 0
                                        const amount = quantity * price + tax
                                        setValue(
                                          `invoicedetails.${index}.amount`,
                                          amount,
                                        )
                                        calculateSubtotal() // Recalculate subtotal
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="text-right">
                            <FormField
                              control={form.control}
                              name={`invoicedetails.${index}.tax`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      disabled={paidStatus}
                                      className="rounded border-2 border-green-600"
                                      placeholder="$250.00"
                                      {...field}
                                      onChangeCapture={(e) => {
                                        const tax = Number(e.target.value) || 0
                                        const quantity =
                                          Number(
                                            getValues(
                                              `invoicedetails.${index}.quentity`,
                                            ),
                                          ) || 0
                                        const price =
                                          Number(
                                            getValues(
                                              `invoicedetails.${index}.price`,
                                            ),
                                          ) || 0
                                        const amount = quantity * price + tax
                                        setValue(
                                          `invoicedetails.${index}.amount`,
                                          amount,
                                        )
                                        calculateSubtotal() // Recalculate subtotal
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="text-right">
                            <FormField
                              control={form.control}
                              name={`invoicedetails.${index}.amount`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      disabled={paidStatus}
                                      className="rounded border-2 border-green-600"
                                      placeholder="$250.00"
                                      {...field}
                                      readOnly
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          {!paidStatus && (
                            <TableCell className="p-1 text-center font-medium">
                              <Button
                                variant={'outline'}
                                className="text-2xl"
                                type="button"
                                onClick={() =>
                                  append({
                                    itemdetails: '', // Default value for item description
                                    quentity: 0, // Default value for quantity
                                    price: 0, // Default value for price
                                    tax: 0, // Default value for tax
                                    amount: 0, // Default value for amount
                                  })
                                }
                              >
                                <FaPlus className="text-destructive" />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex items-center justify-between">
                    <div>
                      {!id && (
                        <Button className="bg-green-600" type="submit">
                          Save
                        </Button>
                      )}
                      {id && (
                        <Button className="bg-green-600" type="submit">
                          Update
                        </Button>
                      )}

                      {id && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="bg-red-600 ml-4" type="button">
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
                                permanently delete your data and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600"
                                onClick={deleteAction}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}

                      {id && (
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <Button
                              className="bg-green-600 ml-4"
                              type="button"
                              onClick={() => setOpen(true)}
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
                                <Form {...form2}>
                                  <form
                                    onSubmit={handleSubmit(onSubmit2)}
                                    className="space-y-6"
                                  >
                                    <FormField
                                      control={form2.control}
                                      name="paymeth"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Payment Method</FormLabel>
                                          <FormControl>
                                            <Select
                                              onValueChange={(value) => {
                                                field.onChange(value)
                                                if (value === 'Cash') {
                                                  form2.setValue(
                                                    'paccount',
                                                    'Cash',
                                                  ) // Automatically select "BOC"
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
                                      control={form2.control}
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
                                      control={form2.control}
                                      name="amount"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Amount</FormLabel>
                                          <FormControl>
                                            <Input
                                              className="rounded border-2 border-green-600/40"
                                              placeholder=""
                                              {...field}
                                              onChange={(e) =>
                                                field.onChange(
                                                  parseFloat(e.target.value) ||
                                                    0,
                                                )
                                              }
                                              type="number"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={form2.control}
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
                                      className="bg-green-600 w-[80px]"
                                      type="button"
                                      onClick={() => {
                                        setValue2(
                                          'invoiceid',
                                          getValues('invoiceid'),
                                        )
                                        handleValidateClick()
                                        //onSubmit2(form2.getValues());
                                        window.location.reload()
                                      }}
                                    >
                                      Pay
                                    </Button>
                                  </form>
                                </Form>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}

                      {id && (
                        <Button
                          className="bg-green-600 ml-5"
                          onClick={() => {
                            router.push(`/invoices/print/${id}`)
                          }}
                          type="button"
                        >
                          Print
                        </Button>
                      )}
                    </div>
                    <div className="w-80 h-64 bg-green-200 mr-10 mb-11 p-4 items-center rounded-md  ">
                      <div className="flex justify-between items-center ">
                        <Label className="font-bold">Sub Total</Label>
                        <FormField
                          control={form.control}
                          name="subtotal"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-36"
                                  {...field}
                                  readOnly
                                  placeholder="Sub Total"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Label className="font-bold">Discount (%)</Label>
                        <FormField
                          control={form.control}
                          name="discount"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-36"
                                  {...field}
                                  placeholder="Discount"
                                  onChange={(e) => {
                                    const discount = Number(e.target.value) || 0
                                    field.onChange(e)
                                    calculateTotalAmount(discount)
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Label className="font-bold">Total Amount</Label>
                        <FormField
                          control={form.control}
                          name="totalAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-36"
                                  {...field}
                                  readOnly
                                  placeholder="Total Amount"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Label className="font-bold">Total Paid</Label>
                        <FormField
                          control={form.control}
                          name="totalpaid"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-36"
                                  {...field}
                                  readOnly
                                  placeholder="Total Amount"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Label className="font-bold">Amount Due</Label>
                        <FormField
                          control={form.control}
                          name="dueamount"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-36"
                                  {...field}
                                  readOnly
                                  placeholder="Total Amount"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
