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
import { Form, Link, useLoaderData, useNavigate } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/node'
import { client } from '~/db.server'
import { useState } from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const result = await client.query('SELECT * FROM roomprices')
  if (result.rows.length === 0) {
    return {}
  } else {
    console.log('result.rows', result.rows)
    return result.rows
  }
}

export default function RoomPriceList() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()
  const [searchId, setSearchId] = useState('')
  const [searchDate, setsearchDate] = useState('')

  const handleEdit = (id: number) => {
    navigate(`/room-price-edit/${id}`)
  }

  const handleView = (id: number) => {
    navigate(`/room-price-view/${id}`)
  }

  // Filter the data based on `id` and `oname`
  const filteredData = data.filter((item: any) => {
    const matchesSearchCriteria = item.scheduleid.toString().includes(searchId)
    return matchesSearchCriteria
  })

  return (
    <>
      <div className="ml-[18.4%] h-screen mt-14">
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room Price Schedule</h1>
            <Link to={'/room-price-add'} className="lg:ml-[60%] mt-5">
              <Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
                {' '}
                + Add New
              </Button>
            </Link>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2" />
        </div>

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-3 gap-16 ml-28">
            <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
              <label className="font-extralight text-sm mt-2 w-full">
                Schedule ID
              </label>
              <Input
                type="search"
                className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl"
                placeholder=""
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">
                Start Date
              </label>
              <Input
                type="date"
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                placeholder=""
                value={searchDate}
                onChange={(e) => setsearchDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">
                End Date
              </label>
              <Input
                type="date"
                className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl"
                placeholder=""
                // value={searchName}
                // onChange={handleSearchChangeName}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[85%] ml-[5%]">
          <Table className="rounded-xl border border-blue-300 overflow-hidden">
            <TableHeader className="bg-blue-300 text-center border border-blue-300">
              <TableRow>
                <TableHead className="text-center px-4 py-2">
                  Schedule ID
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  Start Date
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  End Date
                </TableHead>
                <TableHead className="text-center py-2">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-blue-50">
              {filteredData.map((data: any, index: any) => {
                // Convert and format the startdate and enddate to yyyy.mm.dd
                const startDateObj = new Date(data.startdate)
                const formattedStartDate = `${startDateObj.getFullYear()}.${(
                  startDateObj.getMonth() + 1
                )
                  .toString()
                  .padStart(2, '0')}.${startDateObj
                  .getDate()
                  .toString()
                  .padStart(2, '0')}`

                const endDateObj = new Date(data.enddate)
                const formattedEndDate = `${endDateObj.getFullYear()}.${(
                  endDateObj.getMonth() + 1
                )
                  .toString()
                  .padStart(2, '0')}.${endDateObj
                  .getDate()
                  .toString()
                  .padStart(2, '0')}`

                return (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      {data.scheduleid}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {formattedStartDate}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {formattedEndDate}
                    </TableCell>
                    <TableCell className=" py-2 px-4">
                      <div className="flex items-center lg:ml-[20%]">
                        <div>
                          <Button
                            onClick={() => handleView(data.scheduleid)}
                            className="bg-blue-600 "
                          >
                            View
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleEdit(data.id)}
                            className="bg-blue-600 ml-5"
                          >
                            Edit
                          </Button>
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
                                  permanently delete the room type.
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
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
