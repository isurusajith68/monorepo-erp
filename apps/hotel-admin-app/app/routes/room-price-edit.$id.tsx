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
import { Form, json, Link, useFetcher, useLoaderData, useNavigate } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from '@remix-run/node'
import { client } from '~/db.server'
import { useState } from 'react'
import getUpdateQuery, { getDirtyValuesTF } from '~/lib/utils'

export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  console.log('kasun', id)

  // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
  const result = await client.query('SELECT * FROM roomprices WHERE id = $1', [
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


export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData()
    const formDataCur = Object.fromEntries(formData)
    console.log('curdata', formDataCur)

    if (formDataCur.id) {
      const jsonPayload = formData.get('payload')
      const initialdata = JSON.parse(jsonPayload as string)

      const diff = getDirtyValuesTF(initialdata, formDataCur, [], 'id')

      const [uq, vals] = getUpdateQuery(diff, 'roomprices', 'id')

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
export default function RoomPriceSchedule() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()
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
    //navigate('/room-price-list')
  }


  const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure 2 digits
    const day = date.getDate().toString().padStart(2, "0"); // Ensure 2 digits
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="ml-[18.4%] h-screen mt-14">
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room Price Schedule</h1>
            <Link to={'/room-price-list'} className="lg:ml-[60%] mt-5">
              <Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
                Price List
              </Button>
            </Link>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2" />
          <div className="lg:ml-[80%] mt-8 mb-5">
          <Button  onClick={handleSubmit} className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
           Update
          </Button>
          <Button className="h-9 text-white bg-orange-400 hover:bg-orange-500 ml-8">
            Close
          </Button>
          </div>
        </div>
        
        <Form method='post' id='myForm'>
        <input name="id" type="hidden" defaultValue={data.id} />
        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-3 gap-5 ml-28 mr-14">
            <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
              <label className="font-extralight text-sm mt-2 w-full">
                Schedule ID
              </label>
              <Input
                type="search"
                name='scheduleid'
                className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl"
                defaultValue={data.scheduleid}
                // value={searchId}
                // onChange={handleSearchChangeID}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">
                Start Date
              </label>
              <Input
                type="date"
                name='startdate'
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                defaultValue={formatDate(data.startdate)}
                // value={searchName}
                // onChange={handleSearchChangeName}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">
                End Date
              </label>
              <Input
                type="date"
                name='enddate'
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                defaultValue={formatDate(data.enddate)}
                // value={searchName}
                // onChange={handleSearchChangeName}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2">Remarks</label>
              <Input
                type="text"
                name='remarks'
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl w-44"
                defaultValue={data.remarks}
                // value={searchName}
                // onChange={handleSearchChangeName}
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold mt-10 ml-14">
            Add Room Price Details
          </h1>
        </div>
        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[95%]">
          <Table className="rounded-xl border border-blue-300 overflow-hidden">
            <TableHeader className="bg-blue-300 text-center border border-blue-300">
              <TableRow>
                <TableHead className="text-center px-4 py-2">
                  {' '}
                  Room NO
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  {' '}
                  Room Type
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  {' '}
                  Room View
                </TableHead>
                <TableHead className="text-center px-4 py-2"> Beds</TableHead>
                <TableHead className="text-center px-4 py-2">
                  {' '}
                  RO Price
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  {' '}
                  BB Price
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  {' '}
                  HB Price
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  {' '}
                  Fb Price
                </TableHead>
                <TableHead className="text-center px-4 py-2"> Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-blue-50">
                <TableRow className="hover:bg-blue-100">
                  <TableCell className="text-center px-4 py-2">
                    <Input name='roomno' defaultValue={data.roomno} className='border-none' readOnly></Input>
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                  <Input name='roomtype' defaultValue={data.roomtype} className='border-none' readOnly></Input>
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                  <Input name='roomview' defaultValue={data.roomview} className='border-none' readOnly></Input>
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                  <Input name='noofbed' defaultValue={data.noofbed} className='border-none' readOnly></Input> 
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    <Input className="bg-white" name='roprice' defaultValue={data.roprice}></Input>
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    <Input className="bg-white"  name='bbprice' defaultValue={data.bbprice}></Input>
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    <Input className="bg-white"  name='hbprice' defaultValue={data.hbprice}></Input>
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    <Input className="bg-white"  name='fbprice' defaultValue={data.fbprice}></Input>
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    <div className="flex gap-5 ml-2">
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
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                              // onClick={() => deleteAction(bank.id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
        </Form>
      </div>
    </>
  )
}
