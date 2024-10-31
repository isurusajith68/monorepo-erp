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
<<<<<<< HEAD
import { Form, Link, useLoaderData, useNavigate } from '@remix-run/react'
import { LoaderFunction } from '@remix-run/node'
import { client } from '~/db.server'
=======
import {
  Form,
  json,
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
} from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunction } from '@remix-run/node'
import { client } from '~/db.server'
import { useEffect } from 'react'
import { Slide, ToastContainer, toast as notify } from 'react-toastify'
>>>>>>> 7508ce80912b8acbe574954225728a3e5e790f9c

export let loader: LoaderFunction = async ({ params }) => {
  //console.log("params",params)

  const { id } = params

  let result: { rows: any[] } = { rows: [] },
    resultroom: any

  // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
  if (id == '-1') {
    result.rows = []
    resultroom = await client.query(
      'SELECT t.id AS roomtypeid, t.roomtype, v.id AS roomviewid, v.roomview FROM public.hotelroomtypes t, public.hotelroomview v',
    )
  } else {
    result = await client.query(
      'SELECT * FROM hotelroompriceshedules  WHERE id = $1',
      [id],
    )
    resultroom = await client.query(
      'SELECT * FROM hotelroomprices WHERE sheduleid = $1',
      [id],
    )
  }

  const resultview = await client.query('SELECT * FROM hotelroomview')
  const resulttype = await client.query('SELECT * FROM hotelroomtypes')

  // console.log('kasun', resultroom.rows)
  if (result.rows.length == 0) {
    return {
      roomview: resultview.rows,
      roomtype: resulttype.rows,
      scheduldata: {},
      roompricedata: resultroom.rows,
    }
  } else {
    //console.log('111111111', resultview.rows)
    return {
      roomview: resultview.rows,
      roomtype: resulttype.rows,
      scheduldata: result.rows[0],
      roompricedata: resultroom.rows,
    }
  }
  // Return the fetched data from the database
}

<<<<<<< HEAD
export default function RoomPriceScheduleView() {
  const navigate = useNavigate()
  const dataArray = useLoaderData<typeof loader>()
  // Get the first object from the array
  const singleData = dataArray[0]
  const data: ReturnType<typeof loader>[] = useLoaderData<typeof loader>()
  console.log('data', singleData)
=======
// Helper to return json with toast
function jsonWithSuccess(data: any, message: string) {
  return json({
    ...data,
    toast: {
      type: 'success',
      message,
    },
  })
}


export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    console.log("id", id);
    
    if (!id) {
      throw new Error("No id provided for deletion.");
    }

    // First, delete related entries from hotelroomprices
    const query1 = 'DELETE FROM hotelroomprices WHERE sheduleid = $1';
    await client.query(query1, [id]);

    // Then, delete the entry from hotelroompriceshedules
    const query = 'DELETE FROM hotelroompriceshedules WHERE id = $1';
    await client.query(query, [id]);

    // Returning JSON with success toast data
      return jsonWithSuccess(
      { result: 'Data deleted successfully' },
      'Room Price Shedules deleted successfully! 🗑️',
    )
  } catch (error) {
    console.error('Error deleting data:', error);
    return jsonWithSuccess(
      { result: 'Data deleted successfully' },
      'Error In Room Price Shedules deleted successfully! 🗑️',
    )
  }
}


export default function RoomPriceScheduleViwe() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()

  const scheduleheder = data?.scheduldata
  const roompricedata = data?.roompricedata
  const roomview = data?.roomview
  const roomtype = data?.roomtype
  //console.log('idh', roomtype)

  const fetcher = useFetcher()

  // UseEffect to handle showing the toast when fetcher.data changes
  useEffect(() => {
    if (fetcher.data?.toast) {
      // Show success or error toast based on the type
      notify(fetcher.data.toast.message, { type: fetcher.data.toast.type })
    }
  }, [fetcher.data]) // Listen to changes in fetcher.data

