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
  useFetcher,
  useLoaderData,
  useNavigate,
} from '@remix-run/react'
import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from '@remix-run/node'
import { client } from '~/db.server'
import { useState } from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const result = await client.query('SELECT * FROM hotelrooms')
  if (result.rows.length === 0) {
    return {}
  } else {
    return result.rows
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const id = formData.get('id')
  console.log('ssssssss', Object.fromEntries(formData)) // Log the form data

  if (id) {
    // DELETE request
    const query = `DELETE FROM roomprices WHERE id = $1`
    await client.query(query, [id])
    return json({
      success: true,
      message: 'Hotel room-type deleted successfully!',
    })
  } else {
    // Extract the common fields
    const scheduleid = formData.get('scheduleid')
    const startdate = formData.get('startdate')
    const enddate = formData.get('enddate')
    const remarks = formData.get('remarks')

    // Extract the arrays from FormData
    const roomno = formData.getAll('roomno')
    const roomtype = formData.getAll('roomtype')
    const roomview = formData.getAll('roomview')
    const noofbed = formData.getAll('noofbed')
    const roprice = formData.getAll('roprice')
    const bbprice = formData.getAll('bbprice')
    const hbprice = formData.getAll('hbprice')
    const fbprice = formData.getAll('fbprice')

    // Iterate over the arrays and insert each row into the database
    const insertQuery = `INSERT INTO roomprices (scheduleid, startdate, enddate, remarks, roomno, roomtype, roomview, noofbed, roprice, bbprice, hbprice, fbprice) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`

    for (let i = 0; i < roomno.length; i++) {
      const values = [
        scheduleid,
        startdate,
        enddate,
        remarks,
        roomno[i],
        roomtype[i],
        roomview[i],
        noofbed[i],
        roprice[i],
        bbprice[i],
        hbprice[i],
        fbprice[i],
      ]
      await client.query(insertQuery, values)
    }

    return json({
      success: true,
      message: 'Hotel room-type saved successfully!',
    })
  }
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

    console.log(formData, 'hhhh')

    // Submit form data
    await fetcher.submit(formData, { method: 'post' })
    navigate(`/room-price-list`)
  }

  const handleClear = (id: number) => {
    navigate(`/offers/${id}`)
  }

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
        </div>

        <Form method="post" id="myForm">
          <div className="flex justify-between items-center mt-4 w-full">
            <div className="relative flex flex-col-3 gap-5 ml-28 mr-14">
              <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  Schedule ID
                </label>
                <Input
                  type="search"
                  name="scheduleid"
                  className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl"
                  placeholder=""
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
                  name="startdate"
                  className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                  placeholder=""
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
                  name="enddate"
                  className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                  placeholder=""
                  // value={searchName}
                  // onChange={handleSearchChangeName}
                />
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2">Remarks</label>
                <Input
                  type="text"
                  name="remarks"
                  className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl w-44"
                  placeholder=""
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
                  <TableHead className="text-center px-4 py-2">
                    {' '}
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-blue-50">
                {data.map((data: any, index: any) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        name="roomno"
                        defaultValue={data.roomno}
                        className="border-none"
                        readOnly
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        name="roomtype"
                        defaultValue={data.roomtype}
                        className="border-none"
                        readOnly
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        name="roomview"
                        defaultValue={data.roomview}
                        className="border-none"
                        readOnly
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input
                        name="noofbed"
                        defaultValue={data.noofbed}
                        className="border-none"
                        readOnly
                      ></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input className="bg-white" name="roprice"></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input className="bg-white" name="bbprice"></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input className="bg-white" name="hbprice"></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <Input className="bg-white" name="fbprice"></Input>
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      <div className="flex gap-5 ml-2">
                        <div>
                          <Button
                            onClick={() => handleClear(data.id)}
                            className="bg-blue-400 hover:bg-blue-500"
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Form>
        <div className="lg:ml-[83%] mt-8 mb-5 ">
          <Button
            onClick={handleSubmit}
            className="h-9 text-white bg-blue-500 hover:bg-blue-400 w-32"
          >
            Save
          </Button>
        </div>
        <div className="bg-slate-100 w-[40%] h-44 ml-16 mt-20 rounded-lg shadow-xl">
          <h3 className="ml-5 mt-5">RO : Room Only</h3>
          <h3 className="ml-5 mt-5">BB : Bed & Breakfast</h3>
          <h3 className="ml-5 mt-5">
            HB : Half Board (Breakfast & Dinner normally)
          </h3>
          <h3 className="ml-5 mt-5">
            FB : Full Board (Breakfast , Lunch & Dinner)
          </h3>
        </div>
      </div>
    </>
  )
}
