import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RoomForm({ roomsFormData, handleRoomsFormDataChange }: any) {
  const [roomsRows, setRoomsRows] = useState(roomsFormData || []);

  // Update roomsRows whenever roomsFormData changes
  useEffect(() => {
    setRoomsRows(roomsFormData);
  }, [roomsFormData]);

  // Handle change in the form and pass the updated data to the parent
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, files, value } = event.target;
    const updatedRooms = [...roomsRows];

    // Update the room field for text inputs
    if (name !== "image") {
      updatedRooms[index] = {
        ...updatedRooms[index],
        [name]: value,
      };
    }

    // Handle file upload for the specific room
    if (name === "image" && files) {
      const selectedFiles = Array.from(files); // Get selected files

      // Update the room row with the new files
      updatedRooms[index] = {
        ...updatedRooms[index],
        roomimage: selectedFiles, // Store file info for multiple images
        imageUrl: selectedFiles.map((file) => URL.createObjectURL(file)), // Create preview URLs for all images
      };
    }

    setRoomsRows(updatedRooms);
    handleRoomsFormDataChange(updatedRooms); // Pass updated rooms to the parent
  };

  // Add a new room row
  const addRoomRow = () => {
    setRoomsRows([
      ...roomsRows,
      {
        roomtitle: "{Room Title}",
        roomprice: "{Room Price}",
        roombeds: "{03}",
        roombath: "{02}",
        otherfacility: "{Wifi}",
        roomsdescription: "{Room Description}",
        roomimage: [], // Initialize as an empty array for multiple images
        imageUrl: [], // Initialize as an empty array for preview URLs
      },
    ]);
  };

  // Remove a room row by index
  const removeRoomRow = (index: number) => {
    const updatedRooms = roomsRows.filter((_, i) => i !== index);
    setRoomsRows(updatedRooms);
    handleRoomsFormDataChange(updatedRooms); // Pass updated rooms to the parent
  };

  return (
    <div className="w-[100%] overflow-hidden">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Hotel Rooms Information</AccordionTrigger>
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
                {roomsRows.map((room, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        type="text"
                        name="roomtitle"
                        value={room.roomtitle}
                        placeholder="Room Title"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        name="roomprice"
                        value={room.roomprice}
                        placeholder="Room Price"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        name="roombeds"
                        value={room.roombeds}
                        placeholder="Number of Beds"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        name="roombath"
                        value={room.roombath}
                        placeholder="Number of Baths"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        name="otherfacility"
                        value={room.otherfacility}
                        placeholder="Other Facility"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        name="roomsdescription"
                        value={room.roomsdescription}
                        placeholder="Room Description"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="file"
                        name="image"
                        onChange={(e) => handleChange(index, e)}
                        multiple // Allow multiple files
                      />
                    </TableCell>
                    <TableCell>
                      {room.imageUrl &&
                        room.imageUrl.map((url, idx) => (
                          <div key={idx}>
                            <img src={url} alt={`Room Preview ${idx}`} width="50" />
                          </div>
                        ))}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => removeRoomRow(index)}
                        className="bg-red-500 text-white"
                      >
                        X
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={addRoomRow} className="mt-4 p-2 bg-blue-500 text-white">
              Add Room
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
