import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
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
} from '~/components/ui/alert-dialog'
import { Link } from '@remix-run/react'

export default function RoomList() {

  return (
    <>
      <div className='ml-[18.4%] h-screen mt-14'>
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room List</h1>
            <Link to={"/room-add"} className='lg:ml-[70%]'>
           <Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 "> + Add New</Button>
          </Link>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2" />
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[85%] ml-[5%]">
          <Table className="rounded-xl border border-blue-300 overflow-hidden">
            <TableHeader className="bg-blue-300 text-center border border-blue-300">
              <TableRow>
                <TableHead className="text-center px-4 py-2">Room Number </TableHead>
                <TableHead className="text-center px-4 py-2">Room Type </TableHead>
                <TableHead className="text-center px-4 py-2">No of Beds</TableHead>
                <TableHead className="text-center px-4 py-2">Amenities </TableHead>
                <TableHead className="text-center px-4 py-2">Room Image </TableHead>
                <TableHead className="text-center px-4 py-2">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-blue-50">
              {/* {filteredBank.map((bank:any, index:any) => ( 
              <TableRow key={index} className="hover:bg-blue-100">
                <TableCell className="text-center px-4 py-2">
                  {bank.id}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.bname}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.acctype}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.accbranch}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.accnumber}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {bank.camount}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  <div className="flex gap-5 ml-2">
                    <div>
                      <Button
                        // onClick={() => handleEdit(bank.id)}
                        className="bg-blue-600"
                      >
                        Edit
                      </Button>
                    </div>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button className="ml-5 bg-blue-600 bg-destructive">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              // onClick={() => deleteAction(bank.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))} */}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
