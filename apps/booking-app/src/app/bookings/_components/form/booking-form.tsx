import { useEffect } from 'react'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import {
  useDeleteBookingMutation,
  useInsertBookingMutation,
  useUpdateBookingMutation,
} from '../../_services/mutation'
import {
  useGetBooking,
  useGetNextBooking,
  useGetPrevBooking,
} from '../../_services/queries'

const formSchema = z.object({
  roomnumber: z.coerce.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  id: z.number().optional(),
  checkin: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  checkout: z.string().min(2, {
    message: 'You must select a Date',
  }),
  telephone: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  adultcount: z.coerce.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  childrencount: z.coerce.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  bookingdate: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  roomprice: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const BookingForm = () => {
  const { id } = useParams()
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
    formState: { isDirty, dirtyFields, isSubmitSuccessful },
  } = form

  const updateMutation = useUpdateBookingMutation()
  const insertMutation = useInsertBookingMutation()
  const deleteMutation = useDeleteBookingMutation()

  const { data, isLoading, isError, error } = useGetBooking(id)

  useEffect(() => {
    form.reset(data)
  }, [data])

  async function onSubmit(data: any) {
    const id = getValues('id') // Check if data already exists

    if (id) {
      // If `id` exists, fetch updated data and display it in frontend
      try {
        let dirtyValues: any = {}

        // Capture only modified fields
        for (const key in dirtyFields) {
          dirtyValues[key] = data[key]
        }

        const resMutation = updateMutation.mutate({ id, dirtyValues })

        // Check if update was successful
        if (!updateMutation.isError) {
          toast({
            className: 'text-green-600',
            title: 'Booking',
            description: <span>Updated successfully.</span>,
            duration: 5000,
          })
        }
      } catch (error) {
        console.error('Error updating booking:', error)
      }
    } else {
      // If no `id`, insert a new booking
      try {
        const responseData = await insertMutation.mutateAsync({ data })

        if (responseData.success) {
          const newId = responseData.lastInsertRowid

          setValue('id', newId, { shouldDirty: false })

          toast({
            className: 'text-green-600',
            title: 'Booking',
            description: <span>Added successfully.</span>,
            duration: 2000,
          })

          navigate(`/booking/${newId}`)

          // Fetch the newly inserted booking and display it in the UI
          const newBooking = data.newBooking
          form.reset(newBooking) // Reset the form with new booking data
        } else {
          toast({
            className: 'text-red-600',
            title: 'Booking',
            description: <span>{responseData.msg}</span>,
            duration: 2000,
          })
        }
      } catch (error) {
        console.error('Error inserting booking:', error)
      }
    }
  }

  const deleteAction = async (id) => {
    if (id) {
      try {
        // console.log("Deleting booking with id:", id);
        const resMutation = deleteMutation.mutate({ id })

        // Show success toast notification
        toast({
          className: 'text-red-600',
          title: 'Booking',
          description: <span>Deleted successfully..</span>,
          duration: 3000,
        })

        // Navigate to the booking list after deletion
        navigate('/booking/add')
      } catch (error) {
        // Handle any error that occurs during the delete process
        console.error('Error deleting booking:', error)
        toast({
          className: 'text-red-600',
          title: 'Error',
          description: <span>Failed to delete the booking..</span>,
          duration: 3000,
        })
      }
    }
  }

  const {
    data: prevItem,
    isLoading: prevLoading,
    error: prevError,
  } = useGetPrevBooking(id)
  // console.log('prevvvvvvvvvvvvvvvvvvvvvvvv', prevItem)
  const getPrevItem = () => {
    if (prevItem && Object.keys(prevItem).length !== 0) {
      navigate(`/booking/${prevItem.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached Start of Booking ID</span>,
        duration: 2000,
      })
    }
  }

  const { data: nextItem } = useGetNextBooking(id)
  const getNextItem = () => {
    if (nextItem && Object.keys(nextItem).length !== 0) {
      navigate(`/booking/${nextItem.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached End of Booking ID</span>,
        duration: 2000,
      })
    }
  }

  return (
    <div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        {!id && <h1 className="text-2xl font-bold ">Add Booking </h1>}
        {id && <h1 className="text-2xl font-bold ">Update Booking </h1>}
        {/* <NavLink to={"list"}>View List</NavLink> */}
        <div className="gap-5 flex">
          {!id && (
            <Button
              onClick={() => navigate('/bookings')}
              className="bg-green-600"
            >
              View List
            </Button>
          )}
          {id && (
            <div className="gap-5 flex">
              <Button
                className="  bg-green-600"
                type="button"
                onClick={getPrevItem}
              >
                previous
              </Button>
              <Button
                className="  bg-green-600"
                type="button"
                onClick={getNextItem}
              >
                next
              </Button>
            </div>
          )}
        </div>
        {id && (
          <Button
            onClick={() => navigate('/booking/add')}
            className="bg-green-600"
          >
            + Add
          </Button>
        )}
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      {isLoading || updateMutation.isPending || prevLoading ? (
        <div> loading...</div>
      ) : (
        <div className="mt-5 w-full h-2/3 bg-green-100 rounded border border-green-300 p-10 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <div className="flex flex-col space-y-8 ">
                <div className=" w-full grid grid-cols-3 gap-4 ">
                  <FormField
                    control={form.control}
                    name="roomnumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Number</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="rounded border-2 border-green-600 bg-white"
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
                    name="checkin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-In</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="rounded border-2 border-green-600 bg-white"
                            placeholder=""
                            {...field}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split('T')[0]
                                : ''
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="checkout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-Out</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="rounded border-2 border-green-600 bg-white"
                            placeholder=""
                            {...field}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split('T')[0]
                                : ''
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="adultcount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adult Count</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="rounded border-2 border-green-600 bg-white"
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
                    name="childrencount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Children Count</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="rounded border-2 border-green-600 bg-white"
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
                    name="bookingdate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="rounded border-2 border-green-600 bg-white"
                            placeholder=""
                            {...field}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split('T')[0]
                                : ''
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telephone</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="rounded border-2 border-green-600 bg-white"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="rounded border-2 border-green-600 bg-white"
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
                    name="roomprice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Price</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="rounded border-2 border-green-600 bg-white"
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
                {!id && (
                  <Button type="submit" className="bg-green-600">
                    Save
                  </Button>
                )}
                {id && (
                  <Button type="submit" className="bg-green-600">
                    update
                  </Button>
                )}
                {/* <Button type="button">Close</Button> */}
                {id && (
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className=" bg-green-600 bg-destructive">
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
      )}
    </div>
  )
}

export default BookingForm
