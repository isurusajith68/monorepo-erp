import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Input } from '~/components/ui/input'
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
  Form,
  Link,
  useLoaderData,
  useNavigate,
} from '@remix-run/react'
import {
  LoaderFunction,
} from '@remix-run/node'
import { client } from '~/db.server'


export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params
  console.log('kasun', id)
  // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
  const result = await client.query(
    'SELECT * FROM roomprices WHERE scheduleid = $1',
    [id],
  )
  if (result.rows.length == 0) {
    return {}
  } else {
    console.log('111111111', result.rows)
    return result.rows
  }
  // Return the fetched data from the database
}


export default function RoomPriceScheduleView() {
  const navigate = useNavigate()
  const dataArray = useLoaderData<typeof loader>()
  // Get the first object from the array
  const singleData = dataArray[0]
  const data: ReturnType<typeof loader>[] = useLoaderData<typeof loader>()
  console.log('data', singleData)
 


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Ensure 2 digits
    const day = date.getDate().toString().padStart(2, '0') // Ensure 2 digits
    return `${year}-${month}-${day}`
  }


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

        <Form method="post" id="myForm">
          <input name="id" type="hidden" defaultValue={singleData.id} />
          <div className="flex justify-between items-center mt-4 w-full">
            <div className="relative flex flex-col-3 gap-5 ml-28 mr-14">
              <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  Schedule ID
                </label>
                <Input
                  type="search"
                  name="scheduleid"
                  className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl"
                  defaultValue={singleData.scheduleid}
                />
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  Start Date
                </label>
                <Input
                  type="date"
                  name="startdate"
                  className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                  defaultValue={formatDate(singleData.startdate)}
                />
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  End Date
                </label>
                <Input
                  type="date"
                  name="enddate"
                  className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                  defaultValue={formatDate(singleData.enddate)}
                />
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2">Remarks</label>
                <Input
                  type="text"
                  name="remarks"
                  className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl w-44"
                  defaultValue={singleData.remarks}
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mt-10 ml-14">
              Add Room Price Details
            </h1>
          </div>
          <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[95%]">
            <Table className="rounded-xl border border-blue-300 overflow-hidden">
              <TableHeader className="bg-blue-300 text-center border border-blue-300">
                <TableRow>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Room NO
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Room Type
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Room View
                  </TableHead>
                  <TableHead className="text-center px-4 py-2"> Beds</TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    RO Price
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    BB Price
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    HB Price
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Fb Price
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-blue-50">
                {data.map((data: any, index: any) => {
                  return (
                    <TableRow key={index} className="hover:bg-blue-100">
                      <TableCell className="text-center px-4 py-2">
                        {data.roomno}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {data.roomtype}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {data.roomview}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {data.noofbed}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {data.roprice}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {data.bbprice}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {data.hbprice}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {data.fbprice}
                      </TableCell>
                      <TableCell className="text-center py-2 px-4">
                        <div className="flex items-center">
                          <div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
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
                                    permanently delete the room type.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <Form method="post">
                                    <input
                                      type="hidden"
                                      name="id"
                                      value={data.id}
                                    />
                                    <AlertDialogAction asChild>
                                      <Button
                                        type="submit"
                                        className="bg-red-500"
                                      >
                                        Continue
                                      </Button>
                                    </AlertDialogAction>
                                  </Form>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Form>
        <div className='bg-slate-100 w-[40%] h-44 ml-16 mt-20 rounded-lg shadow-xl'>
           <h3 className='ml-5 mt-5'>RO : Room Only</h3>
           <h3 className='ml-5 mt-5'>BB : Bed & Breakfast</h3>
           <h3 className='ml-5 mt-5'>HB : Half Board (Breakfast & Dinner normally)</h3>
           <h3 className='ml-5 mt-5'>FB : Full Board (Breakfast , Lunch & Dinner)</h3>
        </div>
      </div>
    </>
  )
}
