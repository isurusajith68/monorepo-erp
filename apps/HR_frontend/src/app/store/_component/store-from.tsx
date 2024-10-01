import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  //   id: z.string().min(2, {
  //     message: "Username must be at least 2 characters.",
  //   }),
  id: z.number().optional(),
  itemname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  itemdes: z.string().min(2, {
    message: 'You must select a Date',
  }),
  itemowner: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})
const StoreForm = () => {
  const { id } = useParams()
  // const id= params.id;
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  } = form

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          // Make API request to get customer data by ID
          const response = await Axios.get(`http://localhost:4000/store/${id}`)
          if (response.data.success) {
            // Reset the form with customer data
            console.log('id', response.data.data)
            form.reset(response.data.data)
          } else {
            console.error('item not found:', response.data.msg)
          }
        } catch (error) {
          console.error('Error fetching item:', error)
        }
      }

      fetchCustomer()
    }
  }, [id, form])

  async function onSubmit(data: any) {
    const id = getValues('id') // Check if data already exists
    console.log('Form data:', data)

    if (id) {
      // If `id` exists, fetch updated data and display it in frontend
      try {
        let dirtyValues: any = {}

        // Capture only modified fields
        for (const key in dirtyFields) {
          dirtyValues[key] = data[key]
        }

        console.log('Dirty Values (Fields to Update):', dirtyValues)

        // Send update request
        const response = await Axios.put(
          `http://localhost:4000/store/${id}`,
          dirtyValues,
        )

        // Check if update was successful
        if (response.data.success) {
          toast({
            className: 'text-green-600',
            title: 'Booking',
            description: <span>Updated successfully.</span>,
            duration: 5000,
          })

          // Update the UI with the new data (you can handle this as per your frontend logic)
          const updatedData = response.data.updateItem
          // Example: Set updated data into the form
          reset(updatedData)
        }
      } catch (error) {
        console.error('Error updating item:', error)
      }
    } else {
      // If no `id`, insert a new booking
      try {
        console.log('Inserting new item:', data)

        const response = await Axios.post('http://localhost:4000/store', data)

        if (response.data.success) {
          const newId = response.data.lastInsertRowid

          // Set the newly inserted id to avoid duplicate insertions
          setValue('id', newId, { shouldDirty: false })

          toast({
            className: 'text-green-600',
            title: 'Store',
            description: <span>Added successfully.</span>,
            duration: 2000,
          })

          // Optionally navigate to the customer detail page after successful insert
          navigate(`/store/${newId}`)

          // Fetch the newly inserted booking and display it in the UI
          const newitem = response.data.newitem
          reset(newitem) // Reset the form with new booking data
        }
      } catch (error) {
        console.error('Error inserting item:', error)
      }
    }
  }

  const deleteAction = async (id) => {
    if (id) {
      try {
        console.log('Deleting booking with id:', id)

        // Make the DELETE request to the backend API
        await Axios.delete(`http://localhost:4000/deleteitem/${id}`)

        // Show success toast notification
        toast({
          className: 'text-red-600',
          title: 'Booking',
          description: <span>Deleted successfully..</span>,
          duration: 3000,
        })

        // Navigate to the customer list after deletion
        navigate('/booking/add')
      } catch (error) {
        // Handle any error that occurs during the delete process
        console.error('Error deleting customer:', error)
        toast({
          className: 'text-red-600',
          title: 'Error',
          description: <span>Failed to delete the customer..</span>,
          duration: 3000,
        })
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mt-5 ml-10">
        <h1 className="text-2xl font-bold ">Store {id}</h1>
        {/* <NavLink to={"list"}>View List</NavLink> */}
        {id && <Button onClick={() => navigate('/booking/add')}>Add</Button>}
      </div>
      <hr className="mt-5 ml-10 border-2 border-green-300"></hr>

      <div className="w-full p-10 mt-5 bg-green-100 border border-green-300 rounded h-2/3 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="flex flex-col space-y-8 ">
              <div className="grid w-full grid-cols-3 gap-4 ">
                <FormField
                  control={form.control}
                  name="itemname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="bg-white border-2 border-green-600 rounded"
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
                  name="itemdes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Description</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="bg-white border-2 border-green-600 rounded"
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
                  name="itemowner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Owner</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="bg-white border-2 border-green-600 rounded"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button type="submit">Save</Button>
              <Button type="button">Close</Button>
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
                          This action cannot be undone. This will permanently
                          delete your data and remove your data from our
                          servers.
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
          </form>
        </Form>

        <div></div>
      </div>
    </div>
  )
}

export default StoreForm
