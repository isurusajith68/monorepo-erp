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
import { useEffect, useState } from 'react'
import getUpdateQuery, { getDirtyValuesTF } from '~/lib/utils'
import { Slide, ToastContainer, toast as notify } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../app-component/style.css'

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

////////action///////////////
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
    const formDataCur = Object.fromEntries(formData);

    const id = formDataCur.schedulid;
    console.log('Form Data:', formDataCur);

    if (id) {
      // Update hotelroompriceshedules with new data
      const startdate = formData.get('startdate');
      const enddate = formData.get('enddate');
      const remarks = formData.get('remarks');

      const updateScheduleQuery = `
        UPDATE hotelroompriceshedules 
        SET startdate = $1, enddate = $2, remarks = $3, active = true
        WHERE id = $4
      `;
      await client.query(updateScheduleQuery, [
        startdate,
        enddate,
        remarks,
        id,
      ]);

      // Delete existing entries in hotelroomprices for this schedule to avoid duplicates
      const deletePricesQuery = 'DELETE FROM hotelroomprices WHERE sheduleid = $1';
      await client.query(deletePricesQuery, [id]);

      // Re-insert updated room prices
      const groupPrices = (prefix : string) => {

        const prices = [];
        let i = 0;
        while (formData.has(`${prefix}[${i}]`)) {
          prices.push(formData.get(`${prefix}[${i}]`));
          i++;
        }
        return prices;
      };

      // Extract data arrays for room prices
      const roomtypes = groupPrices('roomtype');
      const roomviews = groupPrices('roomview');
      const roprices = groupPrices('roprice');
      const bbprices = groupPrices('bbprice');
      const hbprices = groupPrices('hbprice');
      const fbprices = groupPrices('fbprice');
      const nrroprices = groupPrices('nrroprice');
      const nrbbprices = groupPrices('nrbbprice');
      const nrhbprices = groupPrices('nrhbprice');
      const nrfbprices = groupPrices('nrfbprice');

      // Insert updated room prices with existing schedule ID
      for (let index = 0; index < roprices.length; index++) {
        const roomtype = roomtypes[index];
        const roomview = roomviews[index];
        const roprice = roprices[index];
        const bbprice = bbprices[index];
        const hbprice = hbprices[index];
        const fbprice = fbprices[index];
        const nrroprice = nrroprices[index];
        const nrbbprice = nrbbprices[index];
        const nrhbprice = nrhbprices[index];
        const nrfbprice = nrfbprices[index];

        const insertQuery = `
          INSERT INTO hotelroomprices (roomtypeid, roomviewid, sheduleid, roprice, bbprice, hbprice, fbprice, nrroprice, nrbbprice, nrhbprice, nrfbprice) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;

        await client.query(insertQuery, [
          roomtype,
          roomview,
          id, // Use existing schedule ID
          roprice || null,
          bbprice || null,
          hbprice || null,
          fbprice || null,
          nrroprice || null,
          nrbbprice || null,
          nrhbprice || null,
          nrfbprice || null,
        ]);
      }

      // Return success message for update
      return jsonWithSuccess(
        { result: 'Room Price Schedule updated successfully!' },
        'Room Price Schedule updated successfully!',
      );
    } else {
      // Insert new schedule as no id was found
      const startdate = formData.get('startdate');
      const enddate = formData.get('enddate');
      const remarks = formData.get('remarks');

      const insertScheduleQuery = `
        INSERT INTO public.hotelroompriceshedules (startdate, enddate, remarks, active) 
        VALUES ($1, $2, $3, true) RETURNING id;
      `;
      const scheduleResult = await client.query(insertScheduleQuery, [
        startdate,
        enddate,
        remarks,
      ]);
      const scheduleId = scheduleResult.rows[0].id;

      // Insert new room prices associated with the new scheduleId
      const groupPrices = (prefix :any) => {
        const prices = [];
        let i = 0;
        while (formData.has(`${prefix}[${i}]`)) {
          prices.push(formData.get(`${prefix}[${i}]`));
          i++;
        }
        return prices;
      };

      const roomtypes = groupPrices('roomtype');
      const roomviews = groupPrices('roomview');
      const roprices = groupPrices('roprice');
      const bbprices = groupPrices('bbprice');
      const hbprices = groupPrices('hbprice');
      const fbprices = groupPrices('fbprice');
      const nrroprices = groupPrices('nrroprice');
      const nrbbprices = groupPrices('nrbbprice');
      const nrhbprices = groupPrices('nrhbprice');
      const nrfbprices = groupPrices('nrfbprice');

      for (let index = 0; index < roprices.length; index++) {
        const roomtype = roomtypes[index];
        const roomview = roomviews[index];
        const roprice = roprices[index];
        const bbprice = bbprices[index];
        const hbprice = hbprices[index];
        const fbprice = fbprices[index];
        const nrroprice = nrroprices[index];
        const nrbbprice = nrbbprices[index];
        const nrhbprice = nrhbprices[index];
        const nrfbprice = nrfbprices[index];

        const insertQuery = `
          INSERT INTO hotelroomprices (roomtypeid, roomviewid, sheduleid, roprice, bbprice, hbprice, fbprice, nrroprice, nrbbprice, nrhbprice, nrfbprice) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;

        await client.query(insertQuery, [
          roomtype,
          roomview,
          scheduleId,
          roprice || null,
          bbprice || null,
          hbprice || null,
          fbprice || null,
          nrroprice || null,
          nrbbprice || null,
          nrhbprice || null,
          nrfbprice || null,
        ]);
      }

      // Return success message for insertion
      return jsonWithSuccess(
        { result: 'Room Price Data successfully inserted!' },
        'Room Price Data successfully inserted!',
      );
    }
  } catch (error) {
    console.error('Error processing room info:', error.message);

    return jsonWithSuccess(
      { result: 'Error processing room info' },
      'Error processing room info',
    );
  }
}



