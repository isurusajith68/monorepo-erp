"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoomForm;
const accordion_1 = require("@/components/ui/accordion");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const table_1 = require("@/components/ui/table");
const textarea_1 = require("@/components/ui/textarea");
const react_1 = require("react");
function RoomForm({ roomsFormData, roomdescription, onFormDataChange, onFormDataChange1, }) {
    const [roomsRows, setRoomsRows] = (0, react_1.useState)([roomsFormData]);
    // Handle change in the form and pass the updated data to the parent
    const handleChange = (index, e) => {
        const { name, files, value } = e.target;
        const updatedRooms = [...roomsRows];
        updatedRooms[index] = {
            ...updatedRooms[index],
            [name]: value,
        };
        if (name === 'image' && files.length > 0) {
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
    const handleDescriptionChange = (e) => {
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
    const RemoveRoomsRow = (index) => {
        const updatedRooms = roomsRows.filter((_, i) => i !== index);
        setRoomsRows(updatedRooms);
        onFormDataChange(updatedRooms); // Pass updated services to parent
    };
    return (<div className="w-[100%] overflow-hidden">
      <accordion_1.Accordion type="single" collapsible>
        <accordion_1.AccordionItem value="item-1">
          <accordion_1.AccordionTrigger className="text-xl">
            Hotel Rooms Information
          </accordion_1.AccordionTrigger>
          <accordion_1.AccordionContent>
            <form>
              <div>
                <label>Room Description</label>
                <textarea_1.Textarea name="roomsdescription" value={roomdescription.roomsdescription} placeholder="Room description" onChange={handleDescriptionChange} // Fixed this handler
     className="h-20"/>
              </div>
            </form>
            <label_1.Label>Add Room</label_1.Label>
            <table_1.Table className="w-[100%] overflow-x-auto overflow-y-auto">
              <table_1.TableCaption>A list of your Hotel Rooms.</table_1.TableCaption>
              <table_1.TableHeader>
                <table_1.TableRow>
                  <table_1.TableHead>Rooms Title</table_1.TableHead>
                  <table_1.TableHead>Rooms Price</table_1.TableHead>
                  <table_1.TableHead>Rooms Icon</table_1.TableHead>
                  <table_1.TableHead>Rooms Icon Preview</table_1.TableHead>
                  <table_1.TableHead>Actions</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {roomsRows.map((rooms, index) => (<table_1.TableRow key={index}>
                    <table_1.TableCell>
                      <input_1.Input type="text" name="roomtitle" value={rooms.roomtitle} placeholder="Room Title" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <input_1.Input type="text" name="roomprice" value={rooms.roomprice} placeholder="Room Price" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <input_1.Input type="file" name="image" onChange={(e) => handleChange(index, e)} // No value binding for file input
        />
                    </table_1.TableCell>
                    <table_1.TableCell>
                      {rooms.imageUrl && (<div>
                          <img src={rooms.imageUrl} alt="Room Preview" width="50"/>
                        </div>)}
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <button_1.Button onClick={() => RemoveRoomsRow(index)} className="bg-red-500 text-white">
                        X
                      </button_1.Button>
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>
            <button_1.Button onClick={AddRoomsRow} className="mt-4 p-2 bg-blue-500 text-white">
              Add Room
            </button_1.Button>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
