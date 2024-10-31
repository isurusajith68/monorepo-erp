import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from '@remix-run/node'
import { json, useActionData, useFetcher, useLoaderData, useParams, useSubmit } from '@remix-run/react'
import { client } from '~/db.server'
import getUpdateQuery, { getDirtyValuesTF } from '~/lib/utils'
import { useEffect } from 'react'
import { Slide, ToastContainer, toast as notify } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../app-component/style.css'

export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  console.log('kasun', id)

  // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
  const result = await client.query('SELECT * FROM hotelinfo WHERE id = $1', [
    id,
  ])

  if (result.rows.length == 0) {
    return {}
  } else {
    console.log('111111111', result.rows)
    return result.rows[0]
  }
  // Return the fetched data from the database
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
    const formData = await request.formData()
    const formDataCur = Object.fromEntries(formData)
    console.log('curdata', formDataCur)

    if (formDataCur.id) {
      const jsonPayload = formData.get('payload')
      const initialdata = JSON.parse(jsonPayload as string)

      const diff = getDirtyValuesTF(initialdata, formDataCur, [], 'id')

      const [uq, vals] = getUpdateQuery(diff, 'hotelinfo', 'id')

      console.log('2222222', uq)
      console.log('2222222', vals)

      if (uq) {
        await client.query(uq, vals)
      }
      // Returning JSON with success toast data
      return jsonWithSuccess(
        { result: 'Hotel Info successfully Updated' },
        'Hotel Info successfully Updated !!',
      )
    }else{

    const hotelQuery = `INSERT INTO hotelinfo (name, email, mobile, address1, address2, city, country, province, telephone, url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`

    const hotelValues = [
      formDataCur.name,
      formDataCur.email,
      formDataCur.mobile,
      formDataCur.address1,
      formDataCur.address2,
      formDataCur.city,
      formDataCur.country,
      formDataCur.province,
      formDataCur.telephone,
      formDataCur.url,
    ]

      // Execute the query
      await client.query(hotelQuery, hotelValues)

      // On successful insertion, return success response
      return jsonWithSuccess(
        { result: 'Hotel Info successfully Insert' },
        'Hotel Info successfully Insert !!',
      )
    }
  } catch (error) {
    console.error('Error inserting hotel info:', error)

    // Return error response with details to show in the alert
    return jsonWithSuccess(
      { result: 'Hotel Info successfully Insert' },
      'Error inserting hotel info: !!',
    )
  }
}

export default function HotelInfoForm() {
  const params = useParams();
  const hotelId = params.id; // This gives you "23"
  const data = useLoaderData<typeof loader>()
  console.log('idh', data)

  const fetcher = useFetcher()

  const actionData = useActionData() // Capture action data (including toast data)
  const submit = useSubmit()

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
    const formElement = document.getElementById('myForm')
    const formData = new FormData(formElement as HTMLFormElement)

    // Submit data to the server
    const jsonPayload = JSON.stringify(data)

    // Append the JSON string to the FormData
    formData.append('payload', jsonPayload)

    // Submit form data
    await fetcher.submit(formData, { method: 'post' })
  }

  return (
    <div className="ml-[18.4%] h-screen mt-16">
      <div className="max-w-2xl mx-auto mt-24 bg-white shadow-lg rounded-lg ">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-400 w-full rounded-t-lg h-14">
          <h1 className="text-2xl font-bold text-white ml-10">Hotel Info</h1>
          <div className="flex space-x-4 mr-10">
            {!data.id && (
              <Button
                onClick={handleSubmit}
                className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg"
              >
                Save
              </Button>
            )}
            {data.id && (
              <Button
                onClick={handleSubmit}
                className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg"
              >
                Update
              </Button>
            )}

            <Button className="bg-orange-300 text-white px-4 py-2 rounded-lg">
              Close
            </Button>
          </div>
        </div>

        {/* Form */}
        <form method="post" className="grid grid-cols-2 gap-6 p-6" id="myForm">
          {/* Name and Email */}
          <div className="flex flex-col">
            <input name="id" type="hidden" defaultValue={data.id} />
            <label htmlFor="name" className="text-gray-600">
              Name
            </label>
            <Input
              minLength={5}
              name="name"
              className="mt-1 border-blue-500"
              placeholder="Enter hotel name"
              required
              defaultValue={data.name}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600">
              Email
            </label>
            <Input
              name="email"
              className="mt-1 border-blue-500"
              placeholder="Enter email address"
              defaultValue={data.email}
              required
            />
          </div>

          {/* Mobile and Telephone */}
          <div className="flex flex-col">
            <label htmlFor="mobile" className="text-gray-600">
              Mobile
            </label>
            <Input
              name="mobile"
              className="mt-1 border-blue-500"
              placeholder="Enter mobile number"
              defaultValue={data.mobile}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="telephone" className="text-gray-600">
              Telephone
            </label>
            <Input
              name="telephone"
              className="mt-1 border-blue-500"
              placeholder="Enter telephone number"
              defaultValue={data.telephone}
              required
            />
          </div>

          {/* Address 1 and Address 2 */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="address1" className="text-gray-600">
              Address 1
            </label>
            <Input
              name="address1"
              className="mt-1 border-blue-500"
              placeholder="Enter primary address"
              defaultValue={data.address1}
              required
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="address2" className="text-gray-600">
              Address 2
            </label>
            <Input
              name="address2"
              className="mt-1 border-blue-500"
              placeholder="Enter secondary address"
              defaultValue={data.address2}
              required
            />
          </div>

          {/* City, Country, and Province */}
          <div className="grid grid-cols-3 gap-4 col-span-2">
            <div>
              <label htmlFor="city" className="text-gray-600">
                City
              </label>
              <Input
                name="city"
                className="mt-1 border-blue-500"
                placeholder="Enter city"
                defaultValue={data.city}
                required
              />
            </div>

            <div>
              <label htmlFor="country" className="text-gray-600">
                Country
              </label>
              <Input
                name="country"
                className="mt-1 border-blue-500"
                placeholder="Enter country"
                defaultValue={data.country}
                required
              />
            </div>

            <div>
              <label htmlFor="province" className="text-gray-600">
                Province
              </label>
              <Input
                name="province"
                className="mt-1 border-blue-500"
                placeholder="Enter province"
                defaultValue={data.province}
                required
              />
            </div>
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="hotelUrl" className="text-gray-600">
              Hotel Url
            </label>
            <Input
              name="url"
              type='url'
              className="mt-1 border-blue-500"
              placeholder="Enter primary Url"
              defaultValue={data.url}
              required
            />
          </div>
        </form>
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
    </div>
  )
}
