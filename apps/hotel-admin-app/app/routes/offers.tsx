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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { useState } from 'react'
import { Label } from '~/components/ui/label'

export default function Offers() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <div className={`ml-[18.4%] h-screen mt-14 ${isPopoverOpen ? 'bg-blue-100' : ''}`}>
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Special Offer List</h1>
            <Popover  onOpenChange={(open) => setIsPopoverOpen(open)}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9 text-white bg-blue-400 hover:bg-blue-500 lg:ml-[70%]">+ Add Offer</Button>
              </PopoverTrigger>
              <PopoverContent className="lg:w-[180%] lg:-ml-[140%] lg:mt-[40%] h-full">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-xl leading-none">Special Offer</h4>
                  </div>
                  <div className="grid gap-2 mt-5">
                    <div className="grid grid-cols-2 items-center gap-4">
                    <div>
                    <Label>Offers Name</Label>
                      <Input
                        id="width"
                        placeholder='Room View'
                        className="col-span-2 h-10 border-2 border-blue-300"
                      />
                      </div>
                      <div>
                       <Label>Discount Percentage</Label>
                        <Input
                        id="width"
                        placeholder='Room View'
                        className="col-span-2 h-10 border-2 border-blue-300"
                      />
                      </div>
                       <div>
                       <Label>Start Date</Label>
                        <Input
                        type='date'
                        id="width"
                        placeholder='Room View'
                        className="col-span-2 h-10 border-2 border-blue-300"
                      />
                       </div>
                      <div>
                       <Label>End Date</Label>
                        <Input
                        type='date'
                        id="width"
                        placeholder='Room View'
                        className="col-span-2 h-10 border-2 border-blue-300"
                      />
                      </div>
                    </div>
                    <div className='ml-[70%] mt-10'>
                      <Button className='text-white bg-blue-500 hover:bg-blue-400 '>Add Offers</Button>
                      <Button className=' text-white bg-orange-500 hover:bg-orange-400 ml-8'>Close</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2" />
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[70%] ml-[15%]">
          <Table className="rounded-xl border border-blue-300 overflow-hidden">
            <TableHeader className="bg-blue-300 text-center border border-blue-300">
              <TableRow>
                <TableHead className="text-center px-4 py-2">ID </TableHead>
                <TableHead className="text-center px-4 py-2">Offer Name </TableHead>
                <TableHead className="text-center px-4 py-2">Discount</TableHead>
                <TableHead className="text-center px-4 py-2">Start Date</TableHead>
                <TableHead className="text-center px-4 py-2">End Date</TableHead>
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
