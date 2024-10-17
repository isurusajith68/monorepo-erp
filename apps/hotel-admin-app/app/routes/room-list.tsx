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
import { json, Link, useLoaderData, useNavigate } from '@remix-run/react'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { client } from '~/db.server'

export async function loader({ request }: LoaderFunctionArgs) {
  // Fetch the hotel rooms from the database
  const result = await client.query('SELECT * FROM hotelrooms')
  console.log("ssssss",result)
  // Convert Buffer to Base64 and map over the results
  const hotels = result.rows.map((hotel: any) => ({
    ...hotel,
    images: hotel.images
      ? `data:image/jpeg;base64,${hotel.images.toString('base64')}`
      : null,
  }))

  // Check if there are no rows, return an empty object
  if (result.rows.length === 0) {
    return json({})
  } else {
    // Return the rows with hotel data
    console.log('Processed hotels data: ', { hotels })
    return json({ hotels })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const id = formData.get('id')

  if (id) {
    // DELETE request
    const query = `DELETE FROM hotelroomtypes WHERE id = $1`
    await client.query(query, [id])
    return json({
      success: true,
      message: 'Hotel room-type deleted successfully!',
    })
  } else {
    return
  }
}

export default function RoomList() {
  const navigate = useNavigate()
  const data = useLoaderData<typeof loader>()?.hotels || [] // Fallback to an empty array

  console.log('first', data)

  const handleEdit = (id: number) => {
    navigate(`/room-type/${id}`)
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

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[85%] ml-[5%]">
          <Table className="rounded-xl border border-blue-300 overflow-hidden">
            <TableHeader className="bg-blue-300 text-center border border-blue-300">
              <TableRow>
                <TableHead className="text-center px-4 py-2">
                  Room Number{' '}
                </TableHead>
                <TableHead className="text-center px-4 py-2">
                  Room Type{' '}
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
                data.map((data: any, index: any) => (
                  <TableRow key={index} className="hover:bg-blue-100">
                    <TableCell className="text-center px-4 py-2">
                      {data.roomno}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {data.roomtype}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {data.noofbed}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {data.ac === 'on' && (
                        <span style={{ color: 'green', marginRight: '10px' }}>
                          AC
                        </span>
                      )}
                      {data.tv === 'on' && (
                        <span style={{ color: 'blue', marginRight: '10px' }}>
                          TV
                        </span>
                      )}
                      {data.wifi === 'on' && (
                        <span style={{ color: 'purple', marginRight: '10px' }}>
                          WiFi
                        </span>
                      )}
                      {data.balcony === 'on' && (
                        <span style={{ color: 'orange', marginRight: '10px' }}>
                          Balcony
                        </span>
                      )}
                    </TableCell>

                    {/* Display the base64 image */}
                    <TableCell className="text-center px-4 py-2">
                      {data.images ? (
                        <img
                          src={data.images}
                          alt="Room Image"
                          width={20}
                          height={20}
                        />
                      ) : (
                        'No Image Available'
                      )}
                    </TableCell>

                    <TableCell className="text-center px-4 py-2">
                      <div className="flex gap-5 ml-2">
                        <div>
                          <Button className="bg-blue-600">Edit</Button>
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
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
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
      </div>
    </>
  )
}
