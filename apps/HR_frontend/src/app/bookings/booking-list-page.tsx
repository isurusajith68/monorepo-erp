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

export default function BookingListPage() {
  const [booking, setBooking] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch booking data from the backend
    const fetchBooking = async () => {
      try {
        // Make API request to get booking data by ID
        const response = await Axios.get(`http://localhost:4000/allbookings`)
        if (response.data.success) {
          // Reset the form with booking data
          console.log('id', response.data.data)
          const sortedData = response.data.data.sort(
            (a: any, b: any) => b.id - a.id,
          )
          setBooking(sortedData)
          // form.reset(response.data.data);
        } else {
          console.error('booking not found:', response.data.msg)
        }
      } catch (error) {
        console.error('Error fetching booking:', error)
      }
    }

    fetchBooking()
  }, [])

  const handleEdit = (id: number) => {
    navigate(`/booking/${id}`)
  }

  return (
    <div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">View Booking</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <Button>View List</Button>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      <Table className="rounded-xl overflow-hidden mt-10">
        <TableHeader className="bg-green-300 text-center">
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
              <TableCell className="text-center flex">
                <Button
                  className="bg-green-600 ml-5"
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
                        //   onClick={() => deleteAction(invoice.id)}
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
