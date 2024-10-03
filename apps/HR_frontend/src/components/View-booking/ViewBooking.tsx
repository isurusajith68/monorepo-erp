import React from 'react'
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

export default function ViewBooking() {
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
        <TableBody>
          <TableRow>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
