"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceForm;
const accordion_1 = require("@/components/ui/accordion");
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const react_1 = require("react");
function ServiceForm({ serviceFormData, handleServiceFormDataChange, }) {
    const [serviceRows, setServiceRows] = (0, react_1.useState)(serviceFormData || []);
    // Update serviceRows whenever serviceFormData changes
    (0, react_1.useEffect)(() => {
        setServiceRows(serviceFormData);
    }, [serviceFormData]);
    // Handle change in the form and pass the updated data to the parent
    const handleChange = (index, event) => {
        const { name, files, value } = event.target;
        const updatedServices = [...serviceRows];
        // Update the service field for text inputs
        if (name !== 'image') {
            updatedServices[index] = {
                ...updatedServices[index],
                [name]: value,
            };
        }
        // Handle file upload for the specific service
        if (name === 'image' && files) {
            const selectedFiles = Array.from(files); // Get selected files
            // Update the service row with the new files
            updatedServices[index] = {
                ...updatedServices[index],
                serviceimage: selectedFiles.map((file) => ({
                    id: null,
                    file,
                    title: '',
                })), // Store file info
                imageUrl: selectedFiles.map((file) => URL.createObjectURL(file)), // Create preview URLs
            };
        }
        setServiceRows(updatedServices);
        handleServiceFormDataChange(updatedServices); // Pass updated services to the parent
    };
    // Add a new service row
    const addServiceRow = () => {
        setServiceRows([
            ...serviceRows,
            {
                servicetitle: '{Service Title}',
                servicedescription: '{Service Description}',
                serviceimage: [], // Initialize as an empty array for new rows
                imageUrl: [], // Initialize as an empty array for new rows
            },
        ]);
    };
    // Remove a service row by index
    const removeServiceRow = (index) => {
        const updatedServices = serviceRows.filter((_, i) => i !== index);
        setServiceRows(updatedServices);
        handleServiceFormDataChange(updatedServices); // Pass updated services to the parent
    };
    return (<div>
      <accordion_1.Accordion type="single" collapsible>
        <accordion_1.AccordionItem value="item-1">
          <accordion_1.AccordionTrigger className="text-xl">
            Hotel Services Information
          </accordion_1.AccordionTrigger>
          <accordion_1.AccordionContent>
            <table_1.Table className="w-[150%] overflow-x-auto overflow-y-auto">
              <table_1.TableCaption>A list of your Hotel Services.</table_1.TableCaption>
              <table_1.TableHeader>
                <table_1.TableRow>
                  <table_1.TableHead>Services Title</table_1.TableHead>
                  <table_1.TableHead>Services Description</table_1.TableHead>
                  <table_1.TableHead>Services Icon</table_1.TableHead>
                  <table_1.TableHead>Services Icon Preview</table_1.TableHead>
                  <table_1.TableHead>Actions</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {serviceRows.map((service, index) => (<table_1.TableRow key={index}>
                    <table_1.TableCell>
                      <input_1.Input type="text" name="servicetitle" // Ensure correct naming
         value={service.servicetitle || ''} placeholder="Service Title" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <textarea_1.Textarea name="servicedescription" // Ensure correct naming
         value={service.servicedescription || ''} placeholder="Service Description" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <input_1.Input type="file" name="image" accept="image/*" // Restrict file selection to images
         onChange={(e) => handleChange(index, e)} // Handle file selection
         multiple // Allow multiple files
        />
                    </table_1.TableCell>
                    <table_1.TableCell>
                      {service.imageUrl &&
                service.imageUrl.map((url, idx) => (<div key={idx}>
                            <img src={url} alt={`Service Preview ${idx}`} width="50"/>
                          </div>))}
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <button_1.Button onClick={() => removeServiceRow(index)} className="bg-red-500 text-white">
                        X
                      </button_1.Button>
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>
            <button_1.Button onClick={addServiceRow} className="mt-4 p-2 bg-blue-500 text-white">
              Add Service
            </button_1.Button>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
