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

const ReportBookedRooms = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">Room Availability Summary</h1>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>
      <div className="mt-5 flex items-center ml-10 gap-8">
        <div>
          <h1>Search By Room Number</h1>
          <Input
            type="text"
            className="rounded border-2 border-green-600 bg-white w-60"
            placeholder=""
          />
        </div>
        <div>
          <Button>Export Report</Button>
        </div>
        <div>
          <Button onClick={() => navigate('/reports/room-availability')}>
            Booked Rooms
          </Button>
        </div>
      </div>
      <div>
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Room No</TableHead>
              <TableHead className="text-center">Room Type</TableHead>
              <TableHead className="text-center">Room View</TableHead>
              <TableHead className="text-center">Ro Price</TableHead>
              <TableHead className="text-center">BB Price</TableHead>
              <TableHead className="text-center">HB Price</TableHead>
              <TableHead className="text-center">FB Price</TableHead>
              {/* <TableHead className="text-center">Maintenance</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">034</TableCell>
              <TableCell className="text-center">Deluxe</TableCell>
              <TableCell className="text-center">Ocean</TableCell>
              <TableCell className="text-center">2000 LKR</TableCell>
              <TableCell className="text-center">3000 LKR</TableCell>
              <TableCell className="text-center">6000 LKR</TableCell>
              <TableCell className="text-center">12000 LKR</TableCell>
              {/* <TableCell className="text-center">$250.00</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default ReportBookedRooms
