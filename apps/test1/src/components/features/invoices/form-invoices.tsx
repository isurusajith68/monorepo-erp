'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { any, z } from 'zod'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import {
  getInvoice,
  getNextMaterialItem,
  updateInvoice,
  insertInvoice,
  DeleteInvoice,
  getPrevMaterialItem,
  updateInvoiceReceipt,
  insertInvoiceReceipt,
} from './invoice-action'
import { FaPlus } from 'react-icons/fa'
import { MdOutlineRemoveCircleOutline } from 'react-icons/md'
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
import { Label } from '@radix-ui/react-label'
import { getAllProjects } from '../projects/project-action'
import { getAllCustomers } from '../customers/customer-actions'
import { Textarea } from '@/components/ui/textarea'

const FormSchema2 = z.object({
  paymeth: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  amount: z.string().min(2, {
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

const detailRowSchema = z.object({
  id: z.coerce.number().optional(),
  itemdetails: z.string().optional(),
  quentity: z.coerce.number().optional(),
  rate: z.coerce.number().optional(),
  tax: z.coerce.number().optional(),
  amount: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
})

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
  discount: z.coerce.number().optional(),
  remark: z.string().optional(),
  invoicedetails: z.array(detailRowSchema),
})
export default function InvoiceForm({ id }: { id?: number }) {
  const router = useRouter()
  const [customers, setCustomers] = useState([])
  const [projects, setProjects] = useState([])
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      invoicedetails: [
        { itemdetails: '', quentity: 0, rate: 0, tax: 0, amount: 0 },
      ],
    },
  })
  const form2 = useForm<z.infer<typeof FormSchema2>>({
    resolver: zodResolver(FormSchema2),
    defaultValues: {
      pdate: new Date().toISOString().split('T')[0],
    },
  })

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
      }
      getCus()
    }
  }, [id])
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    getValues: getValues2,
    formState: {
      isDirty: isDirty2,
      dirtyFields: dirtyFields2,
      isLoading: isLoading2,
      isSubmitSuccessful: isSubmitSuccessful2,
    },
  } = form2
  // const {
  //   watch,
  //   setValue,
  //   getValues,
  //   formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  // } = form;
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

    if (id) {
      let dirtyValues: any = {}

      for (const key in dirtyFields) {
        if (key != 'invoicedetails') {
          dirtyValues[key] = data[key]
        }
      }

      await updateInvoice(data, dirtyValues, id.toString())
    } else {
      const objId = await insertInvoice(data)
      setValue('invoiceid', objId.lastInsertRowid, { shouldDirty: false })
      router.push(`/invoices/${objId.lastInsertRowid}`)
    }

    toast({
      className: 'text-blue-600',
      title: 'Customer',
      description: <span>Added successfully..</span>,
      duration: 5000,
    })
    // router.push(`/invoices/list`);
  }

  const getPrevItem = async () => {
    const prevItem = await getPrevMaterialItem(id ?? 0)
    if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
      router.push(`/invoices/${prevItem.data.invoiceid}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached Start of Material-items..</span>,
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
        className: 'text-blue-600',
        title: 'Invoice',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })

      router.push('/invoices/list')
    }
  }

  const calculateSubtotal = () => {
    const subtotal = fields.reduce((total, field, index) => {
      const amount = Number(getValues(`invoicedetails.${index}.amount`)) || 0
      return total + amount
    }, 0)
    setValue('subtotal', subtotal)

    // Recalculate total amount with the current discount value
    const discount = Number(getValues('discount')) || 0
    calculateTotalAmount(discount)
  }

  const calculateTotalAmount = (discount: any) => {
    const subtotal = Number(getValues('subtotal')) || 0
    const totalAmount = subtotal - (subtotal * discount) / 100
    setValue('totalAmount', totalAmount)
  }

  async function onSubmit2(data: z.infer<typeof FormSchema2>) {
    try {
      console.log('iddddddddddddddddd', id)
      console.log('helooooooooooooooooooooooo', data)

      if (id) {
        // let dirtyValues: any = {};

        // for (const key in dirtyFields) {
        //   dirtyValues[key] = data[key];
        // }
        // Try updating the invoice receipt
        //await updateInvoiceReceipt(dirtyValues, id.toString());
        data.invoiceid = getValues('invoiceid') // Ensure invoiceid is set
        // Try inserting the invoice receipt
        const objId = await insertInvoiceReceipt(data)
        setValue('id', objId.lastInsertRowid, { shouldDirty: false })

        toast({
          className: 'text-blue-600',
          title: 'Payment',
          description: <span>Recorded successfully.</span>,
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

  return (
    <div className="flex flex-col items-center pt-4 ml-5 mr-5 mt-16">
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
          <div className="flex gap-2">
            <div>
              <Button
                className=" mr-5 bg-green-600"
                type="button"
                onClick={getPrevItem}
              >
                previous
              </Button>
            </div>
            <div>
              <Button
                className=" mr-5 bg-green-600"
                type="button"
                onClick={getNextItem}
              >
                next
              </Button>
            </div>
          </div>
        </div>
        <hr className="w-[95%] border-[1.5px]  border-green-300 mb-4" />
        <div className="flex justify-center">
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <Button
                  className=" mr-5 bg-green-600 "
                  type="button"
                  onClick={() => router.push('/invoices/list')}
                >
                  View List
                </Button>

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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ctype"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Type</FormLabel>
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
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
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
                                  {customers.map((customer) => (
                                    <SelectItem
                                      id="cus-name"
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
                                      value={`${project.pname} `}
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

                <div className="w-full overflow-x-auto">
                  <p className="text-xl font-bold pb-6 pt-6">Item Table</p>
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        itemdetails: '',
                        quentity: 0,
                        rate: 0,
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
                        <TableHead>REMOVE</TableHead>
                        <TableHead>ITEM DETAILS</TableHead>
                        <TableHead>QUANTITY</TableHead>
                        <TableHead>PRICE</TableHead>
                        <TableHead>TAX</TableHead>
                        <TableHead>AMOUNT</TableHead>
                        <TableHead>ADD</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {fields.map((field, index) => (
                        <TableRow key={field.id}>
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

                          <TableCell className="text-right">
                            <FormField
                              control={form.control}
                              name={`invoicedetails.${index}.itemdetails`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
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

                          <TableCell className="p-1 text-center font-medium">
                            <Button
                              variant={'outline'}
                              className="text-2xl"
                              type="button"
                              onClick={() => append({})}
                            >
                              <FaPlus className="text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Button className="bg-green-600" type="submit">
                      Submit
                    </Button>

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
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={deleteAction}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* /vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */}

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
                          <DialogTitle>Record</DialogTitle>
                        </DialogHeader>
                        <div className="flex-row gap-4 py-4">
                          <div className="items-center gap-4">
                            <Form {...form2}>
                              <form
                                onSubmit={form2.handleSubmit(onSubmit2)} // Ensure form2 and onSubmit2 are used
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
                                          onValueChange={field.onChange}
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
                                              BOC
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
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                          {...field}
                                        >
                                          <SelectTrigger className="rounded border-2 border-green-600/40">
                                            <SelectValue placeholder="Select a payment account" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="None">
                                              None
                                            </SelectItem>
                                            <SelectItem value="BOC">
                                              BOC
                                            </SelectItem>
                                            <SelectItem value="Peoples">
                                              Peoples
                                            </SelectItem>
                                            <SelectItem value="HNB">
                                              HNB
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
                                  type="submit"
                                  className="bg-green-600 w-[80px]"
                                  onClick={() => {
                                    setValue2(
                                      'invoiceid',
                                      getValues('invoiceid'),
                                    ) // Set invoiceid when opening the form
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
                      <Input type="text" disabled className="w-36" />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <Label className="font-bold">Amount Due</Label>
                      <Input type="text" disabled className="w-36" />
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
