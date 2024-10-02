import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

export default function RoomForm({
  roomsFormData,
  roomdescription,
  onFormDataChange,
  onFormDataChange1,
}: any) {
  const [roomsRows, setRoomsRows] = useState([roomsFormData]);

  // Handle change in the form and pass the updated data to the parent
  const handleChange = (index: any, e: any) => {
    const { name, files, value } = e.target;
    const updatedRooms = [...roomsRows];
    updatedRooms[index] = {
      ...updatedRooms[index],
      [name]: value,
    };

    if (name === "image" && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file); // Create a preview URL

      updatedRooms[index] = {
        ...updatedRooms[index],
        image: file,
        imageUrl: imageUrl,
      };
    }

    setRoomsRows(updatedRooms);
    onFormDataChange(updatedRooms);
  };

  const handleDescriptionChange = (e: any) => {
    const { name, value } = e.target;
    onFormDataChange1({
      ...roomdescription,
      [name]: value,
    });
  };

  // Add a new room row
  const AddRoomsRow = () => {
    setRoomsRows([...roomsRows, roomsFormData]);
  };

  // Remove a room row by index
  const RemoveRoomsRow = (index: any) => {
    const updatedRooms = roomsRows.filter((_, i) => i !== index);
    setRoomsRows(updatedRooms);
    onFormDataChange(updatedRooms); // Pass updated services to parent
  };

  return (
    <div className="w-[100%] overflow-hidden">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">
            Hotel Rooms Information
          </AccordionTrigger>
          <AccordionContent>
            <form>
              <div>
                <label>Room Description</label>
                <Textarea
                  name="roomsdescription"
                  value={roomdescription.roomsdescription}
                  placeholder="Room description"
                  onChange={handleDescriptionChange} // Fixed this handler
                  className="h-20"
                />
              </div>
            </form>
            <Label>Add Room</Label>
            <Table className="w-[100%] overflow-x-auto overflow-y-auto">
              <TableCaption>A list of your Hotel Rooms.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Rooms Title</TableHead>
                  <TableHead>Rooms Price</TableHead>
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
                        placeholder="Room Title"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        name="roomprice"
                        value={rooms.roomprice}
                        placeholder="Room Price"
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
                            alt="Room Preview"
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
  );
}
