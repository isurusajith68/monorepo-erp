import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

export default function RoomForm({ roomsFormData, onFormDataChange }: any) {
  const [roomsRows, setRoomsRows] = useState([roomsFormData])

  // Handle change in the form and pass the updated data to the parent
  const handleChange = (index: any, e: any) => {
    const { name, files, value } = e.target
    const updatedRooms = [...roomsRows]
    updatedRooms[index] = {
      ...updatedRooms[index],
      [name]: value,
    }

    if (name === 'image' && files.length > 0) {
      const file = files[0]
      const imageUrl = URL.createObjectURL(file) // Create a preview URL

      updatedRooms[index] = {
        ...updatedRooms[index],
        image: file,
        imageUrl: imageUrl,
      }
    }

    setRoomsRows(updatedRooms)
    onFormDataChange(updatedRooms) // Pass updated Rooms to parent
  }

  // Add a new service row
  const AddRoomsRow = () => {
    setRoomsRows([...roomsRows, { roomsFormData }])
  }

  // Remove a service row by index
  const RemoveRoomsRow = (index: any) => {
    const updatedRooms = roomsRows.filter((_, i) => i !== index)
    setRoomsRows(updatedRooms)
    onFormDataChange(updatedRooms) // Pass updated services to parent
  }

  return (
    <div className="w-[100%] overflow-hidden">
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">
              Hotel Rooms Information
            </AccordionTrigger>
            <AccordionContent>
              <Table className="w-[200%] overflow-x-auto overflow-y-auto">
                <TableCaption>A list of your Hotel Rooms.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rooms Title</TableHead>
                    <TableHead>Rooms Price</TableHead>
                    <TableHead>No of Beds</TableHead>
                    <TableHead>No of Bath</TableHead>
                    <TableHead>Other Facility</TableHead>
                    <TableHead>Rooms Description</TableHead>
                    <TableHead>Rooms Icon</TableHead>
                    <TableHead>Rooms Icon Preview</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roomsRows.map((rooms, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          type="text"
                          name="roomtitle"
                          value={rooms.roomtitle}
                          placeholder="Hotel Name"
                          onChange={(e) => handleChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          name="roomprice"
                          value={rooms.roomprice}
                          placeholder="Hotel Name"
                          onChange={(e) => handleChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          name="roombeds"
                          value={rooms.roombeds}
                          placeholder="Hotel Name"
                          onChange={(e) => handleChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          name="roombath"
                          value={rooms.roombath}
                          placeholder="Hotel Name"
                          onChange={(e) => handleChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          name="otherfacility"
                          value={rooms.otherfacility}
                          placeholder="Hotel Name"
                          onChange={(e) => handleChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Textarea
                          name="roomsdescription"
                          value={rooms.roomsdescription}
                          placeholder="rooms Description"
                          onChange={(e) => handleChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="file"
                          name="image"
                          onChange={(e) => handleChange(index, e)} // No value binding for file input
                        />
                      </TableCell>
                      <TableCell>
                        {rooms.imageUrl && (
                          <div>
                            <img
                              src={rooms.imageUrl}
                              alt="Hotel Preview"
                              width="50"
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => RemoveRoomsRow(index)}
                          className="bg-red-500 text-white"
                        >
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                onClick={AddRoomsRow}
                className="mt-4 p-2 bg-blue-500 text-white"
              >
                Add Room
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
