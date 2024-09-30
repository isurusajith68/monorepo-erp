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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import {
  DeleteProjects,
  getNextMaterialItem,
  getPrevMaterialItem,
  getProject,
  InsertProject,
  updateProject,
} from './project-action'
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
import { MdCancel } from 'react-icons/md'
import { getAllCustomers } from '../customers/customer-actions'
import router from 'next/router'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  pid: z.coerce.number().optional(),

  powner: z.string().min(2, {
    message: '',
  }),
  pname: z.string().min(2, {
    message: '',
  }),
  estibudget: z.string().min(2, {
    message: '',
  }),
  prdate: z.string().min(2, {
    message: '',
  }),
  pdate: z.string().min(2, {
    message: '',
  }),
  pdescription: z.string().min(2, {
    message: '',
  }),
})

// export default function CustomerForm({ idSearchParam}: {idSearchParam?: string, }) {
export default function ProjectForm({ pid }: { pid?: string }) {
  const [customers, setCustomers] = useState([])
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      powner: '',
      pname: '',
      estibudget: '',
      prdate: new Date().toISOString().split('T')[0],
      pdate: new Date().toISOString().split('T')[0],
      pdescription: '',
    },
  })

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await getAllCustomers()
      if (response.success) {
        setCustomers(response.data)
      }
    }
    fetchCustomers()
    if (pid) {
      //form.setValue("id",id);
      const getPro = async () => {
        const pro = await getProject(Number(pid ?? -1)) //-1 id set as-1(no user)
        form.reset(pro.data) //getcustomer return data from db.it set in form again from db
        console.log('hello', pro.data)
      }
      getPro()
    }
  }, [pid])
  console.log(customers)

  const {
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  } = form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data)
    try {
      const id = getValues('pid')

      if (id) {
        const dirtyValues = Object.fromEntries(
          Object.entries(data).filter(([key]) => dirtyFields[key]),
        )

        const result = await updateProject(dirtyValues, id.toString())

        if (result.success) {
          toast({
            className: 'text-blue-600',
            title: 'Project',
            description: <span>Updated successfully..</span>,
            duration: 5000,
          })
        } else {
          toast({
            className: 'text-red-600',
            title: 'Project',
            description: <span>Update failed..</span>,
            duration: 5000,
          })
        }
      } else {
        const result = await InsertProject(data)
        setValue('pid', result.lastInsertRowid, { shouldDirty: false })
        console.log(data)
        router.push(`/projects/${result.lastInsertRowid}`)

        if (result.success) {
          toast({
            className: 'text-blue-600',
            title: 'Project',
            description: <span>Added successfully..</span>,
            duration: 5000,
          })
        } else {
          toast({
            className: 'text-red-600',
            title: 'Project',
            description: <span>Add failed..</span>,
            duration: 5000,
          })
        }
      }
    } catch (error) {
      console.error(error)
      toast({
        className: 'text-blue-600',
        title: 'Project',
        description: <span>Updated successfully..</span>,
        duration: 5000,
      })
    }
  }

  const deleteAction = async () => {
    if (pid) {
      await DeleteProjects(Number(pid))
      toast({
        className: 'text-blue-600',
        title: 'Project',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })
    }
  }

  const getPrevItem = async () => {
    const prevItem = await getPrevMaterialItem(pid ?? 0)
    if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
      router.push(`/projects/${prevItem.data.pid}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached Start of projects..</span>,
        duration: 2000,
      })
    }
  }
  const getNextItem = async () => {
    const nextItem = await getNextMaterialItem(pid ?? 0)
    if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
      router.push(`/projects/${nextItem.data.pid}`)
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
      {!pid && (
        <h2 className="text-2xl font-bold mb-4 mt-20 ml-5">New Project</h2>
      )}
      {pid && (
        <h2 className="text-2xl font-bold mb-4 mt-20 ml-5">Update Project</h2>
      )}

      {pid && (
        <div className="flex flex-col-3 items-center justify-center lg:ml-[33%]">
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
          className=" mr-5 bg-green-600 "
          type="button"
          onClick={() => router.push('/projects/')}
        >
          View List
        </Button>
      </div>

      <div className="p-8 rounded-lg ml-10  lg:w-[90%] md:w-[90%] sm:w-[80%]">
        <Form {...form}>
          <form
            className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-4 ml-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="pid"
              render={({ field }) => (
                <FormItem>
                  <div className=" mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Project NO </FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          readOnly
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
              name="powner"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Project Owner</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Customers</SelectLabel>
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
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pname"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Project Name</FormLabel>
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

            {/*         <FormField
              control={form.control}
              name="ptype"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Project type</FormLabel>
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
                            <SelectItem value="Person">Person</SelectItem>
                            <SelectItem value="Company">Company</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
*/}

            {/*        <FormField
              control={form.control}
              name="initialbudget"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Initial Payment</FormLabel>
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
              name="availablebudget"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2">
                      <FormLabel>Amount Due</FormLabel>
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
              name="account"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Account</FormLabel>
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
                            <SelectItem value="Person">Person</SelectItem>
                            <SelectItem value="Company">Company</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
*/}
            <FormField
              control={form.control}
              name="pdescription"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Project Description</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <textarea
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4 w-[100%] lg:w-[80%] md:w-[88%]  sm:w-[82%] h-32 "
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
              name="prdate"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 lg:mt-[-16%]">
                      <FormLabel>Project Registerd Date</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4  lg:w-[40%] md:w-[30%]  sm:w-[30%]"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1></h1>
            <FormField
              control={form.control}
              name="pdate"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Project End Date</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4  lg:w-[40%] md:w-[30%]  sm:w-[30%]"
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
              name="estibudget"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2">
                      <FormLabel>Estimated Budget</FormLabel>
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

            <h1></h1>
            <div className="justify-items-end flex">
              {!pid && (
                <Button
                  type="submit"
                  className="mt-4 lg:ml-[37%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white hover:bg-green-700"
                >
                  Submit
                </Button>
              )}
              {pid && (
                <Button
                  type="submit"
                  className="mt-4 lg:ml-[37%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white hover:bg-green-700"
                >
                  Update
                </Button>
              )}

              {pid && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="mt-4 ml-5 px-4 py-2 md:w-[50%] lg:w-[20%] bg-red-600 text-white hover:bg-red-700">
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
