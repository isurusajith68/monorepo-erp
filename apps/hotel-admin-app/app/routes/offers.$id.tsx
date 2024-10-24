import { ActionFunctionArgs, LoaderFunction } from '@remix-run/node'
import React from 'react'
import { client } from '~/db.server'
import RoomType from './room-type.list'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  json,
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
} from '@remix-run/react'
import getUpdateQuery, { getDirtyValuesTF } from '~/lib/utils'
import { Label } from '~/components/ui/label'

export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  console.log('kasun', id)

  // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
  const result = await client.query('SELECT * FROM hoteloffers WHERE id = $1', [
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

////////action///////////////

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData()
    const formDataCur = Object.fromEntries(formData)
    console.log('curdata', formDataCur)

    if (formDataCur.id) {
      const jsonPayload = formData.get('payload')
      const initialdata = JSON.parse(jsonPayload as string)

      const diff = getDirtyValuesTF(initialdata, formDataCur, [], 'id')

      const [uq, vals] = getUpdateQuery(diff, 'hoteloffers', 'id')

      console.log('2222222', uq)
      console.log('2222222', vals)

      await client.query(uq, vals)

      return json({
        success: true,
        message: 'Hotel information saved successfully!',
      })
    }
  } catch (error) {
    console.error('Error inserting hotel info:', error)
    // Return error response with details to show in the alert
    return json(
      {
        success: false,
        message: 'Failed to save hotel information. Please try again.',
      },
      { status: 500 },
    )
  }
  return 0
}

function ViewOffers() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()
  console.log('idh', data)

  const fetcher = useFetcher()

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
    navigate('/offers-list')
  }

  const GoList = () => {
    navigate('/offers-list')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Ensure 2 digits
    const day = date.getDate().toString().padStart(2, '0') // Ensure 2 digits
    return `${year}-${month}-${day}`
  }

  return (
    <div className="ml-[18.3%] h-screen mt-14 bg-blue-200 fixed w-full">
      <div>
        <div className="lg:w-[40%] lg:ml-[20%] h-full bg-white p-8 shadow-xl mt-36">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Room View</h4>
            </div>
            <div className="grid gap-2 mt-5">
              <div className="grid items-center gap-4">
                <form id="myForm" method="post">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <input name="id" type="hidden" defaultValue={data.id} />
                    <div>
                      <Label>Offers Name</Label>
                      <Input
                        name="offername"
                        id="width"
                        placeholder="Offer Name"
                        className="col-span-2 h-10 border-2 border-blue-300"
                        defaultValue={data.offername}
                      />
                    </div>
                    <div>
                      <Label>Discount Percentage</Label>
                      <Input
                        name="discount"
                        id="width"
                        placeholder="Discount Percentage"
                        className="col-span-2 h-10 border-2 border-blue-300"
                        defaultValue={data.discount}
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        name="startdate"
                        type="date"
                        id="width"
                        placeholder="Start Date"
                        className="col-span-2 h-10 border-2 border-blue-300"
                        defaultValue={formatDate(data.startdate)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        name="enddate"
                        type="date"
                        id="width"
                        placeholder="End Date"
                        className="col-span-2 h-10 border-2 border-blue-300"
                        defaultValue={formatDate(data.enddate)}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <div className=" lg:ml-[90%]">
                        <Button
                          onClick={GoList}
                          className="text-white bg-orange-500 hover:bg-orange-400  w-20 mt-10"
                        >
                          close
                        </Button>
                      </div>
                      <div className=" lg:ml-[90%]">
                        <Button
                          onClick={handleSubmit}
                          //onClick={() => navigate('/room-type/list')}
                          className="text-white bg-blue-500 hover:bg-blue-400 mt-10  "
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewOffers
