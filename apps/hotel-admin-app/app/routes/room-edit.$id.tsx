import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { LoaderFunction, ActionFunctionArgs } from '@remix-run/node'
import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
  useSubmit,
} from '@remix-run/react'
import { client } from '~/db.server'
import { Checkbox } from '~/components/ui/checkbox'
import { json } from '@remix-run/node'
import { Buffer } from 'buffer'
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
import getUpdateQuery, { getDirtyValuesTF } from '~/lib/utils'
import { Label } from '~/components/ui/label'

export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  // Query the hotel room, room types, and room views
  const roomQuery = `
    SELECT hotelrooms.*, roomimages.images
    FROM hotelrooms
    INNER JOIN roomimages
    ON hotelrooms.id = roomimages.roomid
    WHERE hotelrooms.id = $1;
  `

  // Execute the joined query to fetch the room and its images
  const result = await client.query(roomQuery, [id])

  // If no room data is found, return a 404 response
  if (result.rows.length === 0) {
    return json({}, { status: 404 })
  }

  // Process the result and convert the image buffer to Base64
  const hotels = result.rows.reduce((acc: any, row: any) => {
    const existingHotel = acc.find((hotel: any) => hotel.id === row.id)

    // Convert image buffer to Base64 string
    const imageBase64 = row.images
      ? `data:image/jpeg;base64,${row.images.toString('base64')}`
      : null

    if (existingHotel) {
      // If hotel exists in the accumulator, add the new image to its images array
      existingHotel.images.push(imageBase64)
    } else {
      // If not, create a new entry with the hotel data
      acc.push({
        ...row,
        images: imageBase64 ? [imageBase64] : [],
      })
    }

    return acc
  }, [])

  // Query room views and room types separately
  const roomViewQuery = await client.query('SELECT * FROM hotelroomview')
  const roomTypeQuery = await client.query('SELECT * FROM hotelroomtypes')
  const resultamenities = await client.query('SELECT * FROM roomamenities')

  // Query to fetch room amenities
  const amenitiesQuery = `
    SELECT roomid, amenityid FROM roomamenitydetails WHERE roomid = $1;
  `
  const amenitiesResult = await client.query(amenitiesQuery, [id])
  //console.log("amenitiesResult",amenitiesResult.rows)

  // Map amenities to the corresponding hotel room
  hotels.forEach((hotel: any) => {
    hotel.amenities = amenitiesResult.rows
      .filter((amenity: any) => amenity.roomid === hotel.id)
      .map((amenity: any) => amenity.amenityid)
  })

  // Return the room data along with room types and room views
  return {
    room: hotels[0], // Return the single processed hotel room
    roomViews: roomViewQuery.rows, // Return all room views
    roomTypes: roomTypeQuery.rows, // Return all room types
    roomAmenities: resultamenities.rows,
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
    // Parse the form data
    const formData = await request.formData()
    console.log('Current form data:', formData)

    // Extract form fields
    const roomno = formData.get('roomno')
    const roomtype = formData.get('roomtype')
    const noofbed = formData.get('noofbed')
    const roomview = formData.get('roomview')
    const id = formData.get('id')
    const selectedAmenities = formData.getAll('amenities')

    if (!id) {
      return json({ success: false, message: 'No room ID provided.' })
    }
    // Update the room details
    const hotelUpdateQuery = `
      UPDATE hotelrooms 
      SET roomno = $1, roomtypeid = $2, noofbed = $3, roomviewid = $4
      WHERE id = $5
      RETURNING id
    `
    const hotelUpdateValues = [roomno, roomtype, noofbed, roomview, id]
    const result = await client.query(hotelUpdateQuery, hotelUpdateValues)
    const roomId = result.rows[0]?.id

    if (!roomId) {
      throw new Error('Room ID not found after update.')
    }

    // Delete old amenities for the room
    const deleteAmenitiesQuery = `DELETE FROM roomamenitydetails WHERE roomid = $1`
    await client.query(deleteAmenitiesQuery, [id])

    // Insert new amenities
    for (const amenityId of selectedAmenities) {
      const insertAmenityQuery = `
        INSERT INTO roomamenitydetails (roomid, amenityid) 
        VALUES ($1, $2)
      `
      await client.query(insertAmenityQuery, [roomId, amenityId])
    }

    // // Delete old images for the room
    const deleteImagesQuery = `DELETE FROM roomimages WHERE roomid = $1`
    await client.query(deleteImagesQuery, [id])

    // // Handle image uploads
    const images = formData.getAll('images') // Get all images
    console.log('selectedAmenities', images)
    for (const image of images) {
      if (image && typeof image !== 'string') {
        // Convert the image to a buffer
        const imageBuffer = Buffer.from(await image.arrayBuffer())
        console.log('selectedAmenities', imageBuffer)
        // Insert the image and room ID into roomimages
        const imageQuery = `
          INSERT INTO roomimages (images, roomid) 
          VALUES ($1, $2)
        `
        await client.query(imageQuery, [imageBuffer, roomId])
      }
    }
    // Return success response
    return jsonWithSuccess(
      { message: 'Room Data successfully updated!' },
      'Room Data successfully updated!',
    )
  } catch (error) {
    console.error('Error updating hotel info:', error)

    // Return error response with details
    return jsonWithSuccess(
      { result: 'Failed to save room information. Please try again.' },
      'Failed to update room information.',
    )
  }
}

////////////
function RoomEditForm() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const toast = useToast()
  const navigate = useNavigate()
  const fetcher = useFetcher()
  const submit = useSubmit()

  const data = useLoaderData<typeof loader>()
  const room = data?.room ?? {}
  const roomsView = data?.roomViews ?? []
  const roomTypes = data?.roomTypes ?? []
  const amenities = data?.roomAmenities ?? []
  const actionData = useActionData()

  console.log('first', room)

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

  const [selectedAmenities, setSelectedAmenities] = useState(room.amenities)

  const handleCheckboxChange = (amenityId: number) => {
    setSelectedAmenities((prevSelected: any) => {
      if (prevSelected.includes(amenityId)) {
        // Remove amenity if it’s already selected
        return prevSelected.filter((id: any) => id !== amenityId)
      } else {
        // Add amenity if it’s not already selected
        return [...prevSelected, amenityId]
      }
    })
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
          id="myForm"
        >
          <input name="id" type="hidden" defaultValue={room.id} />
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
              defaultValue={room.roomno}
            />
          </div>

          {/* Room Type */}
          <div className="flex flex-col">
            <label htmlFor="roomtype" className="text-gray-600">
              Room Type
            </label>
            <Select
              name="roomtype"
              defaultValue={room.roomtypeid.toString()}
              required
            >
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
              defaultValue={room.noofbed}
            />
          </div>

          {/* Room View */}
          <div className="flex flex-col">
            <label htmlFor="roomview" className="text-gray-600">
              Room View
            </label>
            <Select
              name="roomview"
              defaultValue={room.roomviewid.toString()}
              required
            >
              <SelectTrigger className="mt-1 border-blue-500">
                <SelectValue placeholder="Select Room View" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel> Room View</SelectLabel>
                  {roomsView.map((view: any) => (
                    <SelectItem key={view.id} value={`${view.id}`}>
                      {view.roomview}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="amenities" className="text-gray-600">
              Amenities
            </label>
          </div>
          <div className="grid grid-cols-4 gap-4 col-span-2">
            {amenities.map((amenity: any) => {
              const isChecked = selectedAmenities.includes(amenity.id)

              return (
                <div key={amenity.id}>
                  <Label
                    htmlFor={amenity.name.toLowerCase()}
                    className="text-gray-600"
                  >
                    {amenity.name}
                  </Label>
                  <Input
                    type="checkbox"
                    name="amenities"
                    className="ml-5 w-10 h-10 border-blue-500"
                    value={`${amenity.id}`}
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(amenity.id)} // Update checked state
                  />
                </div>
              )
            })}
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
            Old Image Previews *
            <div className="mt-4 flex gap-1">
              {room.images && room.images.length > 0
                ? room.images.map((image: string, imgIndex: number) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Room Image ${imgIndex + 1}`}
                      width={50}
                      height={50}
                    />
                  ))
                : 'No Image Available'}
            </div>
            New Image Previews *
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
                Update
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
        onClick={() => navigate('/room-room/list')}
      />
    </div>
  )
}
export default RoomEditForm
