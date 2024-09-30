'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
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
import { useEffect, useState } from 'react'
import {
  DeleteInvoice,
  getAllProjects,
  getNextMaterialItem,
  getPrevMaterialItem,
  getVendor,
  insertPurchase,
  updateVendor,
} from './vendor-actions'
import { useRouter } from 'next/navigation'

export const detailRowSchema = z.object({
  id: z.coerce.number().optional(),
  item: z.string().optional(),
  quantity: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  utilities: z.string().optional(),
  description: z.string().optional(),
  tax: z.coerce.number().optional(),
  amount: z.coerce.number().optional(),
})

const FormSchema = z.object({
  vendorid: z.coerce.number().optional(),
  vendorname: z.string().min(2, {
    message: 'Vendor name must be at least 2 characters.',
  }),
  vendortype: z.string({
    message: 'Vendor type must be selected.',
  }),
  vendoraddress: z.string().min(2, {
    message: 'Vendor address is required.',
  }),
  email: z
    .string({
      required_error: 'Vendor email is required.',
    })
    .email('Invalid email address.'),

  phonenumber: z.string().min(2, {
    message: 'phone number is required.',
  }),
  vendorservicetype: z.string({
    message: 'Service type must be selected.',
  }),
})

//////////////component////////////////////

export default function FormVendors({ id }: { id?: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vendorid: '',
    },
  })

  /////////////////use state////////////////////////

  const [projects, setProjects] = useState([])
  const router = useRouter()
  ////////////////use efect////////////////////////

  useEffect(() => {
    //fetch project data

    const fetchProjects = async () => {
      const response = await getAllProjects()
      if (response.success) {
        setProjects(response.data)
      }
    }

    fetchProjects()

    if (id) {
      const checkPurchase = async () => {
        const purchase = await getVendor(Number(id ?? -1))
        form.reset(purchase.data)
      }
      checkPurchase()
    }
  }, [id])

  const {
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  } = form

  const { fields, append, remove } = useFieldArray({
    name: 'purchasedetails',
    control: form.control,
  })

  ///////////////onSubmit//////////////////////

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    //const id = getValues("vendorname");

    const id = getValues('vendorid') //this is used check alredy avaible that going to add data in db
    console.log('iddddddddd', id)

    if (id) {
      //   const dirtyValues = Object.fromEntries(
      //     Object.entries(data).filter(([key ]  ) => dirtyFields[key])
      // );

      let dirtyValues: any = {}

      for (const key in dirtyFields) {
        dirtyValues[key] = data[key]
      }

      console.log('dirtyValues', dirtyValues)
      // const dirtyObject = Object.keys(data).filter((key) => data[key] !== getValues(key));

      await updateVendor(dirtyValues, id.toString())

      toast({
        className: 'text-green-600',
        title: 'Vendor',
        description: <span>Updated successfully..</span>,
        duration: 5000,
      })

      router.refresh()
    } else {
      const objId = await insertPurchase(data)
      setValue('vendorid', objId.lastInsertRowid, { shouldDirty: false })

      toast({
        className: 'text-green-600',
        title: 'Vendor',
        description: <span>Added successfully..</span>,
        duration: 5000,
      })

      router.push(`/vendors/${objId.lastInsertRowid}`)
    }
  }

  function handleDelete() {
    const numID = Number(id)
    const objId = DeleteInvoice(numID)

    toast({
      className: 'text-red-600',
      title: 'Vendor',
      description: <span>Delete successfully..</span>,
      duration: 5000,
    })

    form.reset()

    router.push(`/vendors/${numID}`)
    setValue('vendorname', '')
    setValue('vendortype', '')
    setValue('vendoraddress', '')
    setValue('phonenumber', '')
    setValue('email', '')
    setValue('vendorid', '')

    router.push(`/vendors/list`)
  }

  const calculateSubtotal = () => {
    const subtotal = fields.reduce((total, field, index) => {
      const amount = Number(getValues(`purchasedetails.${index}.amount`)) || 0
      return total + amount
    }, 0)
    setValue('subtotal', subtotal)

    // Recalculate total amount with the current discount value
    const discount = Number(getValues('discount')) || 0
    calculateTotalAmount(discount)
  }

  const calculateTotalAmount = (discount: number) => {
    const subtotal = Number(getValues('subtotal')) || 0
    const totalAmount = subtotal - (subtotal * discount) / 100
    setValue('totalamount', totalAmount)
  }

  const getPrevItem = async () => {
    const ID = Number(id)
    const prevItem = await getPrevMaterialItem(ID ?? 0)

    if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
      router.push(`/vendors/${prevItem.data.vendorid}`)
    } else {
      toast({
        className: 'text-red-600',
        title: 'Document Traverse',
        description: <span>Reached Start of the Vendor List..</span>,
        duration: 2000,
      })
    }
  }
  const getNextItem = async () => {
    const ID = Number(id)
    const nextItem = await getNextMaterialItem(ID ?? 0)
    if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
      router.push(`/vendors/${nextItem.data.vendorid}`)
    } else {
      toast({
        className: 'text-red-600',
        title: 'Document Traverse',
        //description: <span>{nextItem.msg}</span>,
        description: <span>Reached End of the Vendor List..</span>,
        duration: 2000,
      })
    }
  }

  return (
    <div className="flex mt-16">
      <div className="grow pt-4">
        {!id && (
          <>
            <p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Vendor</p>

            <div className="lg:ml-[78%] lg:mt-[0%]">
              <Button
                className=" mr-5 bg-green-600 "
                type="button"
                onClick={() => router.push('/vendors/list')}
              >
                View List
              </Button>
            </div>
          </>
        )}

        {id && (
          <>
            <p className="text-xl font-bold pb-6 pt-3 pl-6 ">Update Vendor</p>
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
                onClick={() => router.push('/vendors/list')}
              >
                View List
              </Button>
            </div>
          </>
        )}
        <div className="flex justify-center rounded border-2 mb-10 border-green-200 bg-green-50/45 mx-20 py-10 mt-4 ">
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[100%] space-y-10 "
              >
                <div className="flex gap-10 space-x-16 ">
                  <div className="w-[400px] space-y-6 ">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="vendorid"
                        render={({ field }) => (
                          <FormItem className="flex ">
                            <FormLabel className="pt-4 w-[120px]">
                              Vendor ID
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex ">
                            <FormLabel className="pt-4 w-[120px]">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
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

                    <div>
                      <FormField
                        control={form.control}
                        name="vendortype"
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
                                  <SelectItem value="Company">
                                    Company
                                  </SelectItem>
                                  <SelectItem value="Person">Person</SelectItem>
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
                        name="vendorservicetype"
                        render={({ field }) => (
                          <FormItem className="flex">
                            <FormLabel className="pt-4 w-[120px]">
                              Service <br />
                              Type
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                {...field}
                              >
                                <SelectTrigger className="rounded border-2 border-green-600">
                                  <SelectValue placeholder="Select a service type" />
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
                  </div>

                  <div className="ml-6 w-[400px]  ">
                    <div className="space-y-6">
                      <div className="">
                        <FormField
                          control={form.control}
                          name="vendorname"
                          render={({ field }) => (
                            <FormItem className="flex ">
                              <FormLabel className="pt-4 w-[120px]">
                                Name
                              </FormLabel>
                              <FormControl>
                                <Input
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

                      <div className="">
                        <FormField
                          control={form.control}
                          name="phonenumber"
                          render={({ field }) => (
                            <FormItem className="flex ">
                              <FormLabel className="pt-4 w-[120px]">
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
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

                      <div className="">
                        <FormField
                          control={form.control}
                          name="vendoraddress"
                          render={({ field }) => (
                            <FormItem className="flex ">
                              <FormLabel className="pt-4 w-[120px]">
                                Address
                              </FormLabel>
                              <FormControl>
                                <Input
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

                      {/* <div className="grid justify-items-end pt-2">
                        <Button
                          className="bg-green-600 w-[80px] "
                          type="submit"
                        >
                          Submit
                        </Button>

                        {id && (
                          <Button
                            className="bg-red-600 ml-4 mt-6 "
                            type="button"
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        )}
                      </div> */}
                      <div className="flex justify-end space-x-4 pt-2">
                        {!id && (
                          <Button
                            className="bg-green-600 w-[80px]"
                            type="submit"
                          >
                            Submit
                          </Button>
                        )}

                        {id && (
                          <Button
                            className="bg-green-600 w-[80px]"
                            type="submit"
                          >
                            Update
                          </Button>
                        )}

                        {id && (
                          <Button
                            className="bg-red-600"
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
