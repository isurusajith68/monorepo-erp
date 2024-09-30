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
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import {
  DeleteBank,
  getBank,
  getNextMaterialItem,
  getPrevMaterialItem,
  InsertBank,
  SelectAllBank,
  updateBank,
} from './bank-action'
import { MdCancel } from 'react-icons/md'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import router from 'next/router'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  id: z.coerce.number().optional(),

  oname: z.string().min(2, {
    message: '',
  }),
  bname: z.string().min(2, {
    message: 'Enter Bank Name',
  }),
  acctype: z.string().min(2, {
    message: 'Select Account Type',
  }),
  accbranch: z.string().min(2, {
    message: 'Enter Branch Name',
  }),
  accnumber: z.coerce.number().min(5, {
    message: 'Bank account number must be at least 5 digits long',
  }),
  camount: z.coerce.number().min(2, {
    message: 'Enter The Current Balance Of Account',
  }),
})

function BankeForm({ id }: { id?: string }) {
  const [bank, setBank] = useState([])
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oname: 'bankname',
      bname: '',
      acctype: '',
      accbranch: '',
      accnumber: '',
      camount: '',
    },
  })

  useEffect(() => {
    if (id) {
      //form.setValue("id",id);
      const getPro = async () => {
        const pro = await getBank(Number(id ?? -1)) //-1 id set as-1(no user)
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
          Object.entries(data).filter(
            ([key]) => dirtyFields[key as keyof typeof dirtyFields],
          ),
        )

        console.log('Updating with dirty values:', dirtyValues) // Debugging

        const result = await updateBank(dirtyValues, id.toString())

        console.log('Update result:', result) // Debugging

        if (result.success) {
          toast({
            className: 'text-blue-600',
            title: 'Bank',
            description: <span>Updated successfully..</span>,
            duration: 5000,
          })
        } else {
          toast({
            className: 'text-red-600',
            title: 'Bank',
            description: <span>Update failed..</span>,
            duration: 5000,
          })
        }
      } else {
        const result = await InsertBank(data)
        setValue('id', result.lastInsertRowid, { shouldDirty: false })
        console.log('Insert result:', result) // Debugging
        router.push(`/bank/${result.lastInsertRowid}`)
        if (result.success) {
          toast({
            className: 'text-blue-600',
            title: 'Bank',
            description: <span>Added successfully..</span>,
            duration: 5000,
          })
        } else {
          toast({
            className: 'text-red-600',
            title: 'Bank',
            description: <span>Add failed..</span>,
            duration: 5000,
          })
        }
      }
    } catch (error) {
      console.error('Error occurred:', error)
      toast({
        className: 'text-blue-600',
        title: 'Bank',
        description: <span>Updated successfully..</span>,
        duration: 5000,
      })
    }
  }

  const deleteAction = async () => {
    if (id) {
      await DeleteBank(Number(id))
      toast({
        className: 'text-blue-600',
        title: 'Bank',
        description: <span>Deleted successfully..</span>,
        duration: 3000,
      })
    }
  }

  const getPrevItem = async () => {
    const prevItem = await getPrevMaterialItem(id ?? 0)
    if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
      router.push(`/bank/${prevItem.data.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached Start of banks accounts..</span>,
        duration: 2000,
      })
    }
  }
  const getNextItem = async () => {
    const nextItem = await getNextMaterialItem(id ?? 0)
    if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
      router.push(`/bank/${nextItem.data.id}`)
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
        <h2 className="text-2xl font-bold mb-4 mt-20 ml-5">New Bank Account</h2>
      )}
      {id && (
        <h2 className="text-2xl font-bold mb-4 mt-20 ml-5">
          Update Bank Account
        </h2>
      )}
      {id && (
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
      )}
      <div className="lg:ml-[75%] lg:mt-[-3%]">
        <Button
          className=" mr-5 bg-green-600 "
          type="button"
          onClick={() => router.push('/bank/')}
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
              name="bname"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <FormLabel>Bank Name</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4 lg:w-[80%] md:w-[88%]  sm:w-[82%]"
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
              name="acctype"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <FormLabel>Account Type</FormLabel>
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
                            <SelectItem value="Current">Current</SelectItem>
                            <SelectItem value="Savings">Savings</SelectItem>
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
              name="accbranch"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <FormLabel>Account Branch</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4 lg:w-[80%] md:w-[88%]  sm:w-[82%]"
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
              name="accnumber"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2 ">
                      <FormLabel>Account Number</FormLabel>
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
              name="camount"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <FormLabel>Current Balance</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="p-2 border-2 border-green-600  mr-4 lg:w-[80%] md:w-[88%]  sm:w-[82%]"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="justify-items-end flex">
              {!id && (
                <Button
                  type="submit"
                  className="mt-4 lg:ml-[37%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white  hover:bg-green-700"
                >
                  Submit
                </Button>
              )}
              {id && (
                <Button
                  type="submit"
                  className="mt-4 lg:ml-[37%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white  hover:bg-green-700"
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

export default BankeForm
