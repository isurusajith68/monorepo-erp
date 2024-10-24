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
  const result = await client.query(
    'SELECT t.id AS roomtype_id, t.roomtype, v.id AS roomview_id, v.roomview FROM public.hotelroomtypes t, public.hotelroomview v',
  )
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
    //console.log("first",result.rows)
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
/////////////////

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData()
    //console.log('Form Data:', Object.fromEntries(formData)); // Log the form data
    console.log('Form Data:', formData) // Log the form data

    let scheduleId = formData.get('schedulid')
    // Extract common fields
    const startdate = formData.get('startdate')
    const enddate = formData.get('enddate')
    const remarks = formData.get('remarks')

    if (!scheduleId) {
      // Insert into hotelroompriceshedules table
      const priceshcduleQuery = `
      INSERT INTO public.hotelroompriceshedules(startdate, enddate, remarks, active) 
      VALUES ($1, $2, $3, true) RETURNING id;
    `
      const scheduleResult = await client.query(priceshcduleQuery, [
        startdate,
        enddate,
        remarks,
      ])
      scheduleId = scheduleResult.rows[0].id

      ///delete all data in pricedetais table where table.shescuid =schedulid

      // Function to group related prices by index (0, 1, 2, etc.)
      const groupPrices = (prefix: any) => {
        const prices = []
        let i = 0
        while (formData.has(`${prefix}[${i}]`)) {
          prices.push(formData.get(`${prefix}[${i}]`))
          i++
        }
        return prices
      }

      // Extract arrays from FormData
      const roomtypes = groupPrices('roomtype')
      const roomviews = groupPrices('roomview')

      const roprices = groupPrices('roprice')
      const bbprices = groupPrices('bbprice')
      const hbprices = groupPrices('hbprice')
      const fbprices = groupPrices('fbprice')
      const nrroprices = groupPrices('nrroprice')
      const nrbbprices = groupPrices('nrbbprice')
      const nrhbprices = groupPrices('nrhbprice')
      const nrfbprices = groupPrices('nrfbprice')

      // const roomtype = formData.get('roomtype');
      // const roomview = formData.get('roomview');

      for (let index = 0; index < roprices.length; index++) {
        const roomtype = roomtypes[index]
        const roomview = roomviews[index]

        const roprice = roprices[index]
        const bbprice = bbprices[index]
        const hbprice = hbprices[index]
        const fbprice = fbprices[index]
        const nrroprice = nrroprices[index]
        const nrbbprice = nrbbprices[index]
        const nrhbprice = nrhbprices[index]
        const nrfbprice = nrfbprices[index]

        console.log("roprice",roprice)
        
        const insertQuery = `INSERT INTO hotelroomprices (roomtypeid, roomviewid, sheduleid, roprice, bbprice, hbprice, fbprice, nrroprice, nrbbprice, nrhbprice, nrfbprice) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`

        await client.query(insertQuery, [
          roomtype,
          roomview,
          scheduleId,
          roprice ? roprice : null,
          bbprice ? bbprice : null,
          hbprice ? hbprice : null,
          fbprice ? fbprice : null,
          nrroprice ? nrroprice : null,
          nrbbprice ? nrbbprice : null,
          nrhbprice ? nrhbprice : null,
          nrfbprice ? nrfbprice : null,
        ])
      }

      // Returning JSON with success toast data
      return jsonWithSuccess(
        { result: 'Room Price Data successfully Inserted!' },
        'Room Price Data successfully Inserted!',
      )
    } else {
    }
  } catch (error) {
    console.error('Error saving room info:', error.message) // Log specific error message

    // Return error toast data on failure
    return jsonWithSuccess(
      { result: 'Error saving room info' },
      'Error saving room info',
    )
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
                  name="schedulid"
                  className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl"
                  placeholder=""
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
                {hotelrooms.map((data: any, index: any) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                     <Input
                        type="hidden"
                        name={`roomtype[${index}]`}
                        defaultValue={data.roomtype_id}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                      <Input
                        //name={`roomtype[${index}]`}
                        defaultValue={data.roomtype}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                    </TableCell>

                    <TableCell className="text-center px-4 py-2">
                    <Input
                        type="hidden"
                        name={`roomview[${index}]`}
                        defaultValue={data.roomview_id}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                      <Input
                       // name={`roomview[${index}]`}
                        defaultValue={data.roomview}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`roprice[${index}]`}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`bbprice[${index}]`}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`hbprice[${index}]`}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`fbprice[${index}]`}
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
                {hotelrooms.map((data: any, index: any) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                     <Input
                        type="hidden"
                        name={`roomtype[${index}]`}
                        defaultValue={data.roomtype_id}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                      <Input
                        //name={`roomtype[${index}]`}
                        defaultValue={data.roomtype}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                    </TableCell>

                    <TableCell className="text-center px-4 py-2">
                    <Input
                        type="hidden"
                        name={`roomview[${index}]`}
                        defaultValue={data.roomview_id}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                      <Input
                       // name={`roomview[${index}]`}
                        defaultValue={data.roomview}
                        className="border-none mt-1 text-sm text-gray-600 text-center"
                        readOnly
                      />
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`nrroprice[${index}]`}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`nrbbprice[${index}]`}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`nrhbprice[${index}]`}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`nrfbprice[${index}]`}
                      ></Input>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="lg:ml-[83%] mt-8 mb-5 ">
            <Button
              type="submit"
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
