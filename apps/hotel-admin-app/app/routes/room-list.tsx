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
<<<<<<< HEAD
=======
import { Label } from '~/components/ui/label'
>>>>>>> 7508ce80912b8acbe574954225728a3e5e790f9c

export async function loader({ request }: LoaderFunctionArgs) {
  // Query to fetch hotel rooms and their associated images using INNER JOIN
  const query = `
    SELECT hotelrooms.*, roomimages.images
    FROM hotelrooms
    INNER JOIN roomimages ON hotelrooms.id = roomimages.roomid;
  `

  // Execute the joined query for hotel rooms and images
  const result = await client.query(query)

  // Query to fetch room amenities
  const amenitiesQuery = `
    SELECT roomid, amenityid FROM roomamenitydetails;
  `
  const amenitiesResult = await client.query(amenitiesQuery)
  // console.log("amenitiesResult",amenitiesResult.rows)

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
        amenities: [], // Initialize amenities array for each hotel
      })
    }
    return acc
  }, [])

  // Map amenities to the corresponding hotel room
  hotels.forEach((hotel: any) => {
    hotel.amenities = amenitiesResult.rows
      .filter((amenity: any) => amenity.roomid === hotel.id)
      .map((amenity: any) => amenity.amenityid)
  })

  // Additional queries for views and room types
  const resultview = await client.query('SELECT * FROM hotelroomview')
  const resulttype = await client.query('SELECT * FROM hotelroomtypes')
  const resultamt = await client.query('SELECT * FROM roomamenities')

  // Return processed hotel data with images, amenities, views, and room types
  return json({
    hotels,
    resultview: resultview.rows,
    roomTypes: resulttype.rows,
    roomAmenities: resultamt.rows,
  })
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
    const delamenity = `DELETE FROM roomamenitydetails WHERE roomid = $1`
    await client.query(delamenity, [id])

    const queryroom = `DELETE FROM hotelrooms WHERE roomviewid = $1`;
    await client.query(queryroom, [id]);

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
  const Data = useLoaderData<typeof loader>() // Fallback to an empty array
  const data = Data?.hotels ?? []
  const roomview = Data?.resultview ?? []
  const roomTypes = Data?.roomTypes ?? []
  const roomAmenities = Data.roomAmenities ?? []
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
    navigate(`/room-edit/${id}`)
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

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[90%] ml-[5%] mb-14">
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
                  Room View{' '}
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
                data.map((item: any, index: number) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      {item.roomno}
                    </TableCell>

                    {/* Room Type - Display the name instead of the ID */}
                    <TableCell className="text-center px-4 py-2">
                      {roomTypes.find(
                        (type: any) =>
                          type.id.toString() === item.roomtypeid.toString(),
                      )?.roomtype || 'Unknown Type'}
                    </TableCell>

                    {/* Room View - Display the name instead of the ID */}
                    <TableCell className="text-center px-4 py-2">
                      {roomview.find(
                        (view: any) =>
                          view.id.toString() === item.roomviewid.toString(),
                      )?.roomview || 'Unknown View'}
                    </TableCell>

                    <TableCell className="text-center px-4 py-2">
                      {item.noofbed}
                    </TableCell>

                    {/* Display AC, TV, WiFi, and Balcony */}
                    <TableCell className="text-center px-4 py-2">
                      <div className="flex flex-row gap-4">
                        {item.amenities && item.amenities.length > 0
                          ? item.amenities.map(
                              (amenityId: string, index: number) => {
                                const matchedAmenity = roomAmenities.find(
                                  (roomAmenity: { id: string; name: string }) =>
                                    roomAmenity.id === amenityId,
                                )

                                return (
                                  <Label key={index}>
                                    {matchedAmenity
                                      ? matchedAmenity.name
                                      : 'Unknown Amenity'}
                                  </Label>
                                )
                              },
                            )
                          : 'No Amenities Available'}
                      </div>
                    </TableCell>

                    {/* Display the base64 images */}
                    <TableCell className="text-center px-4 py-2">
                      <div className="flex flex-row gap-4">
                        {item.images && item.images.length > 0
                          ? item.images.map(
                              (image: string, imgIndex: number) => (
                                <img
                                  key={imgIndex}
                                  src={image}
                                  alt={`Room Image ${imgIndex + 1}`}
                                  width={50}
                                  height={50}
                                />
                              ),
                            )
                          : 'No Image Available'}
                      </div>
                    </TableCell>

                    {/* Action buttons: Edit and Delete */}
                    <TableCell className="text-center px-4 py-2">
                      <div className="flex gap-5 ml-2">
                        <Button
                          onClick={() => handleEdit(item.id)}
                          className="bg-blue-600"
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="ml-5 bg-red-600">Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <Form method="post">
                                <input
                                  type="hidden"
                                  name="id"
                                  value={item.id}
                                />
                                <AlertDialogAction asChild>
                                  <Button type="submit" className="bg-red-500">
                                    Continue
                                  </Button>
                                </AlertDialogAction>
                              </Form>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
