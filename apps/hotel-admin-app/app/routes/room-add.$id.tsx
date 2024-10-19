import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  LoaderFunction,
  ActionFunctionArgs,
} from '@remix-run/node'
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

export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  try {
    const result = await client.query('SELECT * FROM hotelrooms WHERE id = $1', [id])

    if (result.rows.length === 0) {
      // Return a more meaningful response when no data is found
      return json({ message: 'Room not found', room: null })
    }

    // Return the first result row as the data
    return json({ room: result.rows[0] })
  } catch (error) {
    console.error('Error fetching room data:', error)
    // Return an error message if something goes wrong
    return json({ message: 'Error fetching room data', room: null })
  }
}


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
    const formData = await request.formData()

    const roomno = formData.get('roomno')
    const roomtype = formData.get('roomtype')
    const noofbed = formData.get('noofbed')
    const roomview = formData.get('roomview')
    const ac = formData.get('ac')
    const tv = formData.get('tv')
    const wifi = formData.get('wifi')
    const balcony = formData.get('balcony')

    const hotelQuery = `
      INSERT INTO hotelrooms (roomno, roomtype, noofbed, roomview, ac, tv, wifi, balcony) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`
    const hotelValues = [roomno, roomtype, noofbed, roomview, ac, tv, wifi, balcony]

    const result = await client.query(hotelQuery, hotelValues)
    const roomId = result.rows[0].id

    const images = formData.getAll('images')
    for (const image of images) {
      if (image && typeof image !== 'string') {
        const imageBuffer = Buffer.from(await image.arrayBuffer())
        const imageQuery = `
          INSERT INTO roomimages (images, roomid) 
          VALUES ($1, $2)`
        await client.query(imageQuery, [imageBuffer, roomId])
      }
    }

    return jsonWithSuccess(
      { result: 'Room Data successfully Insert!' },
      'Room Data successfully Insert!'
    )
  } catch (error) {
    console.error('Error saving room info:', error)

    return jsonWithSuccess(
      { result: 'Error saving room info' },
      'Error saving room info'
    )
  }
}

export default function RoomEditForm() {
  const { room, message } = useLoaderData<typeof loader>() // Destructure the room and message from loader
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const toast = useToast()
  const navigate = useNavigate()
  const fetcher = useFetcher()
  const submit = useSubmit()

  // Log data to see what is being retrieved
  console.log("Room Data:", room)
  console.log("Message:", message)

  useEffect(() => {
    if (fetcher.data?.toast) {
      notify(fetcher.data.toast.message, { type: fetcher.data.toast.type })
    }
  }, [fetcher.data])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const formElement = document.getElementById("myForm")
    const formData = new FormData(formElement as HTMLFormElement)

    // Submit form data
    await fetcher.submit(formData, { method: 'post' })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const selectedFiles = Array.from(files)
      const newPreviews: string[] = []

      selectedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result as string)
          if (newPreviews.length === selectedFiles.length) {
            setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  return (
    <div className="ml-[18.4%] h-screen mt-16">
      <div className="max-w-2xl mx-auto mt-24 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center bg-blue-400 w-full rounded-t-lg h-14">
          <h1 className="text-2xl font-bold text-white ml-10">Room</h1>
          <div className="flex space-x-4 mr-10">
            <Link className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg" to={'/room-list'}>
              View List
            </Link>
          </div>
        </div>

        {/* Check if room data is available */}
        {room ? (
          <Form method="post" encType="multipart/form-data" className="grid grid-cols-2 gap-6 p-6" id="myForm">
            <input name="id" type="hidden" defaultValue={room.id} />
            
            {/* Room Data Fields */}
            <div className="flex flex-col">
              <label htmlFor="roomno" className="text-gray-600">Room Number</label>
              <Input name="roomno" className="mt-1 border-blue-500" placeholder="Enter room number" required defaultValue={room.roomno} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="roomtype" className="text-gray-600">Room Type</label>
              <Input name="roomtype" className="mt-1 border-blue-500" placeholder="Enter room type" defaultValue={room.roomtype} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="noofbed" className="text-gray-600">Number of Beds</label>
              <Input name="noofbed" className="mt-1 border-blue-500" placeholder="Enter number of beds" defaultValue={room.noofbed} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="roomview" className="text-gray-600">Room View</label>
              <Input name="roomview" className="mt-1 border-blue-500" placeholder="Enter room view" defaultValue={room.roomview} />
            </div>

            {/* Checkbox Fields */}
            <div className="grid grid-cols-4 gap-4 col-span-2">
              <div>
                <label htmlFor="ac" className="text-gray-600">AC</label>
                <Checkbox name="ac" className="ml-5 w-10 h-10 border-blue-500" defaultChecked={room.ac} />
              </div>
              <div>
                <label htmlFor="tv" className="text-gray-600">TV</label>
                <Checkbox name="tv" className="ml-5 w-10 h-10 border-blue-500" defaultChecked={room.tv} />
              </div>
              <div>
                <label htmlFor="wifi" className="text-gray-600">Wi-Fi</label>
                <Checkbox name="wifi" className="ml-5 w-10 h-10 border-blue-500" defaultChecked={room.wifi} />
              </div>
              <div>
                <label htmlFor="balcony" className="text-gray-600">Balcony</label>
                <Checkbox name="balcony" className="ml-5 w-10 h-10 border-blue-500" defaultChecked={room.balcony} />
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col col-span-2">
              <label htmlFor="images" className="text-gray-600">Room Images</label>
              <Input name="images" type="file" className="mt-1 border-blue-500" onChange={handleImageChange} multiple />
              <div className="flex flex-row gap-4">
                {/* Existing Images */}
                {room.images && room.images.map((src, i) => (
                  <img key={i} src={src} alt={`room-${i}`} className="h-[100px]" />
                ))}
                {/* New Previews */}
                {imagePreviews.map((src, i) => (
                  <img key={i} src={src} alt={`new-upload-${i}`} className="h-[100px]" />
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <Button onClick={handleSubmit} className="w-full bg-blue-400 mt-4">Save</Button>
            </div>
          </Form>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <p>{message || 'No room data available.'}</p>
          </div>
        )}
      </div>

      <ToastContainer transition={Slide} />
    </div>
  )
}

