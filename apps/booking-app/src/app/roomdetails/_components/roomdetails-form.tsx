import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Link, useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import {
  useDeleteBookingMutation,
  useInsertBookingMutation,
  useUpdateBookingMutation,
} from '../../bookings/_services/mutation'

import {
  useGetBooking,
  useGetNextBooking,
  useGetPrevBooking,
} from '../../bookings/_services/queries'
import { Checkbox } from '@/components/ui/checkbox'
import {
  useInsertRoomDetailsMutation,
  useUpdateRoomDetailsMutation,
} from '../_services/mutation'
import { useGetRoomDetails } from '../_services/queries'

const formSchema = z.object({
  roomnumber: z.coerce.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  id: z.number().optional(),

  roomtype: z.string().min(2, {
    message: 'You must select a Date',
  }),
  selectedprice: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  price: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  maintenance: z.boolean().default(false).optional(),
  roomview: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const RoomDetailsForm = () => {
  const { id } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maintenance: false,
    },
  })
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isSubmitSuccessful },
  } = form

  const updateMutation = useUpdateRoomDetailsMutation()
  const insertMutation = useInsertRoomDetailsMutation()
  const deleteMutation = useDeleteBookingMutation()

  const { data, isLoading, isError, error } = useGetRoomDetails(id)

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

          navigate(`/roomdetails/${newId}`)

          // Fetch the newly inserted booking and display it in the UI
          const newRoomdetail = data.newRoomdetail
          form.reset(newRoomdetail) // Reset the form with new booking data
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
        {!id && <h1 className="text-2xl font-bold ">Add Room Details </h1>}
        {id && <h1 className="text-2xl font-bold ">Update Room Details</h1>}
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
            onClick={() => navigate('/roomdetails/add')}
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
                        <FormLabel>Room No</FormLabel>
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
                    name="roomtype"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Type</FormLabel>
                        <FormControl>
                          {/* <Select
                              onValueChange={field.onChange}
                            //   value={field.value || "LKR"}
                            >
                              <SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <SelectValue placeholder="select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="LKR">LKR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                              </SelectContent>
                            </Select> */}
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px] border-2 border-green-600 bg-white">
                              <SelectValue placeholder="select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="deluxe">Deluxe</SelectItem>
                              <SelectItem value="suite">Suite</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomview"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room View</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px] border-2 border-green-600 bg-white">
                              <SelectValue placeholder="select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ocean">Ocean</SelectItem>
                              <SelectItem value="street">Street</SelectItem>
                              <SelectItem value="pool">Pool</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="selectedprice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selected Price</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px] border-2 border-green-600 bg-white">
                              <SelectValue placeholder="select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ro">RO Price</SelectItem>
                              <SelectItem value="bb">BB Price</SelectItem>
                              <SelectItem value="hb">HB Price</SelectItem>
                              <SelectItem value="fb">FB Price</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
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
                <div className="w-full grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="maintenance"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            This Room Cant't book because of maintenance
                          </FormLabel>
                          {/* <FormDescription>
                            You can manage your mobile notifications in the{' '}
                            <Link to="/examples/forms">mobile settings</Link>{' '}
                            page.
                          </FormDescription> */}
                        </div>
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

export default RoomDetailsForm
