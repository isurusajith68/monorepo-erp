import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from '@remix-run/node'
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from '@remix-run/react'
import { client } from '~/db.server'
import { Checkbox } from '~/components/ui/checkbox'
import { json } from '@remix-run/node' // Ensure you're importing Remix helpers
import { Buffer } from 'buffer' // Ensure Buffer is available if it's not
import { useToast } from '~/hooks/use-toast'
import { Slide, ToastContainer, toast as notify } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../app-component/style.css'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Label } from '~/components/ui/label'

export async function loader({ request }: LoaderFunctionArgs) {
  const result = await client.query('SELECT * FROM hotelroomview')
  const resulttype = await client.query('SELECT * FROM hotelroomtypes')
  const resultamenities = await client.query('SELECT * FROM roomamenities')

  // Check if both queries are empty
  if (result.rows.length === 0 && resulttype.rows.length === 0) {
    return {}
  } else {
    // Return both datasets in an object
    console.log("first",resultamenities.rows)
    return {
      rooms: result.rows,
      roomTypes: resulttype.rows,
      roomAmenities: resultamenities.rows,  
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
    // Get the form data
    const formData = await request.formData()
    console.log("first",formData)

    // Extract form fields
    const roomno = formData.get('roomno')
    const roomtype = formData.get('roomtype')
    const noofbed = formData.get('noofbed')
    const roomview = formData.get('roomview')
    const ac = formData.get('ac')
    const tv = formData.get('tv')
    const wifi = formData.get('wifi')
    const balcony = formData.get('balcony')

    // SQL query to insert the hotel room data
    const hotelQuery = `
      INSERT INTO hotelrooms (roomno, roomtypeid, noofbed, roomviewid,amenityid) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`
    const hotelValues = [
      roomno,
      roomtype,
      noofbed,
      roomview,
    ]

    // Execute SQL query to insert room data
    const result = await client.query(hotelQuery, hotelValues)
    const roomId = result.rows[0].id // Get inserted room ID

    // Handle image uploads
    const images = formData.getAll('images') // Get all images
    for (const image of images) {
      if (image && typeof image !== 'string') {
        // Convert the image to a buffer
        const imageBuffer = Buffer.from(await image.arrayBuffer())

        // SQL query to insert the image and room ID
        const imageQuery = `
          INSERT INTO roomimages (images, roomid) 
          VALUES ($1, $2)`
        await client.query(imageQuery, [imageBuffer, roomId])
      }
    }

    // Returning JSON with success toast data
    return jsonWithSuccess(
      { result: 'Room Data successfully Insert!' },
      'Room Data successfully Insert!',
    )
  } catch (error) {
    console.error('Error saving room info:', error)

    // Return error toast data on failure
    return jsonWithSuccess(
      { result: 'Error saving room info' },
      'Error saving room info',
    )
  }
}

export default function RoomAddForm() {
  const submit = useSubmit()
  const data = useLoaderData<typeof loader>()
  const rooms = data?.rooms ?? []
  const roomTypes = data?.roomTypes ?? []
  const amenities = data?.roomAmenities ?? []
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const actionData = useActionData()
  const toast = useToast() // Get the toast function from Remix or your UI library
  const navigate = useNavigate()

  // UseEffect to handle showing the toast when actionData changes
  useEffect(() => {
    if (actionData?.toast) {
      // Show success or error toast based on the type
      notify(actionData.toast.message, { type: actionData.toast.type })
    }
  }, [actionData])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const selectedFiles = Array.from(files) // Convert FileList to array
      const newPreviews: string[] = []

      // Generate image previews and handle selected file records
      selectedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result as string)

          // Set the image previews once all files have been processed
          if (newPreviews.length === selectedFiles.length) {
            setImagePreviews((prevPreviews) => [
              ...prevPreviews,
              ...newPreviews,
            ])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  return (
    <div className="ml-[18.4%] h-screen mt-16">
      <div className="max-w-2xl mx-auto mt-24 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-400 w-full rounded-t-lg h-14">
          <h1 className="text-2xl font-bold text-white ml-10">Room</h1>
          <div className="flex space-x-4 mr-10">
            <Link
              className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg"
              to={'/room-list'}
            >
              View List
            </Link>
          </div>
        </div>

        {/* Form */}
        <Form
          method="post"
          encType="multipart/form-data"
          className="grid grid-cols-2 gap-6 p-6"
          id="my-form"
        >
          {/* Room Number */}
          <div className="flex flex-col">
            <label htmlFor="roomno" className="text-gray-600">
              Room Number
            </label>
            <Input
              minLength={2}
              name="roomno"
              className="mt-1 border-blue-500"
              placeholder="Enter room number"
              required
            />
          </div>

          {/* Room Type */}
          <div className="flex flex-col">
            <label htmlFor="roomtype" className="text-gray-600">
              Room Type
            </label>
            <Select name="roomtype">
              <SelectTrigger className="mt-1 border-blue-500">
                <SelectValue placeholder="Select Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel> Room Type</SelectLabel>
                  {roomTypes.map((type: any) => (
                    <SelectItem key={type.id} value={`${type.id}`}>
                      {type.roomtype}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Beds */}
          <div className="flex flex-col">
            <label htmlFor="noofbed" className="text-gray-600">
              Number of Beds
            </label>
            <Input
              name="noofbed"
              className="mt-1 border-blue-500"
              placeholder="Enter number of beds"
            />
          </div>

          {/* Room View */}
          <div className="flex flex-col">
            <label htmlFor="roomview" className="text-gray-600">
              Room View
            </label>
            <Select name="roomview">
              <SelectTrigger className="mt-1 border-blue-500">
                <SelectValue placeholder="Select Room View" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel> Room View</SelectLabel>
                  {rooms.map((view: any) => (
                    <SelectItem key={view.id} value={`${view.id}`}>
                      {view.roomview}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div className="flex flex-col">
            <label htmlFor="amenities" className="text-gray-600">
              Amenities
            </label>
          </div>
          <div className="grid grid-cols-4 gap-4 col-span-2">
          {amenities.map((amenity :any) => (
          <div key={amenity.id}>
            <Label htmlFor={amenity.name.toLowerCase()} className="text-gray-600">
              {amenity.name}
            </Label>
            <Input
              type="checkbox"
              name={amenity.name.toLowerCase()}
              className="ml-5 w-10 h-10 border-blue-500"
              // You can add more properties like checked state, onChange handler if necessary
            />
          </div>
        ))}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="images" className="text-gray-600">
              Room Images
            </label>
            <Input
              name="images"
              type="file"
              className="mt-1 border-blue-500"
              onChange={handleImageChange}
              multiple
              placeholder="Upload room images"
            />
            Image Previews *
            <div className="mt-4 flex gap-1">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Room Preview ${index}`}
                  className="w-20 h-20 object-cover"
                />
              ))}
            </div>
            <div className="flex flex-col w-32 mt-4">
              <Button className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-4 py-2 rounded-lg">
                + Add More
              </Button>
            </div>
          </div>
          <div className="flex gap-5 ml-[95%]">
            <div>
              <Button
                type="submit"
                className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-4 py-2 rounded-lg w-32 "
              >
                Save
              </Button>
            </div>
            <div>
              <Link
                className="text-white bg-orange-500 hover:bg-orange-400  "
                to={'/room-list'}
              >
                <Button className="text-white bg-orange-500 hover:bg-orange-400 w-32">
                  Close
                </Button>
              </Link>
            </div>
          </div>
        </Form>
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
  )
}
