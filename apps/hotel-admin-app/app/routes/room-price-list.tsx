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
import { Form, json, Link, useActionData, useLoaderData, useNavigate, useSubmit } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { client } from '~/db.server'
import { useState } from 'react'
import { useEffect } from 'react'
import { Slide, ToastContainer, toast as notify } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import "../app-component/style.css"


export async function loader({ request }: LoaderFunctionArgs) {
  const result = await client.query('SELECT * FROM hotelroompriceshedules')
  if (result.rows.length === 0) {
    return {}
  } else {
    console.log("result.rows",result.rows)
    return result.rows
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


export default function RoomPriceList() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()
  const [searchId, setSearchId] = useState("");
  const [searchDate, setsearchDate] = useState("");
  const [searchEndDate, setsearchEndDate] = useState("");
  const actionData = useActionData() // Capture action data (including toast data)
  const submit = useSubmit()

  // UseEffect to handle showing the toast when actionData changes
  useEffect(() => {
    if (actionData?.toast) {
      // Show success or error toast based on the type
      notify(actionData.toast.message, { type: actionData.toast.type })
    }
  }, [actionData])
  
  const handleEdit = (id: number) => {
    navigate(`/room-price-edit/${id}`)
  }

  const handleView = (id: number) => {
    navigate(`/room-price-view/${id}`)
  }


// Ensure `data` is an array before filtering
const filteredData = Array.isArray(data)
  ? data.filter((item: any) => {
      // Make sure the search criteria are strings for `.includes()`
      const matchesSearchCriteria =
        item.id?.toString().includes(searchId || '') &&
        item.startdate?.toString().includes(searchDate || '') &&
        item.enddate?.toString().includes(searchEndDate || '');

      return matchesSearchCriteria;
    })
  : [];



  return (
    <>
      <div className="ml-[18.4%] h-screen mt-14">
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room Price Schedule</h1>
            <Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 lg:ml-[60%] mt-5" onClick={() => handleEdit(-1)}>
                {' '}
                + Add New
              </Button>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2" />
        </div>

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-3 gap-16 ml-28">
            <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
              <label className="font-extralight text-sm mt-2 w-full">Schedule ID</label>
              <Input
                type="search"
                className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl"
                placeholder=""
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)} 
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">Start Date</label>
              <Input
                type="date"
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                placeholder=""
                value={searchDate}
                onChange={(e) => setsearchDate(e.target.value)} 
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">End Date</label>
              <Input
                type="date"
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                placeholder=""
                value={searchEndDate}
                onChange={(e) => setsearchEndDate(e.target.value)} 
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[85%] ml-[5%]">
          <Table className="rounded-xl border border-blue-300 overflow-hidden">
            <TableHeader className="bg-blue-300 text-center border border-blue-300">
              <TableRow>
                <TableHead className="text-center px-4 py-2">
                  Schedule ID
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  Start Date
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  End Date
                </TableHead>
                <TableHead className="text-center py-2">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-blue-50">
            {filteredData.length > 0 ? (
              filteredData.map((data: any, index: any) => {
                // Convert and format the startdate and enddate to yyyy.mm.dd
                const startDateObj = new Date(data.startdate)
                const formattedStartDate = `${startDateObj.getFullYear()}.${(
                  startDateObj.getMonth() + 1
                )
                  .toString()
                  .padStart(2, '0')}.${startDateObj
                  .getDate()
                  .toString()
                  .padStart(2, '0')}`

                const endDateObj = new Date(data.enddate)
                const formattedEndDate = `${endDateObj.getFullYear()}.${(
                  endDateObj.getMonth() + 1
                )
                  .toString()
                  .padStart(2, '0')}.${endDateObj
                  .getDate()
                  .toString()
                  .padStart(2, '0')}`

                return (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      {data.id}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {formattedStartDate}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {formattedEndDate}
                    </TableCell>
                    <TableCell className=" py-2 px-4">
                      <div className="flex items-center lg:ml-[20%]">
                      <div>
                          <Button
                            onClick={() => handleView(data.id)}
                            className="bg-blue-600 "
                          >
                            View
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleEdit(data.id)}
                            className="bg-blue-600 ml-5"
                          >
                            Edit
                          </Button>
                        </div>
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
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center px-4 py-2">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
        />
      </div>
    </>
  )
}
