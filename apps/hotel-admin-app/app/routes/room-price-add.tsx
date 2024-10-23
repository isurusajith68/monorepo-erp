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
  Form,
  json,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
} from '@remix-run/react'
import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from '@remix-run/node'
import { client } from '~/db.server'
import { Slide, ToastContainer, toast as notify } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../app-component/style.css'
import { useToast } from '~/hooks/use-toast'
import { useEffect } from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const result = await client.query('SELECT * FROM hotelrooms')
  const resultview = await client.query('SELECT * FROM hotelroomview')
  const resulttype = await client.query('SELECT * FROM hotelroomtypes')

  // Check if both queries are empty
  if (
    result.rows.length === 0 &&
    resultview.rows.length === 0 &&
    resulttype.rows.length === 0
  ) {
    return {}
  } else {
    // Return both datasets in an object
    return {
      hotelrooms: result.rows,
      roomsViews: resultview.rows,
      roomTypes: resulttype.rows,
    }
  }
}

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
    console.log('Form Data:', Object.fromEntries(formData)); // Log the form data

    if (id) {
      // DELETE request
      const query = `DELETE FROM roomprices WHERE id = $1`;
      await client.query(query, [id]);

      return json({
        success: true,
        message: 'Hotel room-type deleted successfully!',
      });
    } else {
      // Extract common fields
      const scheduleid = formData.get('scheduleid');
      const startdate = formData.get('startdate');
      const enddate = formData.get('enddate');
      const remarks = formData.get('remarks');

      // Extract the arrays from FormData
      const roomno = formData.getAll('roomno');
      const roomtype = formData.getAll('roomtype');
      const roomview = formData.getAll('roomview');
      const noofbed = formData.getAll('noofbed');
      const roprice = formData.getAll('roprice');
      const bbprice = formData.getAll('bbprice');
      const hbprice = formData.getAll('hbprice');
      const fbprice = formData.getAll('fbprice');

      // Validate the arrays have the same length
      if (
        roomno.length !== roomtype.length ||
        roomno.length !== roomview.length ||
        roomno.length !== noofbed.length ||
        roomno.length !== roprice.length ||
        roomno.length !== bbprice.length ||
        roomno.length !== hbprice.length ||
        roomno.length !== fbprice.length
      ) {
        throw new Error('Mismatch in form data arrays lengths.');
      }

      // Create a single query for bulk insertion
      const insertQuery = `
        INSERT INTO roomprices 
        (scheduleid, startdate, enddate, remarks, roomno, roomtype, roomview, noofbed, roprice, bbprice, hbprice, fbprice) 
        VALUES 
        ${roomno
          .map(
            (_, index) =>
              `($1, $2, $3, $4, $${5 + index * 8}, $${6 + index * 8}, $${7 + index * 8}, $${8 + index * 8}, $${9 + index * 8}, $${10 + index * 8}, $${11 + index * 8}, $${12 + index * 8})`
          )
          .join(', ')}
      `;

      // Flatten the array data into a single array of values
      const values = [
        scheduleid,
        startdate,
        enddate,
        remarks,
        ...roomno,
        ...roomtype,
        ...roomview,
        ...noofbed,
        ...roprice,
        ...bbprice,
        ...hbprice,
        ...fbprice,
      ];

      await client.query(insertQuery, values);

      // Returning JSON with success toast data
      return jsonWithSuccess(
        { result: 'Room Price Data successfully Insert!' },
        'Room Price Data successfully Insert!'
      );
    }
  } catch (error) {
    console.error('Error saving room info:', error);

    // Return error toast data on failure
    return jsonWithSuccess(
      { result: 'Error saving room info' },
      'Error saving room info',
    );
  }
}


export default function RoomPriceSchedule() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()
  const hotelrooms = data?.hotelrooms ?? []
  const roomsViews = data?.roomsViews ?? []
  const roomTypes = data?.roomTypes ?? []
  const fetcher = useFetcher()
  const actionData = useActionData()
  const toast = useToast() // Get the toast function from Remix or your UI library

  // UseEffect to handle showing the toast when actionData changes
  useEffect(() => {
    if (actionData?.toast) {
      // Show success or error toast based on the type
      notify(actionData.toast.message, { type: actionData.toast.type })
    }
  }, [actionData])

 

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
          <div className="flex justify-between items-center mt-4 w-full">
            <div className="relative flex flex-col-3 gap-5 ml-28 mr-14">
              <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  Schedule ID
                </label>
                <Input
                  type="text"
                  name="scheduleid"
                  className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl"
                  placeholder=""
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
                  placeholder=""
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
                  placeholder=""
                />
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2">Remarks</label>
                <Input
                  type="text"
                  name="remarks"
                  className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl w-44"
                  placeholder=""
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
                </TableRow>
              </TableHeader>
              <TableBody className="bg-blue-50">
                {hotelrooms.map((data: any, index: any) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        name="roomno"
                        defaultValue={data.roomno}
                        className="border-none"
                        readOnly
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        name="roomtype"
                        value={
                          roomTypes.find(
                            (view: any) => view.id.toString() === data.roomtype,
                          )?.roomtype || 'Unknown Type'
                        }
                        className="border-none mt-1 text-sm text-gray-600"
                        readOnly
                      />
                    </TableCell>

                    <TableCell className="text-center px-4 py-2">
                      <Input
                        name="roomview"
                        value={
                          roomsViews.find(
                            (view: any) => view.id.toString() === data.roomview,
                          )?.roomview || 'Unknown View'
                        }
                        className="border-none mt-1 text-sm text-gray-600"
                        readOnly
                      />
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        name="noofbed"
                        defaultValue={data.noofbed}
                        className="border-none"
                        readOnly
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input className="bg-white" name="roprice"></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input className="bg-white" name="bbprice"></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input className="bg-white" name="hbprice"></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input className="bg-white" name="fbprice"></Input>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        <div className="lg:ml-[83%] mt-8 mb-5 ">
          <Button
            type='submit'
            className="h-9 text-white bg-blue-500 hover:bg-blue-400 w-32"
          >
            Save
          </Button>
        </div>
        </Form>
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
          onClick={() => navigate('/room-type/list')}
        />
      </div>
    </>
  )
}
