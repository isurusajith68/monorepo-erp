"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoomForm;
const react_1 = require("react");
const accordion_1 = require("@/components/ui/accordion");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const table_1 = require("@/components/ui/table");
function RoomForm({ roomsFormData, handleRoomsFormDataChange, }) {
    const [roomsRows, setRoomsRows] = (0, react_1.useState)(roomsFormData || []);
    // Update roomsRows whenever roomsFormData changes
    (0, react_1.useEffect)(() => {
        setRoomsRows(roomsFormData);
    }, [roomsFormData]);
    // Handle change in the form and pass the updated data to the parent
    const handleChange = (index, event) => {
        const { name, files, value } = event.target;
        const updatedRooms = [...roomsRows];
        // Update the room field for text inputs
        if (name !== 'image') {
            updatedRooms[index] = {
                ...updatedRooms[index],
                [name]: value,
            };
        }
        // Handle file upload for the specific room
        if (name === 'image' && files) {
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
                roomtitle: '{Room Title}',
                roomprice: '{Room Price}',
                roombeds: '{03}',
                roombath: '{02}',
                otherfacility: '{Wifi}',
                roomsdescription: '{Room Description}',
                roomimage: [], // Initialize as an empty array for multiple images
                imageUrl: [], // Initialize as an empty array for preview URLs
            },
        ]);
    };
    // Remove a room row by index
    const removeRoomRow = (index) => {
        const updatedRooms = roomsRows.filter((_, i) => i !== index);
        setRoomsRows(updatedRooms);
        handleRoomsFormDataChange(updatedRooms); // Pass updated rooms to the parent
    };
    return (<div className="w-[100%] overflow-hidden">
      <accordion_1.Accordion type="single" collapsible>
        <accordion_1.AccordionItem value="item-1">
          <accordion_1.AccordionTrigger className="text-xl">
            Hotel Rooms Information
          </accordion_1.AccordionTrigger>
          <accordion_1.AccordionContent>
            <table_1.Table className="w-[200%] overflow-x-auto overflow-y-auto">
              <table_1.TableCaption>A list of your Hotel Rooms.</table_1.TableCaption>
              <table_1.TableHeader>
                <table_1.TableRow>
                  <table_1.TableHead>Rooms Title</table_1.TableHead>
                  <table_1.TableHead>Rooms Price</table_1.TableHead>
                  <table_1.TableHead>No of Beds</table_1.TableHead>
                  <table_1.TableHead>No of Bath</table_1.TableHead>
                  <table_1.TableHead>Other Facility</table_1.TableHead>
                  <table_1.TableHead>Rooms Description</table_1.TableHead>
                  <table_1.TableHead>Rooms Icon</table_1.TableHead>
                  <table_1.TableHead>Rooms Icon Preview</table_1.TableHead>
                  <table_1.TableHead>Actions</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {roomsRows.map((room, index) => (<table_1.TableRow key={index}>
                    <table_1.TableCell>
                      <input_1.Input type="text" name="roomtitle" value={room.roomtitle} placeholder="Room Title" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <input_1.Input type="text" name="roomprice" value={room.roomprice} placeholder="Room Price" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <input_1.Input type="text" name="roombeds" value={room.roombeds} placeholder="Number of Beds" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <input_1.Input type="text" name="roombath" value={room.roombath} placeholder="Number of Baths" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <input_1.Input type="text" name="otherfacility" value={room.otherfacility} placeholder="Other Facility" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <textarea_1.Textarea name="roomsdescription" value={room.roomsdescription} placeholder="Room Description" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <input_1.Input type="file" name="image" onChange={(e) => handleChange(index, e)} multiple // Allow multiple files
        />
                    </table_1.TableCell>
                    <table_1.TableCell>
                      {room.imageUrl &&
                room.imageUrl.map((url, idx) => (<div key={idx}>
                            <img src={url} alt={`Room Preview ${idx}`} width="50"/>
                          </div>))}
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <button_1.Button onClick={() => removeRoomRow(index)} className="bg-red-500 text-white">
                        X
                      </button_1.Button>
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>
            <button_1.Button onClick={addRoomRow} className="mt-4 p-2 bg-blue-500 text-white">
              Add Room
            </button_1.Button>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
