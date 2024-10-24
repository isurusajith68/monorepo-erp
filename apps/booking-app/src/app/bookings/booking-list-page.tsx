import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useGetAllBooking } from './_services/queries'
import { useDeleteBookingMutation } from './_services/mutation'
import { useQueryClient } from '@tanstack/react-query'

export default function BookingListPage() {
  const { toast } = useToast()
  const [booking, setBooking] = useState([])
  const navigate = useNavigate()
  const deleteMutation = useDeleteBookingMutation()
  const queryClient = useQueryClient()

  const { data, isSuccess, isLoading } = useGetAllBooking()
  // console.log("first",data)

  useEffect(() => {
    // Fetch booking data from the backend
    try {
      if (isSuccess) {
        // console.log('id', data)
        const sortedData = data.sort((a: any, b: any) => b.id - a.id)
        setBooking(sortedData)
      } else {
        console.error('booking not found:', data.msg)
      }
    } catch (error) {
      console.error('Error fetching booking:', error)
    }
  }, [data, isSuccess])

  const handleEdit = (id: number) => {
    navigate(`/booking/${id}`)
  }

  // if(isLoading){
  //   return <h1>Loading...</h1>
  // }

  const deleteAction = async (id: number) => {
    if (id) {
      try {
        // Trigger delete mutation
        await deleteMutation.mutateAsync({ id })

        // Invalidate the query to refetch the data
        queryClient.invalidateQueries() // Replace with the actual query key used in `useGetAllBooking`

        // Show success toast notification
        toast({
          className: 'text-red-600',
          title: 'Booking',
          description: <span>Deleted successfully.</span>,
          duration: 3000,
        })
      } catch (error) {
        // Handle any error that occurs during the delete process
        console.error('Error deleting booking:', error)
        toast({
          className: 'text-red-600',
          title: 'Error',
          description: <span>Failed to delete the booking.</span>,
          duration: 3000,
        })
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mt-5 ml-10">
        <h1 className="text-2xl font-bold ">View Booking</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <Button
          onClick={() => navigate('/booking/add')}
          className="bg-green-600"
        >
          + Add
        </Button>
      </div>
      <hr className="mt-5 ml-10 border-2 border-green-300"></hr>

      <Table className="mt-10 overflow-hidden rounded-xl">
        <TableHeader className="text-center bg-green-300">
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Room No</TableHead>
            <TableHead className="text-center">Check In</TableHead>
            <TableHead className="text-center">Check Out </TableHead>
            <TableHead className="text-center">Telephone</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Adult Count</TableHead>
            <TableHead className="text-center">Children Count</TableHead>
            <TableHead className="text-center">Booking Date</TableHead>
            <TableHead className="text-center">Room Price </TableHead>
            <TableHead className="text-center"> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-green-50">
          {booking.map((booking: any) => (
            <TableRow key={booking.id}>
              <TableCell className="text-center">{booking.id}</TableCell>
              <TableCell className="text-center">
                {booking.roomnumber}
              </TableCell>

              <TableCell className="text-center">{booking.checkin}</TableCell>
              <TableCell className="text-center">{booking.checkout}</TableCell>
              <TableCell className="text-center">{booking.telephone}</TableCell>
              <TableCell className="text-center">{booking.email}</TableCell>
              <TableCell className="text-center">
                {booking.adultcount}
              </TableCell>
              <TableCell className="text-center">
                {booking.childrencount}
              </TableCell>
              <TableCell className="text-center">
                {booking.bookingdate}
              </TableCell>
              <TableCell className="text-center">{booking.roomprice}</TableCell>
              <TableCell className="flex text-center">
                <Button
                  className="ml-5 bg-green-600"
                  onClick={() => handleEdit(booking.id)}
                  type="button"
                >
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger>
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
                        delete your data and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600"
                        onClick={() => deleteAction(booking.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
