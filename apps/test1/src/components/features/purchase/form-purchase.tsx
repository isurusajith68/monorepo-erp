'use client'

import { format } from 'date-fns'
import { CalendarIcon, Divide } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

import { TiDeleteOutline } from 'react-icons/ti'
import { CgAdd } from 'react-icons/cg'
import { FaPlus } from 'react-icons/fa'
import { MdOutlineRemoveCircleOutline } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'

import {
  DeletePurchase,
  getNextMaterialItem,
  getPrevMaterialItem,
  getPurchase,
  insertInvoice,
  insertPurchase,
  insertPurchasePayment,
  updateInvoice,
  updatePurchase,
} from './purchase-action'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SelectAllBank } from '../bank/bank-action'
import { getAllData } from '../vendors/vendor-actions'
import { getAllProjects } from '../projects/project-action'

export const detailRowSchema = z.object({
  id: z.coerce.number().optional(),
  item: z.string().min(2, {
    message: 'Item must be at selected.',
  }),
  utilities: z.string().min(2, {
    message: 'Purchase type must be at selected.',
  }),
  quantity: z.coerce.number().min(0, {
    message: 'Quantity must be at least 2 characters.',
  }),
  price: z.coerce.number().min(0, {
    message: 'Price must be at least 2 characters.',
  }),
  description: z.any().optional(),
  tax: z.coerce.number().min(0, {
    message: 'Tax must be at least 2 characters.',
  }),
  amount: z.coerce.number().optional(),
})

const FormSchema = z.object({
  pid: z.coerce.number().optional(),
  purchaseid: z.coerce.number().optional(),
  purchaseno: z.string().min(2, {
    message: 'purchaseno must be at least 2 characters.',
  }),
  sellername: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  sellertype: z.string().min(2, {
    message: 'Seller type must be selected.',
  }),
  purchasedate: z.string({
    required_error: 'A date of birth is required.',
  }),
  duedate: z.string({
    required_error: 'A date of birth is required.',
  }),
  purchasetype: z.string().min(2, {
    message: 'purchasetype must be at least 2 characters.',
  }),
  currency: z.string().min(2, {
    message: 'currency must be at least 2 characters.',
  }),
  project: z.string().min(1, {
    message: 'project must be at least 2 characters.',
  }),
  remark: z.string().optional(),
  purchasedetails: z.array(detailRowSchema),

  subtotal: z.coerce.number().optional(),
  discount: z.coerce.number().optional(),
  totalamount: z.coerce.number().optional(),
  totalpaid: z.coerce.number().optional(),
  dueamount: z.coerce.number().optional(),
})