>>>>>>> 7508ce80912b8acbe574954225728a3e5e790f9c

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
            <h1 className="text-3xl font-bold mt-12">
              View Room Price Schedule
            </h1>
            <Link to={'/room-price-list'} className="lg:ml-[50%] mt-5">
              <Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
                Price List
              </Button>
            </Link>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2" />
        </div>

        <Form method="post" id="myForm">
          <div className="flex justify-between items-center mt-4 w-full">
            <div className="relative flex flex-col-3 gap-5 ml-28 mr-14">
              <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  Schedule ID
                </label>
                <Input
                  type="text"
                  name="schedulid"
                  className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl"
                  defaultValue={scheduleheder?.id}
                  readOnly
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
                  defaultValue={formatDate(scheduleheder?.startdate)}
                  readOnly
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
                  defaultValue={formatDate(scheduleheder?.enddate)}
                  readOnly
                />
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2">Remarks</label>
                <Input
                  type="text"
                  name="remarks"
                  className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl w-44"
                  defaultValue={scheduleheder?.remarks}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mt-10 ml-14">
              Standerd Room Price Details
            </h1>
          </div>
          <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[95%]">
            <Table className="rounded-xl border border-blue-300 overflow-hidden">
              <TableHeader className="bg-blue-300 text-center border border-blue-300">
                <TableRow>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Room Type
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Room View
                  </TableHead>
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
                </TableRow>
              </TableHeader>
              <TableBody className="bg-blue-50">
                {roompricedata.map((data: any, index: any) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        type="hidden"
                        name={`roomtype[${index}]`}
                        defaultValue={data.roomtypeid}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                      <Input
                        value={
                          roomtype.find(
                            (type: any) => type.id === data.roomtypeid,
                          )?.roomtype || 'Unknown Type'
                        }
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                    </TableCell>

                    <TableCell className="text-center px-4 py-2">
                      <Input
                        type="hidden"
                        name={`roomview[${index}]`}
                        defaultValue={data.roomviewid}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                      <Input
                        value={
                          roomview.find(
                            (view: any) => view.id === data.roomviewid,
                          )?.roomview || 'Unknown View'
                        }
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        readOnly
                        defaultValue={data.roprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        readOnly
                        defaultValue={data.bbprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        readOnly
                        defaultValue={data.hbprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        readOnly
                        defaultValue={data.fbprice}
                      ></Input>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* non refundeble table */}
          <div>
            <h1 className="text-xl font-bold mt-10 ml-14">
              Non Refundable Prices
            </h1>
          </div>
          <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[95%]">
            <Table className="rounded-xl border border-blue-300 overflow-hidden">
              <TableHeader className="bg-blue-300 text-center border border-blue-300">
                <TableRow>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Room Type
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Room View
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    NR RO Price
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    NR BB Price
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    NR HB Price
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    NR Fb Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-blue-50">
                {roompricedata.map((data: any, index: any) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        type="hidden"
                        name={`roomtype[${index}]`}
                        defaultValue={data.roomtypeid}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                      <Input
                        value={
                          roomtype.find(
                            (type: any) => type.id === data.roomtypeid,
                          )?.roomtype || 'Unknown Type'
                        }
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                    </TableCell>

                    <TableCell className="text-center px-4 py-2">
                      <Input
                        type="hidden"
                        name={`roomview[${index}]`}
                        defaultValue={data.roomviewid}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                      <Input
                        value={
                          roomview.find(
                            (view: any) => view.id === data.roomviewid,
                          )?.roomview || 'Unknown View'
                        }
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        readOnly
                        defaultValue={data.nrroprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        readOnly
                        defaultValue={data.nrbbprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        readOnly
                        defaultValue={data.nrhbprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        readOnly
                        defaultValue={data.nrfbprice}
                      ></Input>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="lg:ml-[85%] mt-8 mb-20 flex">
              <div>
                <Form method="post">
                  <input hidden name="id" value={scheduleheder?.id} />
                    <Button type="submit" className="bg-red-500 w-36 hover:bg-red-400">
                      Delete
                    </Button> 
                </Form>
              </div>
            </div>
          </div>
        </Form>
<<<<<<< HEAD
        <div className="bg-slate-100 w-[40%] h-44 ml-16 mt-20 rounded-lg shadow-xl">
          <h3 className="ml-5 mt-5">RO : Room Only</h3>
          <h3 className="ml-5 mt-5">BB : Bed & Breakfast</h3>
          <h3 className="ml-5 mt-5">
            HB : Half Board (Breakfast & Dinner normally)
          </h3>
          <h3 className="ml-5 mt-5">
            FB : Full Board (Breakfast , Lunch & Dinner)
          </h3>
        </div>
=======
        {/* ToastContainer to display the notifications */}

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false} // Show progress bar
          newestOnTop={true} // Display newest toast on top
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={true}
          pauseOnHover={true}
          theme="colored" // You can change to "light" or "dark"
          transition={Slide} // Slide animation for toast appearance
          icon={true} // Show icons for success, error, etc.
          className="custom-toast-container" // Add custom classes
          bodyClassName="custom-toast-body"
          closeButton={false} // No close button for a clean look
          onClick={() => navigate('/room-view/list')}
        />
>>>>>>> 7508ce80912b8acbe574954225728a3e5e790f9c
      </div>
    </>
  )
}