export default function RoomPriceSchedule() {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    console.log(event, 'hhhh')

    // Access form data using the FormData API
    const formElement = document.getElementById("myForm");
  const formData = new FormData(formElement as HTMLFormElement);

    // Submit data to the server
    const jsonPayload = JSON.stringify(data)

    // Append the JSON string to the FormData
    formData.append('payload', jsonPayload)

    // Submit form data
    await fetcher.submit(formData, { method: 'post' })
  }

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
          {!scheduleheder.id && (
            <h1 className="text-3xl font-bold mt-12">Add Room Price Schedule</h1>
            )}
               {scheduleheder.id && (
            <h1 className="text-3xl font-bold mt-12">Update Room Price Schedule</h1>
            )}
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
                />
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2">Remarks</label>
                <Input
                  type="text"
                  name="remarks"
                  className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl w-44"
                  defaultValue={scheduleheder?.remarks}
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
                        name={`roprice[${index}]`}
                        defaultValue={data.roprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`bbprice[${index}]`}
                        defaultValue={data.bbprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`hbprice[${index}]`}
                        defaultValue={data.hbprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`fbprice[${index}]`}
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
                        name={`nrroprice[${index}]`}
                        defaultValue={data.nrroprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`nrbbprice[${index}]`}
                        defaultValue={data.nrbbprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`nrhbprice[${index}]`}
                        defaultValue={data.nrhbprice}
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        className="bg-white"
                        name={`nrfbprice[${index}]`}
                        defaultValue={data.nrfbprice}
                      ></Input>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="lg:ml-[80%] mt-8 mb-20 flex">
              <div>
                {!scheduleheder.id && (
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg"
                  >
                    Save
                  </Button>
                )}
                {scheduleheder.id && (
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg"
                  >
                    Update
                  </Button>
                )}
              </div>
              <div>
                <Button className="h-9 text-white bg-orange-400 hover:bg-orange-500 ml-8">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Form>
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
      </div>
    </>
  )
}