const FormSchema2 = z.object({
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

//////////////component////////////////////

export default function FormPurchase({ id }: { id?: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currency: 'lkr',
      purchasedate: new Date().toISOString().split('T')[0], // Set today's date as default value
      duedate: new Date().toISOString().split('T')[0],
      remark: '',

      purchasedetails: [
        {
          item: 'other',
          quantity: 0,
          price: 0,
          utilities: '',
          description: '',
          tax: 0,
          amount: 0,
        },
      ],
    },
  })

  const form2 = useForm<z.infer<typeof FormSchema2>>({
    resolver: zodResolver(FormSchema2),
    defaultValues: {
      purchaseaccount: 'Cash',
      //purchasemethod: "",
      //amount: 0,
      purchasedate: new Date().toISOString().split('T')[0],
      // purchaseid: 0, // Default empty purchaseid
    },
  })

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    getValues: getValues2,
    trigger: trigger2,
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
    trigger: trigger,
    formState: {
      isDirty: isDirty,
      dirtyFields: dirtyFields,
      isLoading: isLoading,
      isSubmitSuccessful: isSubmitSuccessful,
    },
  } = form

  /////////////////use state////////////////////////

  const [projects, setProjects] = useState([])
  const [vendors, setVendors] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [paidStatus, setpaidStatus] = useState(false)
  const [banks, setBanks] = useState<any>([])

  const router = useRouter()
  const focusRef = useRef(null)

  ////////////////use efect////////////////////////

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getAllProjects()
      if (response.success) {
        setProjects(response.data)
        console.log('projects', projects)
      }
    }

    fetchProjects()

    const fetchVendors = async () => {
      const response = await getAllData()
      if (response.success) {
        setVendors(response.data)
      }
    }

    fetchVendors()

    SelectAllBank().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        console.log('reversedData', reversedData)
        setBanks(reversedData) // Set the reversed array to state
        console.log('banks', banks)
      } else {
        console.log('error')
      }

      // const fetchBanks = async () => {
      //   const response = await SelectAllBank();
      //   if (response.success) {
      //     setBanks(response.data);
      //   }
      //   console.log("banks",banks)
      //};

      //fetchBanks();
    })

    if (id) {
      const checkPurchase = async () => {
        const purchase = await getPurchase(Number(id ?? -1))
        console.log('purchase', purchase.data)

        form.reset(purchase.data)
        // const a=purchase.data.totalamount - purchase.data.totalpaid
        // console.log("a",typeof a)

        setValue(
          'dueamount',
          purchase.data.totalamount - purchase.data.totalpaid,
          { shouldDirty: false },
        )

        // await trigger("dueamount");  // Trigger validation to mark the field as dirty

        if (getValues('totalpaid') ?? 0 > 0) {
          setpaidStatus(true)
        }
      }
      checkPurchase()
    }

    // focusRef.current.focus()
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [id])

  const { fields, append, remove } = useFieldArray({
    name: 'purchasedetails',
    control: form.control,
  })

  ///////////////onSubmit//////////////////////

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    //const id = getValues("purchaseno");
    const { dueamount, ...dataWithoutDueAmount } = data // Destructure and exclude `dueamount`

    if (id) {
      let dirtyValues: any = {}
      for (const key in dirtyFields) {
        if (key != 'purchasedetails' && key !== 'dueamount') {
          dirtyValues[key] = data[key]
        }
      }
      await updatePurchase(dataWithoutDueAmount, dirtyValues, id.toString())

      toast({
        className: 'text-green-600',
        title: 'Purchase',
        description: <span>Update successfully..</span>,
        duration: 5000,
      })

      //router.push("/purchases/list");
      //router.refresh();
      //router.replace(router.asPath);
      window.location.reload()
      //router.reload();
    } else {
      const objId = await insertPurchase(data)
      setValue('purchaseid', objId.lastInsertRowid, { shouldDirty: false })

      toast({
        className: 'text-green-600',
        title: 'Purchase',
        description: <span>Added successfully..</span>,
        duration: 5000,
      })

      router.push(`/purchases/${objId.lastInsertRowid}`)
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function onSubmit2(data: z.infer<typeof FormSchema2>) {
    console.log('data trigger', data)

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

      //setValue("purchaseid", id);
      //setValue2("purchaseid", parseInt(id, 10));

      //const nid=parseInt(id);
      //console.log("const nid=parseInt(id);",nid)

      const objId = await insertPurchasePayment(data)
      setValue2('purchaseno', objId.lastInsertRowid, { shouldDirty: false })

      toast({
        className: 'text-green-600',
        title: 'Payment',
        description: <span>Added successfully..</span>,
        duration: 5000,
      })
      form2.reset()
      window.location.reload()
    } else {
      //data.purchaseid = getValues("purchaseid"); // Ensure purchaseid is set
      const objId = await insertPurchasePayment(data)
      setValue2('purchaseno', objId.lastInsertRowid, { shouldDirty: false })

      toast({
        className: 'text-blue-600',
        title: 'Invoice',
        description: <span>Added successfully..</span>,
        duration: 5000,
      })
    }

    setIsOpen(false)
    router.push(`/purchases/${id}`)
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleDelete() {
    const numID = Number(id)
    const objId = DeletePurchase(numID)

    toast({
      className: 'text-red-600',
      title: 'Purchase',
      description: <span>Delete successfully..</span>,
      duration: 5000,
    })

    //form.reset();
    router.push(`/purchases/list`)
  }

  // useEffect to update amount when quantity or price changes
  // useEffect(() => {
  //   watchFields.forEach((field, index) => {
  //     const quantity = field.quantity || 0;
  //     const price = field.price || 0;
  //     const amount = quantity * price;
  //     form.setValue(`purchasedetails.${index}.amount`, amount);

  //     console.log("amounnnnnnnnnnt",amount)
  //     console.log("amounnnnnnnnnnt")
  //   });
  // }, [watchFields, form]);

  const calculateSubtotal = () => {
    const subtotal = fields.reduce((total, field, index) => {
      const amount = Number(getValues(`purchasedetails.${index}.amount`)) || 0
      return total + amount
    }, 0)
    setValue('subtotal', subtotal, { shouldDirty: true })

    // Recalculate total amount with the current discount value
    const discount = Number(getValues('discount')) || 0
    calculateTotalAmount(discount)
  }

  const calculateTotalAmount = (discount: number) => {
    const subtotal = Number(getValues('subtotal')) || 0
    const totalAmount = subtotal - (subtotal * discount) / 100
    setValue('totalamount', totalAmount, { shouldDirty: true })
  }

  const getPrevItem = async () => {
    const ID = Number(id)
    const prevItem = await getPrevMaterialItem(ID ?? 0)

    if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
      router.push(`/purchases/${prevItem.data.purchaseid}`)
    } else {
      toast({
        className: 'text-red-600',
        title: 'Document Traverse',
        description: <span>Reached Start of the Purchase list..</span>,
        duration: 2000,
      })
    }
  }
  const getNextItem = async () => {
    const ID = Number(id)
    const nextItem = await getNextMaterialItem(ID ?? 0)
    if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
      router.push(`/purchases/${nextItem.data.purchaseid}`)
    } else {
      toast({
        className: 'text-red-600',
        title: 'Document Traverse',
        //description: <span>{nextItem.msg}</span>,
        description: <span>Reached End of the Purchase list..</span>,
        duration: 2000,
      })
    }
  }

  const handleValidateClick = async () => {
    const isValid = await trigger2()
    if (isValid) {
      console.log('Form is valid!')
      onSubmit2(form2.getValues())
    } else {
      console.log('Form is invalid!')
    }
  }

  return (
    <div className="flex mt-16">
      <div className="grow pt-4">
        {!id && (
          <>
            <p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Purchase</p>
            <div className="lg:ml-[85%] lg:mt-[-3%]">
              <Button
                className=" mr-5 bg-green-600 "
                type="button"
                onClick={() => router.push('/purchases/list')}
              >
                View List
              </Button>
            </div>
          </>
        )}
        {id && (
          <>
            <p className="text-xl font-bold pb-6 pt-3 pl-6 ">Update Purchase</p>
            <div className="flex flex-col-3 items-center justify-center lg:ml-[30%]">
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
            <div className="lg:ml-[85%] lg:mt-[-3%]">
              <Button
                className=" mr-5 bg-green-600 "
                type="button"
                onClick={() => router.push('/purchases/list')}
              >
                View List
              </Button>
            </div>
          </>
        )}
        <div className="flex justify-center  mx-6 py-4 ">
          <div className="">
            <Form {...form}>
              <form
                key={1}
                onSubmit={handleSubmit(onSubmit)}
                className="w-[100%] space-y-10"
                //onClick={(e) => e.stopPropagation()} // Stop propagation for Form 1
              >
                <div className="flex justify-center gap-10  mx-10 py-4 rounded border-2 mb-10 border-green-200 ">
                  <div className="w-[400px] space-y-6 m-6">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="purchaseid"
                        render={({ field }) => (
                          <FormItem className="flex ">
                            <FormLabel className="pt-4 w-[120px]">
                              Purchase <br />
                              ID
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder="Auto ID"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="sellername"
                        render={({ field }) => (
                          <FormItem className="flex">
                            <FormLabel className="pt-4 w-[120px]">
                              Vendor <br />
                              Name
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                  <SelectValue placeholder="Select a Vendor Name" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="other">Other</SelectItem>

                                    {vendors.map((vendor) => (
                                      <SelectItem
                                        key={vendor.vendorid}
                                        value={`${vendor.vendorname} `}
                                      >
                                        {vendor.vendorname}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {/* <FormDescription className="">This is your public display name.</FormDescription> */}

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem className="flex">
                            <FormLabel className="pt-4 w-[120px]">
                              Currency
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                {...field}
                              >
                                <SelectTrigger className="rounded border-2 border-green-600">
                                  <SelectValue placeholder="Select the Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="lkr"> LKR</SelectItem>
                                  <SelectItem value="usd">USD</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="duedate"
                        render={({ field }) => (
                          <FormItem className="flex">
                            <FormLabel className="pt-4 w-[120px]">
                              Due Date
                            </FormLabel>
                            {/* <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[260px] pl-3 text-left font-normal rounded border-2 border-green-600 w-[300px]",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "yyyy-MM-dd")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover> */}

                            <Input
                              type="date"
                              className="rounded border-2 border-green-600"
                              placeholder=""
                              {...field}
                            />

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="project"
                        render={({ field }) => (
                          <FormItem className="flex">
                            <FormLabel className="pt-4 w-[120px]">
                              Project
                            </FormLabel>
                            <FormControl>
                              <Select
                                // onValueChange={field.onChange}
                                // value={field.value}
                                onValueChange={(value) => {
                                  const selectedProject = projects.find(
                                    (project) => project.pname === value.trim(),
                                  )
                                  setValue('pid', selectedProject?.pid || '') // Set the pid or an empty string if not found
                                  field.onChange(value) // Update the value in the form
                                }}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                  <SelectValue placeholder="Select a project" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Project</SelectLabel>
                                    <SelectItem value={`${0}`}>None</SelectItem>
                                    {projects.map((project) => (
                                      <SelectItem
                                        key={project.pid}
                                        value={`${project.pid} `}
                                        // {()=>{setValue("pid",project.pid)}}
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

                  <div className="w-[400px] m-6 ">
                    <div className="space-y-6">
                      {/* <div className="">
                        <FormField
                          control={form.control}
                          name="vendorname"
                          render={({ field }) => (
                            <FormItem className="flex ">
                              <FormLabel className="pt-4 w-[120px]">
                                Seller Name
                              </FormLabel>
                              <FormControl>
                                {field.value === "other" ? (
                                  <FormField
                                    control={form.control}
                                    name="newsellername"
                                    render={({ field }) => (
                                      <FormItem className="flex ">
                                        <FormControl>
                                          <Input
                                            className="rounded border-2 border-green-600 w-[300px]"
                                            placeholder=""
                                            {...field}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                ) : (
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    {...field}
                                  >
                                    <SelectTrigger className="rounded border-2 border-green-600">
                                      <SelectValue placeholder="Select a seller type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="CEB">
                                        CEB
                                      </SelectItem>
                                      <SelectItem value="Water Board">
                                        Water Board
                                      </SelectItem>
                                      <SelectItem value="other">
                                        Other
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div> */}
                      <div className="">
                        <FormField
                          control={form.control}
                          name="purchaseno"
                          render={({ field }) => (
                            <FormItem className="flex">
                              <FormLabel className="pt-4 w-[120px]">
                                Purchase <br />
                                Ref No
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field} // Spread the field props here
                                  ref={(el) => {
                                    field.ref(el) // Manually call the field ref function
                                    focusRef.current = el // Also assign the element to your custom ref
                                  }}
                                  className="rounded border-2 border-green-600"
                                  placeholder=""
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <FormField
                          control={form.control}
                          name="sellertype"
                          render={({ field }) => (
                            <FormItem className="flex">
                              <FormLabel className="pt-4 w-[120px]">
                                Vendor <br />
                                Type
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  {...field}
                                >
                                  <SelectTrigger className="rounded border-2 border-green-600">
                                    <SelectValue placeholder="Select a vendor type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="utility provider">
                                      Utility Provider
                                    </SelectItem>
                                    <SelectItem value="wholesaler">
                                      Wholesaler
                                    </SelectItem>
                                    <SelectItem value="retailer">
                                      Retailer
                                    </SelectItem>
                                    <SelectItem value="distributor">
                                      Distributor
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="">
                        <FormField
                          control={form.control}
                          name="purchasetype"
                          render={({ field }) => (
                            <FormItem className="flex">
                              <FormLabel className="pt-4 w-[120px]">
                                Purchase <br />
                                Type
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  {...field}
                                >
                                  <SelectTrigger className="rounded border-2 border-green-600">
                                    <SelectValue placeholder="Select a purchase type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="goods">Goods</SelectItem>
                                    <SelectItem value="services">
                                      Services
                                    </SelectItem>
                                    <SelectItem value="assets">
                                      Assets
                                    </SelectItem>
                                    <SelectItem value="utilities">
                                      Utilities
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <FormField
                          control={form.control}
                          name="purchasedate"
                          render={({ field }) => (
                            <FormItem className="flex ">
                              <FormLabel className="pt-4 w-[120px]">
                                purchase Date
                              </FormLabel>
                              <Input
                                type="date"
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                              />

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="remark"
                          render={({ field }) => (
                            <FormItem className="flex">
                              <FormLabel className="pt-4 w-[120px]">
                                Remark
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder=""
                                  className="resize-none rounded border-2 border-green-600  h-[120px]"
                                  {...field}
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

                {/* ///////////////////////////////////////////table////////////////////////////////////////////// */}

                <div className="mt-8 w-[100%]">
                  <p className="text-xl font-bold pb-6 pt-6 ">Item Table</p>

                  {!paidStatus && (
                    <Button
                      className="mb-4"
                      type="button"
                      onClick={() =>
                        append({
                          itemdetails: '',
                          quantity: 0,
                          price: 0,
                          rate: 0,
                          tax: 0,
                          amount: 0,
                        })
                      }
                    >
                      Add row
                    </Button>
                  )}

                  <div className="border-2 rounded-lg border-green-300 p-4 bg-green-100 ">
                    <Table className="">
                      <TableHeader className="rounded-lg border-green-600 gap-0">
                        <TableRow>
                          {!paidStatus && (
                            <TableHead className="text-center">ADD</TableHead>
                          )}
                          <TableHead className="text-center">ITEM</TableHead>
                          <TableHead className="w-[150px] text-center">
                            EXPENSE CATEGORY
                          </TableHead>
                          <TableHead className="w-[300px] text-center ">
                            DESCRIPTION
                          </TableHead>
                          <TableHead className="w-[100px] text-center ">
                            QUANTITY
                          </TableHead>
                          <TableHead className="w-[150px] text-center">
                            UNIT PRICE
                          </TableHead>
                          <TableHead className="w-[150px] text-center">
                            TAX
                          </TableHead>
                          <TableHead className="w-[150px] text-center">
                            AMOUNT
                          </TableHead>
                          {!paidStatus && (
                            <TableHead className="text-center">
                              REMOVE
                            </TableHead>
                          )}
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {fields.map((field, index) => (
                          <TableRow key={field.id}>
                            {!paidStatus && (
                              <TableCell className="p-1 text-center font-medium">
                                <Button
                                  variant={'outline'}
                                  className="text-2xl"
                                  type="button"
                                  onClick={() =>
                                    append({
                                      itemdetails: '',
                                      quantity: 0,
                                      price: 0,
                                      rate: 0,
                                      tax: 0,
                                      amount: 0,
                                    })
                                  }
                                >
                                  <FaPlus className="text-destructive" />
                                </Button>
                              </TableCell>
                            )}

                            <TableCell className="text-right">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.item`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        {...field}
                                        disabled={paidStatus}
                                      >
                                        <SelectTrigger className="rounded border-2 border-green-600">
                                          <SelectValue placeholder="Select a Item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="other">
                                            Other
                                          </SelectItem>
                                          <SelectItem value="electricity bill">
                                            Electricity Bill
                                          </SelectItem>
                                          <SelectItem value="water bill">
                                            Water Bill
                                          </SelectItem>
                                          <SelectItem value="item3">
                                            Item 3
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell className="w-[150px]">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.utilities`}
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        {...field}
                                        disabled={paidStatus}
                                      >
                                        <SelectTrigger className="rounded border-2 border-green-600">
                                          <SelectValue placeholder="Select a purchase type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="goods">
                                            Goods
                                          </SelectItem>
                                          <SelectItem value="services">
                                            Services
                                          </SelectItem>
                                          <SelectItem value="assets">
                                            Assets
                                          </SelectItem>
                                          <SelectItem value="utilities">
                                            Utilities
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Textarea
                                        placeholder=""
                                        className="w-[300px] resize-none rounded border-2 border-green-600"
                                        {...field}
                                        disabled={paidStatus}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell className="text-right w-[100px]">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.quantity`}
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600 "
                                        placeholder="quantity"
                                        {...field}
                                        disabled={paidStatus}
                                        onChangeCapture={(e) => {
                                          const quantity =
                                            parseFloat(e.target.value) || 0
                                          setValue(
                                            `purchasedetails.${index}.quantity`,
                                            quantity,
                                          )

                                          // Get the current price
                                          const price = Number(
                                            getValues(
                                              `purchasedetails.${index}.price`,
                                            ) || 0,
                                          )
                                          const tax = Number(
                                            getValues(
                                              `purchasedetails.${index}.tax`,
                                            ) || 0,
                                          )

                                          // Calculate and set the amount
                                          const amount = price * quantity + tax
                                          setValue(
                                            `purchasedetails.${index}.amount`,
                                            amount,
                                          )
                                          calculateSubtotal()
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell className="text-right w-[150px]">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.price`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600"
                                        placeholder="price"
                                        {...field}
                                        disabled={paidStatus}
                                        onChangeCapture={(e) => {
                                          const price =
                                            parseFloat(e.target.value) || 0
                                          setValue(
                                            `purchasedetails.${index}.price`,
                                            price,
                                          )

                                          const quantity = Number(
                                            getValues(
                                              `purchasedetails.${index}.quantity`,
                                            ) || 0,
                                          )
                                          const tax = Number(
                                            getValues(
                                              `purchasedetails.${index}.tax`,
                                            ) || 0,
                                          )

                                          const amount = price * quantity + tax
                                          setValue(
                                            `purchasedetails.${index}.amount`,
                                            amount,
                                          )
                                          calculateSubtotal()
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell className="text-right w-[150px]">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.tax`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600"
                                        placeholder="tax"
                                        {...field}
                                        disabled={paidStatus}
                                        onChangeCapture={(e) => {
                                          const tax =
                                            parseFloat(e.target.value) || 0
                                          setValue(
                                            `purchasedetails.${index}.tax`,
                                            tax,
                                          )

                                          const price = Number(
                                            getValues(
                                              `purchasedetails.${index}.price`,
                                            ) || 0,
                                          )
                                          const quantity = Number(
                                            getValues(
                                              `purchasedetails.${index}.quantity`,
                                            ) || 0,
                                          )

                                          const amount = price * quantity + tax
                                          setValue(
                                            `purchasedetails.${index}.amount`,
                                            amount,
                                          )
                                          calculateSubtotal()
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell className="w-[150px]">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.amount`}
                                render={({ field }) => (
                                  <FormControl>
                                    <Input
                                      type="number"
                                      className="rounded border-2 border-green-600"
                                      {...field}
                                      readOnly
                                    />
                                  </FormControl>
                                )}
                              />
                            </TableCell>

                            <TableCell className="p-1 text-center font-medium">
                              {!paidStatus && (
                                <Button
                                  type="button"
                                  variant={'outline'}
                                  className="text-2xl"
                                  onClick={() => remove(index)}
                                >
                                  <MdOutlineRemoveCircleOutline className="text-destructive" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* //////////////////////////////////////////////////below form///////////////////////////////////////////////////// */}

                <div className="flex justify-end  ">
                  <div className=" w-[300px] rounded-lg bg-green-100 flex flex-col items-center  ">
                    <div className="p-6 ">
                      <FormField
                        control={form.control}
                        name="subtotal"
                        render={({ field }) => (
                          <FormItem className="flex ">
                            <FormLabel className="pt-4 w-[120px]">
                              Sub Total
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                readOnly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                          <FormItem className="flex ">
                            <FormLabel className="pt-4 w-[120px]">
                              Discount <br /> %
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                onChange={(e) => {
                                  const discount = Number(e.target.value) || 0
                                  field.onChange(e) // Ensure the form's state is updated
                                  calculateTotalAmount(discount)
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalamount"
                        render={({ field }) => (
                          <FormItem className="flex ">
                            <FormLabel className="pt-4 w-[120px]">
                              Total Amount
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                readOnly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalpaid"
                        render={({ field }) => (
                          <FormItem className="flex ">
                            <FormLabel className="pt-4 w-[120px]">
                              Total Paid
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                readOnly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dueamount"
                        render={({ field }) => (
                          <FormItem className="flex ">
                            <FormLabel className="pt-4 w-[120px]">
                              Due Amount
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                readOnly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        {!id && (
                          <Button
                            className="bg-green-600 mt-6 flex justify-end"
                            type="submit"
                          >
                            Submit
                          </Button>
                        )}
                        {id && (
                          <Button
                            className="bg-green-600 mt-6 flex justify-end"
                            type="submit"
                          >
                            update
                          </Button>
                        )}
                        {/* ///////////////////////////pay form////////////////////////////////////////////////////////////////////////////// */}
                        {id && (
                          <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                              <Button
                                className="bg-green-600 ml-4 mt-6"
                                type="button"
                                onClick={() => {
                                  setIsOpen(true)
                                  //setValue2("purchaseid", parseInt(id));
                                }}
                              >
                                Pay
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Record a Payment</DialogTitle>
                              </DialogHeader>
                              <div className="flex-row gap-4 py-4">
                                <div className=" items-center gap-4">
                                  <Form {...form2}>
                                    <form
                                      key={2}
                                      onSubmit={handleSubmit(onSubmit2)}
                                      className="space-y-6"
                                      //onClick={(e) => e.stopPropagation()} // Stop propagation for Form 2
                                    >
                                      <FormField
                                        control={form2.control}
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
                                        control={form2.control}
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
                                        control={form2.control}
                                        name="amount"
                                        render={({ field }) => (
                                          <FormItem className="">
                                            <FormLabel className="">
                                              Amount
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                className="rounded border-2 border-green-600/40"
                                                placeholder=""
                                                {...field}
                                                onChange={(e) =>
                                                  field.onChange(
                                                    parseFloat(
                                                      e.target.value,
                                                    ) || 0,
                                                  )
                                                } // Convert the value to a number
                                                type="number" // Set the input type to number for better user experience
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form2.control}
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

                                      {/* <Button
                                        className="bg-green-600 w-[80px]"
                                        type="submit"
                                        onClick={() => {
                                          setValue2("purchaseid", parseInt(id)); // Set purchaseid when opening the form
                                        }}
                                      >
                                        Pay
                                      </Button> */}

                                      <Button
                                        className="bg-green-600 w-[80px]"
                                        type="button"
                                        onClick={() => {
                                          setValue2('purchaseid', parseInt(id)) // Set purchaseid when opening the form
                                          handleValidateClick()
                                          //onSubmit2(form2.getValues());
                                        }}
                                      >
                                        Pay
                                      </Button>

                                      {/* onSubmit={form2.handleSubmit(onSubmit2)} */}
                                    </form>
                                  </Form>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {id && (
                          <Button
                            className="bg-red-600 ml-4 mt-6 "
                            type="button"
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
