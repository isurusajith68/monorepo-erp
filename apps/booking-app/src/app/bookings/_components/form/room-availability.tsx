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

const AvailableRooms = () => {
  const navigate = useNavigate()
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
              <SelectValue placeholder="Theme" />
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
              <SelectValue placeholder="Theme" />
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
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
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
            <TableRow>
              <TableCell className="text-center">034</TableCell>
              <TableCell className="text-center">Deluxe</TableCell>
              <TableCell className="text-center">Ocean</TableCell>
              <TableCell className="text-center">FB Price</TableCell>
              <TableCell className="text-center">1200 LKR</TableCell>
              <TableCell className="text-center">none</TableCell>
              {/* <TableCell className="text-center">Credit Card</TableCell> */}
              {/* <TableCell className="text-center">$250.00</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default AvailableRooms
