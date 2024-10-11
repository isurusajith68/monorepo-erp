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

export default function RoomPriceSchedule() {
  return (
    <>
      <div className="ml-[18.4%] h-screen mt-14">
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room Price Schedule</h1>
            <Link to={'/room-price-list'} className="lg:ml-[60%] mt-5">
              <Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
                Price List
              </Button>
            </Link>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2" />
        </div>

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-3 gap-5 ml-28 mr-14">
            <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
              <label className="font-extralight text-sm mt-2 w-full">Schedule ID</label>
              <Input
                type="search"
                className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl"
                placeholder=""
                // value={searchId}
                // onChange={handleSearchChangeID}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">Start Date</label>
              <Input
                type="date"
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                placeholder=""
                // value={searchName}
                // onChange={handleSearchChangeName}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">End Date</label>
              <Input
                type="date"
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                placeholder=""
                // value={searchName}
                // onChange={handleSearchChangeName}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2">Remarks</label>
              <Input
                type="text"
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl w-44"
                placeholder=""
                // value={searchName}
                // onChange={handleSearchChangeName}
              />
            </div>
          </div>
        </div>
        <div>
         <h1 className="text-xl font-bold mt-10 ml-14">Add Room Price Details</h1>
        </div>
        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[95%]">
          <Table className="rounded-xl border border-blue-300 overflow-hidden">
            <TableHeader className="bg-blue-300 text-center border border-blue-300">
              <TableRow>
                <TableHead className="text-center px-4 py-2"> Room NO</TableHead>
                <TableHead className="text-center px-4 py-2"> Room Type</TableHead>
                <TableHead className="text-center px-4 py-2"> Room View</TableHead>
                <TableHead className="text-center px-4 py-2"> Beds</TableHead>
                <TableHead className="text-center px-4 py-2"> RO Price</TableHead>
                <TableHead className="text-center px-4 py-2"> BB Price</TableHead>
                <TableHead className="text-center px-4 py-2"> HB Price</TableHead>
                <TableHead className="text-center px-4 py-2"> Fb Price</TableHead>
                <TableHead className="text-center px-4 py-2"> Action</TableHead>
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
