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
  useInsertBookingMutation,
  useUpdateBookingMutation,
} from '../../_services/mutation'
import { useGetBooking, useGetPrevBooking } from '../../_services/queries'

const formSchema = z.object({
  roomnumber: z.coerce.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  //   id: z.string().min(2, {
  //     message: "Username must be at least 2 characters.",
  //   }),
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

// const fetchBookingData = async (id?:string) => {
//     const { data } = await Axios.get(`http://localhost:4000/booking/${id?? 0}`);
//     console.log("firstfetchhhh",data)
//     return data.data;
// };
const BookingForm = () => {
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
    formState: { isDirty, dirtyFields, isSubmitSuccessful },
  } = form

  const updateMutation = useUpdateBookingMutation()
  const insertMutation = useInsertBookingMutation()

  //   useEffect(() => {
  //     if (id) {
  //       const fetchBooking = async () => {
  //         try {
  //           // Make API request to get booking data by ID
  //           const response = await Axios.get(
  //             `http://localhost:4000/booking/${id}`
  //           );
  //           if (response.data.success) {
  //             // Reset the form with booking data
  //             console.log("id", response.data.data);
  //             form.reset(response.data.data);
  //           } else {
  //             console.error("booking not found:", response.data.msg);
  //           }
  //         } catch (error) {
  //           console.error("Error fetching booking:", error);
  //         }
  //       };

  //       fetchBooking();
  //     }
  //   }, [id, form]);

  // const { isPending , error, data } = useQuery({
  //     queryKey: ['repoData'],
  //     queryFn: () =>  Axios.get(`http://localhost:4000/booking/${id}`)
  //   })
  // console.log("qqq")

  const { data, isLoading, isError, error } = useGetBooking(id)
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["booking", id],
  //   queryFn: async () => {
  //     let data1;
  //     data1 = await Axios.get(`http://localhost:4000/booking/${id ?? 0}`);
  //     return data1.data.data;

  // let data
  // setTimeout(async() => {
  //    data = await Axios.get(`http://localhost:4000/booking/${id?? 0}`);
  //    return data.data;
  // }, 2000);

  // const p = new Promise((resolve) => {
  //     setTimeout(async() => {
  //        const data = await Axios.get(`http://localhost:4000/booking/${id?? 0}`);
  //        console.log("data",data.data.data)
  //         resolve(data.data.data);
  //     }, 2000);
  // })
  // return p

  //     // return fetchBookingData(id)
  //   },
  // });

  useEffect(() => {
    form.reset(data)
    // console.log("firstgggggggggg",data);
  }, [data])

  //------------------------------------------------------------------------------------------------

  // function onSubmit(data: any) {
  //   // // console.log("first")
  //   // const sendData = async () => {
  //   //   const response = await Axios.post(
  //   //     "http://localhost:4000/booking",
  //   //     data
  //   //   );
  //   //   console.log("response.data", response.data);
  //   // };

  //   // sendData();

  //   // // axios.post("https://reqres.in/api/login", userData).then((response) => {
  //   // //   console.log(response.status, response.data.token);
  //   // // });

  //   // // navigate("/");
  //   // // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", values);
  //   // toast({
  //   //     className: "text-green-600",
  //   //     title: "Booking",
  //   //     description: <span>Added successfully..</span>,
  //   //     duration: 2000,
  //   //   })

  //   console.log("data", data);
  //   const id = getValues("id"); // this checks if the data already exists in the database

  //   if (id) {
  //     // If an `id` exists, update the customer with only the changed fields (dirtyFields)
  //     let dirtyValues: any = {};

  //     for (const key in dirtyFields) {
  //       dirtyValues[key] = data[key];
  //     }

  //     console.log("dirtyValues", dirtyValues);

  //   //   await updateCustomer(dirtyValues, id.toString());
  //     toast({
  //       className: "text-green-600",
  //       title: "Customer",
  //       description: <span>Updated successfully..</span>,
  //       duration: 5000,
  //     });
  //   } else {
  //     // If no `id` exists, insert a new customer and get the new `id`
  //     console.log(data);
  //     const sendData = async () => {
  //       const response = await Axios.post(
  //         "http://localhost:4000/customer",
  //         data
  //       );
  //       console.log("response.data", response.data);
  //     };

  //     sendData();
  //     setValue("id", objId.lastInsertRowid, { shouldDirty: false }); // Set the `id` to avoid adding the same data again

  //     toast({
  //       className: "text-green-600",
  //       title: "Customer",
  //       description: <span>Added successfully..</span>,
  //       duration: 2000,
  //     });
  //     // After inserting, use the newly generated `id`
  //     navigate(`/customers/${objId.lastInsertRowid}`);
  //   }
  // }

  // async function onSubmit(data: any) {
  //   const id = getValues("id"); // Check if data already exists
  //   console.log("Form data:", data);

  //   if (id) {
  //     // If `id` exists, fetch updated data and display it in frontend
  //     try {
  //       let dirtyValues: any = {};

  //       // Capture only modified fields
  //       for (const key in dirtyFields) {
  //         dirtyValues[key] = data[key];
  //       }

  //       console.log("Dirty Values (Fields to Update):", dirtyValues);

  //       // Use mutateAsync for update mutation
  //       const resMutation = await updateMutation.mutateAsync({ id, dirtyValues });
  //       console.log("Update resMutation:", resMutation);

  //       // Check if the update was successful
  //       if (resMutation && !updateMutation.isError) {
  //         toast({
  //           className: "text-green-600",
  //           title: "Booking",
  //           description: <span>Updated successfully.</span>,
  //           duration: 5000,
  //         });

  //         // Optionally reset the form with updated data (if returned by the API)
  //         const updatedData = resMutation.updatedBooking;
  //         form.reset(updatedData);
  //       }
  //     } catch (error) {
  //       console.error("Error updating booking:", error);
  //     }
  //   } else {
  //     // If no `id`, insert a new booking
  //     try {
  //       // Use mutateAsync for insert mutation
  //       const resMutation = await insertMutation.mutateAsync({ data });
  //       console.log("Insert resMutation:", resMutation);

  //       // Check if the insertion was successful
  //       if (resMutation && insertMutation.isSuccess) {
  //         const newId = resMutation.lastInsertRowid;
  //         console.log("Newly inserted ID:", newId);

  //         // Set the newly inserted id to avoid duplicate insertions
  //         setValue("id", newId, { shouldDirty: false });

  //         toast({
  //           className: "text-green-600",
  //           title: "Booking",
  //           description: <span>Added successfully.</span>,
  //           duration: 2000,
  //         });

  //         // Optionally navigate to the booking detail page after successful insert
  //         navigate(`/booking/${newId}`);

  //         // Fetch the newly inserted booking and display it in the UI
  //         const newBooking = resMutation.newBooking;
  //         form.reset(newBooking); // Reset the form with new booking data
  //       }
  //     } catch (error) {
  //       console.error("Error inserting booking:", error);
  //     }
  //   }
  // }

  async function onSubmit(data: any) {
    const id = getValues('id') // Check if data already exists
    // console.log("Form data:", data);

    if (id) {
      // If `id` exists, fetch updated data and display it in frontend
      try {
        let dirtyValues: any = {}

        // Capture only modified fields
        for (const key in dirtyFields) {
          dirtyValues[key] = data[key]
        }

        // console.log("Dirty Values (Fields to Update):", dirtyValues);

        // const mutation = useMutation({
        //     mutationFn: () => {
        //       return Axios.put(`http://localhost:4000/bookings/${id}`, dirtyValues);
        //     },
        //   });
        // Send update request
        // const response = await Axios.put(
        //   `http://localhost:4000/bookings/${id}`,
        //   dirtyValues
        // );
        const resMutation = updateMutation.mutate({ id, dirtyValues })
        // console.log("Inserting new resMutation:", resMutation);
        // console.log("Inserting new booking:", updateMutation);

        // Check if update was successful
        if (!updateMutation.isError) {
          toast({
            className: 'text-green-600',
            title: 'Booking',
            description: <span>Updated successfully.</span>,
            duration: 5000,
          })

          // Update the UI with the new data (you can handle this as per your frontend logic)
          //   const updatedData = response.data.updatedBooking;
          //   // Example: Set updated data into the form
          //   form.reset(updatedData);
        }
      } catch (error) {
        console.error('Error updating booking:', error)
      }
    } else {
      // If no `id`, insert a new booking
      try {
        // const resMutation = insertMutation.mutate({ data });
        // console.log("Inserting new resMutation:", resMutation);
        // console.log("Inserting new booking:", insertMutation);
        const responseData = await insertMutation.mutateAsync({ data })
        // console.log("Response Data from Mutation:", responseData);

        // const response = await Axios.post(
        //   "http://localhost:4000/booking",
        //   data
        // );
        if (responseData.success) {
          const newId = responseData.lastInsertRowid
          // console.log("first",responseData.lastInsertRowid)

          // Set the newly inserted id to avoid duplicate insertions
          setValue('id', newId, { shouldDirty: false })

          toast({
            className: 'text-green-600',
            title: 'Booking',
            description: <span>Added successfully.</span>,
            duration: 2000,
          })
          // console.log("idddddddddddddddddddddddddddd",newId)
          // Optionally navigate to the booking detail page after successful insert
          navigate(`/booking/${newId}`)

          // Fetch the newly inserted booking and display it in the UI
          const newBooking = data.newBooking
          form.reset(newBooking) // Reset the form with new booking data
        }

        // if (response.data.success) {
        //   const newId = response.data.lastInsertRowid;

        //   // Set the newly inserted id to avoid duplicate insertions
        //   setValue("id", newId, { shouldDirty: false });

        //   toast({
        //     className: "text-green-600",
        //     title: "Booking",
        //     description: <span>Added successfully.</span>,
        //     duration: 2000,
        //   });

        //   // Optionally navigate to the booking detail page after successful insert
        //   navigate(`/booking/${newId}`);

        //   // Fetch the newly inserted booking and display it in the UI
        //   const newBooking = response.data.newBooking;
        //   form.reset(newBooking); // Reset the form with new booking data
        // }
      } catch (error) {
        console.error('Error inserting booking:', error)
      }
    }
  }

  //   const deleteAction = async (id) => {

  //     if (id) {
  //       try {
  //         console.log("Deleting customer with id:", id);

  //         // Make the DELETE request to the backend API
  //         await Axios.delete(`http://localhost:4000/deletecustomers/${id}`);

  //         // Show success toast notification
  //         toast({
  //           className: "text-red-600",
  //           title: "Customer",
  //           description: <span>Deleted successfully..</span>,
  //           duration: 3000,
  //         });

  //         // Navigate to the customer list after deletion
  //         navigate("/booking/add");
  //       } catch (error) {
  //         // Handle any error that occurs during the delete process
  //         console.error("Error deleting customer:", error);
  //         toast({
  //           className: "text-red-600",
  //           title: "Error",
  //           description: <span>Failed to delete the customer..</span>,
  //           duration: 3000,
  //         });
  //       }
  //     }
  //   };

  const deleteAction = async (id) => {
    if (id) {
      try {
        // console.log("Deleting booking with id:", id);

        // Make the DELETE request to the backend API
        await Axios.delete(`http://localhost:4000/deletebooking/${id}`)

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
  console.log('prevvvvvvvvvvvvvvvvvvvvvvvv', prevItem)
  const getPrevItem = () => {
    if (prevItem && Object.keys(prevItem).length !== 0) {
      navigate(`/booking/${prevItem.id}`)
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
    const nextItem = await Axios.get(
      `http://localhost:4000/next-material-item/${id ?? 0}`,
    )

    if (nextItem.data.data && Object.keys(nextItem.data.data).length !== 0) {
      navigate(`/booking/${nextItem.data.data.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached End of Customer ID</span>,
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
          <Button
            onClick={() => navigate('/bookings')}
            className="bg-green-600"
          >
            View List
          </Button>
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
        {!id && (
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
