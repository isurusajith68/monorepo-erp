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
import {
  useDeleteEmployeeMutation,
  useInsertEmployeeMutation,
  useUpdateEmployeeMutation,
} from '../../services/mutation'

import {
  useGetEmployee,
  useGetNextEmployee,
  useGetPrevEmployee,
} from '../../services/queries'

const formSchema = z.object({
  id: z.number().optional(),

  emname: z.string().min(2, {
    message: 'employee name must be at least 2 characters.',
  }),

  ememail: z.string().min(2, {
    message: 'employee email must be at least 2 characters.',
  }),

  emmobile: z.string().min(2, {
    message: 'employee mobile must be at least 2 characters.',
  }),

  emdesignation: z.string().min(2, {
    message: 'employee designation must be at least 2 characters.',
  }),

  emdepartment: z.string().min(2, {
    message: 'employee department must be at least 2 characters.',
  }),

  emhiredate: z.string().min(2, {
    message: 'You must select a Date',
  }),

  emaddress: z.string().min(2, {
    message: 'employee address must be at least 2 characters.',
  }),

  emsalary: z.string().min(2, {
    message: 'employee salary must be at least 2 characters.',
  }),

  emstatus: z.string().min(2, {
    message: 'employee status must be at least 2 characters.',
  }),
})

const EmployeeForm = () => {
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

  const updateEMutation = useUpdateEmployeeMutation()
  const insertEMutation = useInsertEmployeeMutation()
  const deleteEMutation = useDeleteEmployeeMutation()

  const { data, isLoading, isError, error } = useGetEmployee(id)

  useEffect(() => {
    form.reset(data)
  }, [data])

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

        const resMutation = updateEMutation.mutate({ id, dirtyValues })
        // console.log("Inserting new resMutation:", resMutation);
        // console.log("Inserting new booking:", updateMutation);

        // Check if update was successful
        if (!updateEMutation.isError) {
          toast({
            className: 'text-green-600',
            title: 'Employee',
            description: <span>Updated successfully.</span>,
            duration: 5000,
          })
        }
      } catch (error) {
        console.error('Error updating employee:', error)
      }
    } else {
      // If no `id`, insert a new booking
      try {
        const responseData = await insertEMutation.mutateAsync({ data })

        if (responseData.success) {
          const newId = responseData.lastInsertRowid
          // console.log("first",responseData.lastInsertRowid)

          // Set the newly inserted id to avoid duplicate insertions
          setValue('id', newId, { shouldDirty: false })

          toast({
            className: 'text-green-600',
            title: 'Employee',
            description: <span>Added successfully.</span>,
            duration: 2000,
          })

          navigate(`/employee/${newId}`)

          // Fetch the newly inserted booking and display it in the UI
          const newBooking = data.newBooking
          form.reset(newBooking) // Reset the form with new booking data
        }
      } catch (error) {
        console.error('Error inserting employee:', error)
      }
    }
  }

  const deleteAction = async (id) => {
    if (id) {
      try {
        // console.log("Deleting booking with id:", id);
        const resMutation = deleteEMutation.mutate({ id })

        toast({
          className: 'text-red-600',
          title: 'Employee',
          description: <span>Deleted successfully..</span>,
          duration: 3000,
        })

        // Navigate to the booking list after deletion
        navigate('/employee/add')
      } catch (error) {
        // Handle any error that occurs during the delete process
        console.error('Error deleting employee:', error)
        toast({
          className: 'text-red-600',
          title: 'Error',
          description: <span>Failed to delete the employee..</span>,
          duration: 3000,
        })
      }
    }
  }

  const {
    data: prevItem,
    isLoading: prevLoading,
    error: prevError,
  } = useGetPrevEmployee(id)
  console.log('prevvvvvvvvvvvvvvvvvvvvvvvv', prevItem)
  const getPrevItem = () => {
    if (prevItem && Object.keys(prevItem).length !== 0) {
      navigate(`/employee/${prevItem.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached Start of Employee ID</span>,
        duration: 2000,
      })
    }
  }

  const { data: nextItem } = useGetNextEmployee(id)
  const getNextItem = () => {
    if (nextItem && Object.keys(nextItem).length !== 0) {
      navigate(`/employee/${nextItem.id}`)
    } else {
      toast({
        className: 'text-blue-600',
        title: 'Document Traverse',
        description: <span>Reached End of Employee ID</span>,
        duration: 2000,
      })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mt-5 ml-10">
        {!id && <h1 className="text-2xl font-bold ">Add Employee </h1>}
        {id && <h1 className="text-2xl font-bold ">Update Employee </h1>}
        {/* <NavLink to={"list"}>View List</NavLink> */}
        <div className="flex gap-5">
          <Button
            onClick={() => navigate('/bookings')}
            className="bg-green-600"
          >
            View List
          </Button>
          {id && (
            <div className="flex gap-5">
              <Button
                className="bg-green-600 "
                type="button"
                onClick={getPrevItem}
              >
                previous
              </Button>
              <Button
                className="bg-green-600 "
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
      <hr className="mt-5 ml-10 border-2 border-green-300"></hr>

      {isLoading || updateEMutation.isPending || prevLoading ? (
        <div> loading...</div>
      ) : (
        <div className="w-full p-10 mt-5 bg-green-100 border border-green-300 rounded h-2/3 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <div className="flex flex-col space-y-8 ">
                <div className="grid w-full grid-cols-4 gap-4 ">
                  <FormField
                    control={form.control}
                    name="emname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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
                    name="ememail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
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
                    name="emmobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile</FormLabel>
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
                    name="emdesignation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation</FormLabel>
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
                    name="emdepartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
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
                    name="emhiredate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hire Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="bg-white border-2 border-green-600 rounded"
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
                    name="emaddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
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

                <FormField
                  control={form.control}
                  name="emsalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
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
                  name="emstatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
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
                            Are you sure you want to delete this employee?
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
        </div>
      )}
    </div>
  )
}

export default EmployeeForm
