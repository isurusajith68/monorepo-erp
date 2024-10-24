import { ActionFunctionArgs, LoaderFunction } from '@remix-run/node'
import React, { useEffect } from 'react'
import { client } from '~/db.server'
import RoomType from './room-type.list'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { json, Link, useFetcher, useLoaderData, useNavigate } from '@remix-run/react'
import getUpdateQuery, { getDirtyValuesTF } from '~/lib/utils'
import { Slide, ToastContainer, toast as notify } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../app-component/style.css'

export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  console.log('kasun', id)

  // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
  const result = await client.query(
    'SELECT * FROM roomamenities WHERE id = $1',
    [id],
  )

  if (result.rows.length == 0) {
    return {}
  } else {
    console.log('111111111', result.rows)
    return result.rows[0]
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
    const formData = await request.formData()
    const formDataCur = Object.fromEntries(formData)
    console.log('curdata', formDataCur)

    if (formDataCur.id) {
      const jsonPayload = formData.get('payload')
      const initialdata = JSON.parse(jsonPayload as string)

      const diff = getDirtyValuesTF(initialdata, formDataCur, [], 'id')

      const [uq, vals] = getUpdateQuery(diff, 'roomamenities', 'id')

      console.log('2222222', uq)
      console.log('2222222', vals)

      await client.query(uq, vals)

      // Returning JSON with success toast data
      return jsonWithSuccess(
        { result: 'Data Update successfully' },
        'Amenity Type Update successfully!!',
      )
    }
  } catch (error) {
    console.error('Error inserting hotel info:', error)
    // Return error response with details to show in the alert
     // Return error response with details to show in the alert
     return jsonWithSuccess(
      { result: 'Failed to save Room information. Please try again.' },
      'Failed to save Room information. Please try again.',
    )
  }
  return 0
}

function ViewEdit() {
  const navigate = useNavigate();
  const data = useLoaderData<typeof loader>()
  console.log('idh', data)

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
    <div className="ml-[18.3%] h-screen mt-14 bg-blue-200 fixed w-full">
      <div>
        <div className="lg:w-[40%] lg:ml-[20%] h-52 bg-white p-8 shadow-xl mt-36">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Amenity Type</h4>
            </div>
            <div className="grid gap-2 mt-5">
              <div className="grid items-center gap-4">
                <form id="myForm" method="post">
                  <input name="id" type="hidden" defaultValue={data.id} />
                  <Input
                    id="width"
                    name="name"
                    placeholder="Room View"
                    className="col-span-2 h-10"
                    defaultValue={data.name}
                  />
                 <div className='flex gap-10 lg:ml-[60%]'>
                  <div>
                  <Link
                        className="text-white bg-orange-500 hover:bg-orange-400  w-20 mt-10 h-20"
                        to={'/room-amenities/list'}
                      >
                        <Button className='text-white bg-orange-500 hover:bg-orange-400 mt-10'>Close</Button>
                      </Link>
                  </div>
                  <div>
                  <Button
                    onClick={handleSubmit}
                    //onClick={() => navigate('/room-type/list')}
                    className="text-white bg-blue-500 hover:bg-blue-400 mt-10  "
                  >
                    Update
                  </Button>
                </div>
                 </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
        onClick={() => navigate('/room-view/list')}
      />
    </div>
  )
}

export default ViewEdit
