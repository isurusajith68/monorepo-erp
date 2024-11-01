import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetAllRoomDetails } from '@/app/roomdetails/_services/queries'
import { CloudDownload } from 'lucide-react'
import BookingForm from './booking-form'
import { useState } from 'react'
// import { useGetAllRoomBooking } from '../../_services/queries'

const AvailableRooms = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useGetAllRoomDetails()
  // const { data: test } = useGetAllRoomBooking()
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  console.log('pasindu', data)
  // console.log('pasinduuuuuuuuuuuuuuu', test)
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">Room Availability List</h1>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>
      <div className="mt-5 flex items-center ml-10 gap-8">
        <div>
          <Select>
            <h1 className="mb-2">Room View</h1>
            <SelectTrigger className="w-[180px] border-2 border-green-300">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ocean">Ocean</SelectItem>
              <SelectItem value="street">Street</SelectItem>
              <SelectItem value="pool">Pool</SelectItem>
            </SelectContent>
          </Select>
          {/* <h1>Search By Room Number</h1>
          <Input
            type="text"
            className="rounded border-2 border-green-600 bg-white w-60"
            placeholder=""
          /> */}
        </div>
        <div>
          <Select>
            <h1 className="mb-2">Room Type</h1>
            <SelectTrigger className="w-[180px] border-2 border-green-300">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
            </SelectContent>
          </Select>
          {/* <Button>Export Report</Button> */}
        </div>
        <div>
          <Select>
            <h1 className="mb-2">Room Price</h1>
            <SelectTrigger className="w-[180px] border-2 border-green-300">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RO">RO Price</SelectItem>
              <SelectItem value="BB">BB Price</SelectItem>
              <SelectItem value="HB">HB Price</SelectItem>
              <SelectItem value="FB">FB Price</SelectItem>
            </SelectContent>
          </Select>
          {/* <Button onClick={() => navigate('/reports/booked-rooms')}>
            Room Availability
          </Button> */}
        </div>
        <div>
          <h1 className="mb-2 ">End Date</h1>
          <input
            type="date"
            placeholder="End Date"
            className="p-2  rounded ml-4 border-2 border-green-300"
          />
        </div>
      </div>
      <div>
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Room No</TableHead>
              <TableHead className="text-center">Room Type</TableHead>
              <TableHead className="text-center">Room View</TableHead>
              <TableHead className="text-center">Selected Price</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Maintenance</TableHead>
              {/* <TableHead className="text-center">FB Price</TableHead> */}
              {/* <TableHead className="text-center">Maintenance</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((room) => (
              <TableRow>
                <TableCell className="text-center">{room.roomnumber}</TableCell>
                <TableCell className="text-center">{room.roomtype}</TableCell>
                <TableCell className="text-center">{room.roomview}</TableCell>
                <TableCell className="text-center">
                  {room.selectedprice}
                </TableCell>
                <TableCell className="text-center">{room.price}</TableCell>
                <TableCell className="text-center">
                  {room.maintenance || 'none'}
                </TableCell>
                {/* <TableCell className="text-center">Credit Card</TableCell> */}
                {/* <TableCell className="text-center">$250.00</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="border-2 border-red-700 mb-40">
          <p>Select Rooms</p>
          <div className="grid grid-cols-3 gap-2 border-2 border-green-300 items-center justify-center">
            {/* {test.map((te) => (
              <div className="border-2 border-green-300 h-20">
                {te.roomtype}
              </div>
            ))} */}
            {/* <div className='border-2 border-green-300 h-20'>helo</div>
            <div className='border-2 border-green-300 h-20'>hello</div> */}
          </div>
        </div>
      </div>
      {/* Add BookingForm with selectedRooms */}
    </>
  )
}

export default AvailableRooms
