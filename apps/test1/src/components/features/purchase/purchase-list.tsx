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
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from '@/components/ui/use-toast'
import {
  DeletePurchase,
  getAllData,
  insertPurchasePayment,
} from './purchase-action'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { SelectAllBank } from '../bank/bank-action'
import { SelectAllProjects } from '../projects/project-action'

const FormSchema = z.object({
  purchaseaccount: z.string().min(2, {
    message: 'Purchase account must be selected.',
  }),
  purchasemethod: z.string().min(2, {
    message: 'Purchase method must be selected.',
  }),
  amount: z.coerce.number().min(2, {
    message: 'Amount must be at least 2 characters.',
  }),
  purchasedate: z.string().min(2, {
    message: 'Purchase date must be selected.',
  }),
  purchaseid: z.number().optional(),
})

export default function PurchaseList() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      purchaseaccount: 'Cash',
      purchasemethod: '',
      amount: 0,
      purchasedate: new Date().toISOString().split('T')[0],
      purchaseid: 0, // Default empty purchaseid
    },
  })

  const {
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  } = form

  const [isOpen, setIsOpen] = useState(false)

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 10)}</code>
    //     </pre>
    //   ),
    // });

    //const id = getValues("purchaseno");
    const id = getValues('purchaseid')

    console.log('iddddddddd', id)

    if (id) {
      // let dirtyValues: any = {};
      // for (const key in dirtyFields) {
      //   if (key != "purchasedetails") {
      //     dirtyValues[key] = data[key];
      //   }
      // }
      // await updatePurchase(data, dirtyValues, id.toString());

      // toast({
      //   className: "text-blue-600",
      //   title: "Invoice",
      //   description: <span>Update successfully..</span>,
      //   duration: 5000,
      // });

      //data.purchaseid = getValues("purchaseid"); // Ensure purchaseid is set
      const objId = await insertPurchasePayment(data)
      setValue('purchaseno', objId.lastInsertRowid, { shouldDirty: false })

      toast({
        className: 'text-green-600',
        title: 'Payment',
        description: <span>Added successfully..</span>,
        duration: 5000,
      })

      form.reset()

      setIsOpen(false)
    } else {
      //data.purchaseid = getValues("purchaseid"); // Ensure purchaseid is set
      const objId = await insertPurchasePayment(data)
      setValue('purchaseno', objId.lastInsertRowid, { shouldDirty: false })

      toast({
        className: 'text-green-600',
        title: 'Payment',
        description: <span>Added successfully..</span>,
        duration: 5000,
      })

      form.reset()

      setIsOpen(false)
    }
  }

  const [invoicelist, setinvoicelist] = useState([])
  const [searchId, setSearchId] = useState('')
  const [searchName, setSearchName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedProjectType, setSelectedProjectType] = useState('all')
  const [banks, setBanks] = useState<any>([])
  const [projects, setProjects] = useState<any>([])

  const router = useRouter()

  useEffect(() => {
    const getCus = async () => {
      const cus = await getAllData()
      //setinvoicelist(cus.data); //set data to the usestate variable
      const reversedData = cus.data.reverse()
      setinvoicelist(reversedData)
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

    SelectAllProjects().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        console.log(reversedData)
        setProjects(reversedData) // Set the reversed array to state
      } else {
        console.log('error')
      }
    })
  }, [])

  // function handleDelete(id: number) {
  //   const numID = Number(id);
  //   const objId = DeleteInvoice(numID);

  //   toast({
  //     className: "text-blue-600",
  //     title: "Delete",
  //     description: <span>Delete successfully..</span>,
  //     duration: 5000,
  //   });
  // }

  const deleteAction = async (id: number) => {
    if (id) {
      await DeletePurchase(Number(id))
      toast({
        className: 'text-red-600',
        title: 'Purchase',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })
      const getCus = async () => {
        const cus = await getAllData()
        setinvoicelist(cus.data) //set data to the usestate variable
      }
      getCus()

      router.push('/purchases/list')
    }
  }

  // Real-time search filtering
  const filteredInvoices = invoicelist.filter((purchase: any) => {
    const matchesId = purchase.purchaseid
      .toString()
      .toLowerCase()
      .includes(searchId.toLowerCase())
    const matchesName = purchase.sellername
      .toLowerCase()
      .includes(searchName.toLowerCase())

    const purchaseDate = new Date(purchase.purchasedate)
    const start = startDate ? new Date(startDate) : null
    const end = endDate ? new Date(endDate) : null

    const matchesDate =
      (!start || purchaseDate >= start) && (!end || purchaseDate <= end)

    const matchesProjectType =
      selectedProjectType === 'all' ||
      purchase.purchasetype.toLowerCase() === selectedProjectType.toLowerCase()

    return matchesId && matchesName && matchesDate && matchesProjectType
    //return matchesId && matchesName && matchesDate;
  })

  return (
    <div>
      <div className="flex justify-between items-center pb-4 mt-14">
        <div>
          <p className="text-xl font-bold pb-6 pt-6 ml-5">Purchases Details</p>
        </div>
        <div>
          <Button
            className=" mr-10 bg-green-600"
            type="button"
            onClick={() => router.push('/purchases')}
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
            <p className="text-sm">Start Date</p>
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded ml-4"
            />
          </div>
          <div className="flex items-center ml-3">
            <p className="text-sm">End Date</p>
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
              <SelectTrigger className="w-[200px] rounded border-2 border-gray-300 ml-2 ml-6">
                <SelectValue placeholder="Select Purchase Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Purchase Types</SelectItem>
                <SelectItem value="goods">Goods</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="assets">Assets</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table className="rounded-xl overflow-hidden">
          <TableHeader className="bg-green-300 text-center">
            <TableRow>
              <TableHead className="text-center px-4 py-2">Status</TableHead>
              <TableHead className="text-center px-4 py-2">
                Purchase ID
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Purchase no
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Seller name
              </TableHead>
              {/* <TableHead className="text-center px-4 py-2">Seller type</TableHead> */}
              <TableHead className="text-center px-4 py-2">
                Purchase type
              </TableHead>
              <TableHead className="text-center px-4 py-2">
                Purchase date
              </TableHead>
              <TableHead className="text-center px-4 py-2">Due date</TableHead>
              {/* <TableHead className="text-center px-4 py-2">Currency</TableHead> */}
              <TableHead className="text-center px-4 py-2">Project</TableHead>
              <TableHead className="text-center px-4 py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-green-50">
            {filteredInvoices.map((purchase: any) => (
              <TableRow key={purchase.purchaseid}>
                <TableCell className="text-center">
                  <p className="w-10 mx-auto text-center text-[10px] rounded-lg bg-red-100">
                    status
                  </p>
                </TableCell>

                <TableCell className="text-center">
                  {purchase.purchaseid}
                </TableCell>
                <TableCell className="text-center">
                  {purchase.purchaseno}
                </TableCell>
                <TableCell className="text-center">
                  {purchase.sellername}
                </TableCell>
                {/* <TableCell className="text-center">{purchase.sellertype}</TableCell> */}
                <TableCell className="text-center">
                  {purchase.purchasetype}
                </TableCell>
                <TableCell className="text-center">
                  {purchase.purchasedate}
                </TableCell>
                <TableCell className="text-center">
                  {purchase.duedate}
                </TableCell>
                {/* <TableCell className="text-center">{purchase.currency}</TableCell> */}

                {/* <TableCell className="text-center">
                  {projects.map((project) => (

                    <TableCell className="text-center">
                      {project.pid==purchase.project&&project.pname
                      // project.pid==purchase.project?project.pname:"None"
                      
                      }
                      </TableCell>
                 
                  ))}
                  </TableCell> */}

                <TableCell className="text-center">
                  {purchase.pname ? purchase.pname : 'None'}
                </TableCell>

                <TableCell className="text-center flex items-center">
                  <Link
                    className="font-bold text-slate-500 text-[10px]"
                    href={`/purchases/viewpurchase/${purchase.purchaseid}`}
                  >
                    View Details
                  </Link>

                  {/* <Button
                    className="bg-green-600 ml-2 text-[10px] h-6 w-4"
                    onClick={() => {
                      router.push(`/purchases/${purchase.purchaseid}`);
                    }}
                    type="button"
                  >
                    Edit
                  </Button> */}

                  <Button
                    className="bg-green-600 ml-2 "
                    onClick={() => {
                      router.push(`/purchases/${purchase.purchaseid}`)
                    }}
                    type="button"
                  >
                    Edit
                  </Button>

                  {/* /////////////////////////////////////////////////////////////////////////////////// */}

                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-green-600 ml-2 "
                        type="button"
                        onClick={() => {
                          setIsOpen(true)
                          setValue('purchaseid', purchase.purchaseid)
                        }}
                      >
                        Record a Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Record a Payment</DialogTitle>
                      </DialogHeader>
                      <div className="flex-row gap-4 py-4">
                        <div className=" items-center gap-4">
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-6"
                            >
                              <FormField
                                control={form.control}
                                name="purchasemethod"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormLabel className="">
                                      Purchase Method
                                    </FormLabel>
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        {...field}
                                      >
                                        <SelectTrigger className="rounded border-2 border-green-600/40">
                                          <SelectValue placeholder="Select a purchase method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="card">
                                            Card
                                          </SelectItem>
                                          <SelectItem value="cash">
                                            Cash
                                          </SelectItem>
                                          <SelectItem value="online">
                                            Online
                                          </SelectItem>
                                          <SelectItem value="cheque">
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
                                name="purchaseaccount"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormLabel className="">
                                      Purchase Account
                                    </FormLabel>
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        {...field}
                                      >
                                        <SelectTrigger className="rounded border-2 border-green-600/40">
                                          <SelectValue placeholder="Select a purchase account" />
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
                                  <FormItem className="">
                                    <FormLabel className="">Amount</FormLabel>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600/40"
                                        placeholder=""
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* <FormField
                                control={form.control}
                                name="purchaseid"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormLabel className="">Purchaseid</FormLabel>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600/40"
                                        placeholder=""
                                        {...field}
                                        value={purchase.purchaseid}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              /> */}

                              <FormField
                                control={form.control}
                                name="purchasedate"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormLabel className="">
                                      purchase Date
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600/40"
                                        placeholder=""
                                        type="date"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Button
                                className="bg-green-600 w-[80px]"
                                type="submit"
                              >
                                Pay
                              </Button>
                            </form>
                          </Form>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button className="ml-2 bg-green-600 bg-destructive ">
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
                          onClick={() => deleteAction(purchase.purchaseid)}
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
      </div>
    </div>
  )
}
