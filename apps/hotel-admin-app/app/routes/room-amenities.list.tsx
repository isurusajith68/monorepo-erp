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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { useState } from 'react'
import {
  json,
  useLoaderData,
  Form,
  useActionData,
  useSubmit,
} from '@remix-run/react'
import { useNavigate } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { client } from '~/db.server'
import { useEffect } from 'react'
import { Slide, ToastContainer, toast as notify } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../app-component/style.css'

export async function loader({ request }: LoaderFunctionArgs) {
  const result = await client.query('SELECT * FROM roomamenities')
  if (result.rows.length === 0) {
    return {}
  } else {
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
  const formData = await request.formData()
  const id = formData.get('id')

  if (id) {
    // DELETE request
    const query = `DELETE FROM roomamenities WHERE id = $1`
    await client.query(query, [id])
    // Returning JSON with success toast data
    return jsonWithSuccess(
      { result: 'Data deleted successfully' },
      'Room Type deleted successfully! 🗑️',
    )
  } else {
    // INSERT request
    const amenityType = formData.get('name')
    const hotelQuery = `INSERT INTO roomamenities (name) VALUES ($1)`
    await client.query(hotelQuery, [amenityType])
    // Returning JSON with success toast data
    return jsonWithSuccess(
      { result: 'Hotel Amenity Type saved successfully!' },
      'Hotel Amenity Type saved successfully!',
    )
  }
}

export default function RoomAmenities() {
  const navigate = useNavigate()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const data = useLoaderData<typeof loader>()

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
    navigate(`/room-amenities/${id}`)
  }

  return (
    <>
      <div
        className={`ml-[18.4%] h-screen mt-14 ${isPopoverOpen ? 'bg-blue-100' : ''}`}
      >
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room Amenities List</h1>
            <Popover onOpenChange={(open) => setIsPopoverOpen(open)}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 text-white bg-blue-400 hover:bg-blue-500 lg:ml-[60%]"
                >
                  + Add New
                </Button>
              </PopoverTrigger>
              <PopoverContent className="lg:w-[180%] lg:-ml-[280%] lg:mt-[100%] h-52">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Amenity Type</h4>
                  </div>
                  <div className="grid gap-2 mt-5">
                    <div className="grid items-center gap-4">
                      <Form method="post">
                        <Input
                          id="width"
                          name="name"
                          placeholder="Amenity Type"
                          className="col-span-2 h-10"
                        />
                        <Button
                          type="submit"
                          className="text-white bg-blue-500 hover:bg-blue-400 mt-10 lg:ml-[80%]"
                        >
                          Add
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2" />
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4 border-blue-300 w-[50%] ml-[15%]">
          <Table className="rounded-xl border border-blue-300 overflow-hidden">
            <TableHeader className="bg-blue-300 text-center border border-blue-300">
              <TableRow>
                <TableHead className="text-center px-4 py-2">ID</TableHead>
                <TableHead className="text-center p-12 py-2">Amenity</TableHead>
                <TableHead className="text-center py-2">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-blue-50">
              {data.length > 0 ? (
                data.map((data: any, index: any) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      {data.id}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {data.name}
                    </TableCell>
                    <TableCell className="text-center py-2 px-4">
                      <div className="flex items-center lg:ml-[20%]">
                        <div>
                          <Button
                            onClick={() => handleEdit(data.id)}
                            className="bg-blue-600"
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
                ))
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
