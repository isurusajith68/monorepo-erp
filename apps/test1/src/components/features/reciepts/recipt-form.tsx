'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import {
  DeleteRecipts,
  getNextMaterialItem,
  getPrevMaterialItem,
  getRecipts,
  InsertRecipt,
  updateRecipts,
} from './recipt-action'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { getAllProjects } from '../projects/project-action'
import { SelectAllBank } from '../bank/bank-action'

const FormSchema = z.object({
  id: z.coerce.number().optional(),

  rno: z.coerce.number().min(2, {
    message: '',
  }),
  name: z.string().min(2, {
    message: '',
  }),
  pnumber: z.coerce.number().min(2, {
    message: '',
  }),
  email: z.string().min(2, {
    message: '',
  }),
  pmethod: z.string().min(2, {
    message: '',
  }),
  amount: z.string().min(2, {
    message: '',
  }),
  baccount: z.string().min(2, {
    message: '',
  }),
  project: z.string().min(2, {
    message: '',
  }),
})

// export default function CustomerForm({ idSearchParam}: {idSearchParam?: string, }) {
export default function ReciptForm({ id }: { id?: string }) {
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [accounts, setAccounts] = useState([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rno: '',
      name: '',
      pnumber: '',
      email: '',
      pmethod: '',
      amount: '',
      baccount: '',
      project: '',
    },
  })

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getAllProjects()
      if (response.success) {
        setProjects(response.data)
      }
    }
    fetchProjects()
    const fetchAccounts = async () => {
      const response = await SelectAllBank()
      if (response.success) {
        setAccounts(response.data)
      }
    }
    fetchAccounts()
    if (id) {
      //form.setValue("id",id);
      const getPro = async () => {
        const pro = await getRecipts(Number(id ?? -1)) //-1 id set as-1(no user)
        form.reset(pro.data) //getcustomer return data from db.it set in form again from db
        console.log('hello', pro.data)
      }
      getPro()
    }
  }, [id])

  const {
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  } = form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data)
    try {
      const id = getValues('id')

      if (id) {
        const dirtyValues = Object.fromEntries(
          Object.entries(data).filter(([key]) => dirtyFields[key]),
        )

        console.log('Updating with dirty values:', dirtyValues) // Debugging

        const result = await updateRecipts(dirtyValues, id.toString())

        console.log('Update result:', result) // Debugging

        if (result.success) {
          toast({
            className: 'text-blue-600',
            title: 'Reciept',
            description: <span>Updated successfully..</span>,
            duration: 5000,
          })
        } else {
          toast({
            className: 'text-red-600',
            title: 'Reciept',
            description: <span>Update failed..</span>,
            duration: 5000,
          })
        }
      } else {
        const result = await InsertRecipt(data)
        setValue('id', result.lastInsertRowid, { shouldDirty: false })
        console.log('Insert result:', result) // Debugging
        router.push(`/reciepts/${result.lastInsertRowid}`)
        if (result.success) {
          toast({
            className: 'text-blue-600',
            title: 'Reciept',
            description: <span>Added successfully..</span>,
            duration: 5000,
          })
        } else {
          toast({
            className: 'text-red-600',
            title: 'Reciept',
            description: <span>Add failed..</span>,
            duration: 5000,
          })
        }
      }
    } catch (error) {
      console.error('Error occurred:', error)
      toast({
        className: 'text-blue-600',
        title: 'Reciept',
        description: <span>Updated successfully..</span>,
        duration: 5000,
      })
    }
  }

  const deleteAction = async () => {
    if (id) {
      await DeleteRecipts(Number(id))
      toast({
        className: 'text-blue-600',
        title: 'Reciept',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })
    }
  }

  const getPrevItem = async () => {
    const prevItem = await getPrevMaterialItem(id ?? 0)
    if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
      router.push(`/reciepts/${prevItem.data.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached Start of recipts..</span>,
        duration: 2000,
      })
    }
  }
  const getNextItem = async () => {
    const nextItem = await getNextMaterialItem(id ?? 0)
    if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
      router.push(`/reciepts/${nextItem.data.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>{nextItem.msg}</span>,
        duration: 2000,
      })
    }
  }

  return (
    <div>
      {!id && (
        <h2 className="text-2xl font-bold mb-4 mt-20 ml-5">New Reciept</h2>
      )}
      {id && (
        <h2 className="text-2xl font-bold mb-4 mt-20 ml-5">Update Reciept</h2>
      )}

      {id && (
        <div className="flex flex-col-3 items-center justify-center lg:ml-[35%]">
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
      <div className="lg:ml-[75%] lg:mt-[-3%]">
        <Button
          className=" mr-5 bg-green-600 lg:ml-[15%]"
          type="button"
          onClick={() => router.push('/reciepts')}
        >
          View List
        </Button>
      </div>

      <div className="p-8 rounded-lg ml-10 lg:w-[90%] md:w-[90%] sm:w-[80%]">
        <Form {...form}>
          <form
            className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-4 ml-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="rno"
              render={({ field }) => (
                <FormItem>
                  <div className=" mt-4 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Recipt NO </FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2 lg:ml-[10%]">
                      <FormLabel>Name</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4 lg:ml-[10%] lg:w-[80%] md:w-[88%]  sm:w-[82%]"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pnumber"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Phone Number</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600 mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2 lg:ml-[10%]">
                      <FormLabel>Email</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4 lg:ml-[10%] lg:w-[80%] md:w-[88%]  sm:w-[82%]"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pmethod"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <FormLabel>Payment Method</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]">
                            <SelectValue placeholder="select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bank">Bank</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Online">Online</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2 lg:ml-[10%]">
                      <FormLabel>Amount</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4 lg:ml-[10%] lg:w-[80%] md:w-[88%]  sm:w-[82%]"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="baccount"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <FormLabel>Bank Account</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]">
                            <SelectValue placeholder="select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Accounts</SelectLabel>
                              {accounts.map((accounts) => (
                                <SelectItem
                                  key={accounts.id}
                                  value={`${accounts.accnumber}`}
                                >
                                  {accounts.accnumber}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2 lg:ml-[10%]">
                      <FormLabel>Project</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="p-2 border-2 border-green-600  mr-4 lg:ml-[10%] lg:w-[80%] md:w-[88%]  sm:w-[82%]">
                            <SelectValue placeholder="select project" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Projects</SelectLabel>
                              {projects.map((projects) => (
                                <SelectItem
                                  key={projects.pid}
                                  value={`${projects.pname}`}
                                >
                                  {projects.pname}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h1></h1>
            <div className="justify-items-end flex">
              {!id && (
                <Button
                  type="submit"
                  className="mt-4 lg:ml-[45%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white  hover:bg-green-700"
                >
                  Submit
                </Button>
              )}
              {id && (
                <Button
                  type="submit"
                  className="mt-4 lg:ml-[45%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white  hover:bg-green-700"
                >
                  Update
                </Button>
              )}

              {id && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="mt-4 ml-5 px-4 py-2 md:w-[50%] lg:w-[20%] bg-red-600 text-white  hover:bg-red-700">
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
                      <AlertDialogAction onClick={() => deleteAction()}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
