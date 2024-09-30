'use client'
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRef, useState } from 'react'
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
  DeleteCus,
  DeleteCustomer,
  getCustomer,
  getNextMaterialItem,
  getPrevMaterialItem,
  insertcustomer,
  updateCustomer,
} from './customer-actions'
import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { MdCancel } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'

const FormSchema = z.object({
  cname: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Name must contain only alphabetic characters and spaces.',
    }),
  id: z.number().optional(),
  phone: z.string().regex(/^\+?[0-9]\d{9}$/, {
    message: 'Invalid phone number format.',
  }),
  nic: z.string().optional(),
  rdate: z.string().min(2, {
    message: 'You must select a Date',
  }),
  ctype: z.string().min(1, {
    message: 'You must select a customer type.',
  }),
  email: z.string().email().nullable().optional(),
  location: z.string().optional(),
})

export default function CustomerFormAdd({ id }: { id?: string }) {
  const router = useRouter()
  const focusRef = useRef(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nic: '',
      location: '',
      rdate: new Date().toISOString().split('T')[0], //default date
    },
  })

  useEffect(() => {
    if (id) {
      //form.setValue("id",id);
      const getCus = async () => {
        const cus = await getCustomer(Number(id ?? -1)) //-1 id set as-1(no user)
        form.reset(cus.data) //getcustomer return data from db.it set in form again from db
      }
      getCus()
    }

    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [id])

  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  } = form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data.phone)
    const id = getValues('id') // this checks if the data already exists in the database

    if (id) {
      // If an `id` exists, update the customer with only the changed fields (dirtyFields)
      let dirtyValues: any = {}

      for (const key in dirtyFields) {
        dirtyValues[key] = data[key]
      }

      console.log('dirtyValues', dirtyValues)

      await updateCustomer(dirtyValues, id.toString())
      toast({
        className: 'text-green-600',
        title: 'Customer',
        description: <span>Updated successfully..</span>,
        duration: 5000,
      })
    } else {
      // If no `id` exists, insert a new customer and get the new `id`
      const objId = await insertcustomer(data)
      setValue('id', objId.lastInsertRowid, { shouldDirty: false }) // Set the `id` to avoid adding the same data again

      toast({
        className: 'text-green-600',
        title: 'Customer',
        description: <span>Added successfully..</span>,
        duration: 2000,
      })
      // After inserting, use the newly generated `id`
      router.push(`/customers/${objId.lastInsertRowid}`)
    }
  }
  const getPrevItem = async () => {
    const prevItem = await getPrevMaterialItem(id ?? 0)
    if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
      router.push(`/customers/${prevItem.data.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached Start of Customer ID</span>,
        duration: 2000,
      })
    }
  }
  const getNextItem = async () => {
    const nextItem = await getNextMaterialItem(id ?? 0)
    if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
      router.push(`/customers/${nextItem.data.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>{nextItem.msg}</span>,
        duration: 2000,
      })
    }
  }

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

      router.push('/customers/list')
    }
  }

  return (
    <div className="flex flex-col items-center pt-4 ml-5 mr-5 mb-20 mt-12">
      <div className="grow pt-4">
        <div className="flex justify-between items-center pb-4">
          <div>
            {!id && (
              <p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Customer</p>
            )}
            {id && (
              <p className="text-xl font-bold pb-6 pt-3 pl-6 ">
                Update Customer
              </p>
            )}
          </div>
          {id && (
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
          )}
          <div>
            <Button
              className=" mr-5 bg-green-600"
              type="button"
              onClick={() => router.push('/customers/list')}
            >
              View List
            </Button>
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
                <div className="flex flex-wrap gap-6">
                  <div className="w-full md:w-[400px]">
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer ID</FormLabel>
                          <FormControl>
                            <Input
                              disabled
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
                      name="cname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Name</FormLabel>
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
                          <FormDescription>
                            The name of an individual customer or the name of a
                            company.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="mt-5">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
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
                    </div>

                    <FormField
                      control={form.control}
                      name="nic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NIC/BRN</FormLabel>
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
                      name="rdate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Customer / Company Registed Date
                          </FormLabel>
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
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
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              className="rounded border-2 border-green-600"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The Address of company or an individual person.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-end mt-10">
                      <div>
                        <Button
                          className="bg-green-600 mr-5"
                          type="button"
                          onClick={() => router.push('/customers/list')}
                        >
                          Cancel
                        </Button>
                      </div>
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
                      </div>
                      {id && (
                        <div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
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
                                  permanently delete your data and remove your
                                  data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600"
                                  onClick={() => {
                                    deleteAction(id)
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
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
