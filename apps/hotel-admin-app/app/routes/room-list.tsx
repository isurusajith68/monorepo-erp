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
  useLoaderData,
  useNavigate,
  useSubmit,
} from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { client } from '~/db.server'
import { useEffect } from 'react'
import { Slide, ToastContainer, toast as notify } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../app-component/style.css'

export async function loader({ request }: LoaderFunctionArgs) {
  // Query to fetch hotel rooms and their associated images using INNER JOIN
  const query = `
    SELECT hotelrooms.*, roomimages.images
    FROM hotelrooms
    INNER JOIN roomimages
    ON hotelrooms.id = roomimages.roomid;
  `

  // Execute the joined query
  const result = await client.query(query)

  // Process and map the results to convert the images from Buffer to Base64
  const hotels = result.rows.reduce((acc: any, row: any) => {
    const existingHotel = acc.find((hotel: any) => hotel.id === row.id)

    const imageBase64 = row.images
      ? `data:image/jpeg;base64,${row.images.toString('base64')}`
      : null

    if (existingHotel) {
      // If the hotel already exists in the array, push the new image to its images array
      existingHotel.images.push(imageBase64)
    } else {
      // If the hotel doesn't exist, create a new entry
      acc.push({
        ...row,
        images: imageBase64 ? [imageBase64] : [],
      })
    }

    return acc
  }, [])

  // Check if there are no rows, return an empty object
  if (hotels.length === 0) {
    return json({})
  } else {
    // Return the processed hotel data with images
    console.log('Processed hotels data: ', { hotels })
    return json({ hotels })
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
    const query = `DELETE FROM hotelrooms WHERE id = $1`
    await client.query(query, [id])

    // Returning JSON with success toast data
    return jsonWithSuccess(
      { result: 'Data deleted successfully' },
      'Room deleted successfully! 🗑️',
    )
  } else {
    // If no ID, returning a generic success message
    return jsonWithSuccess(
      { result: 'Operation successful' },
      'Operation successful! 🎉',
    )
  }
}

export default function RoomList() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()?.hotels || [] // Fallback to an empty array

  console.log('first', data)

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
    navigate(`/room-type/${id}`)
  }

  return (
    <>
      <div className="ml-[18.4%] h-screen mt-14">
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room List</h1>
            <Link to={'/room-add'} className="lg:ml-[70%]">
              <Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
                {' '}
                + Add New
              </Button>
            </Link>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2" />
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[85%] ml-[5%] mb-14">
          <Table className="rounded-xl border border-blue-300 overflow-hidden mb-14">
            <TableHeader className="bg-blue-300 text-center border border-blue-300">
              <TableRow>
                <TableHead className="text-center px-4 py-2">
                  Room Number{' '}
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  Room Type{' '}
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  No of Beds
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  Amenities{' '}
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  Room Image{' '}
                </TableHead>
                <TableHead className="text-center px-4 py-2">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-blue-50">
              {data.length > 0 ? (
                data.map((data: any, index: any) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      {data.roomno}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {data.roomtype}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {data.noofbed}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {data.ac === 'on' && (
                        <span style={{ color: 'green', marginRight: '10px' }}>
                          AC
                        </span>
                      )}
                      {data.tv === 'on' && (
                        <span style={{ color: 'blue', marginRight: '10px' }}>
                          TV
                        </span>
                      )}
                      {data.wifi === 'on' && (
                        <span style={{ color: 'purple', marginRight: '10px' }}>
                          WiFi
                        </span>
                      )}
                      {data.balcony === 'on' && (
                        <span style={{ color: 'orange', marginRight: '10px' }}>
                          Balcony
                        </span>
                      )}
                    </TableCell>

                    {/* Display the base64 image */}
                    <TableCell className="text-center px-4 py-2">
                      <div className="flex flex-row gap-4">
                        {data.images && data.images.length > 0
                          ? data.images.map((image: string, index: number) => (
                              <img
                                key={index} // Unique key for each image
                                src={image}
                                alt={`Room Image ${index + 1}`}
                                width={50}
                                height={50}
                              />
                            ))
                          : 'No Image Available'}
                      </div>
                    </TableCell>

                    <TableCell className="text-center px-4 py-2">
                      <div className="flex gap-5 ml-2">
                        <div>
                          <Button className="bg-blue-600">Edit</Button>
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
                                  permanently delete your account and remove
                                  your data from our servers.
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
