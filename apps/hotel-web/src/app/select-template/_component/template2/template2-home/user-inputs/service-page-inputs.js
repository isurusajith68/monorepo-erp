"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceForm;
const accordion_1 = require("@/components/ui/accordion");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const table_1 = require("@/components/ui/table");
const textarea_1 = require("@/components/ui/textarea");
const react_1 = __importStar(require("react"));
function ServiceForm({ serviceFormData, onFormDataChange, }) {
    const [serviceRows, setServiceRows] = (0, react_1.useState)([serviceFormData]);
    // Handle change in the form and pass the updated data to the parent
    const handleChange = (index, e) => {
        const { name, files, value } = e.target;
        const updatedServices = [...serviceRows];
        updatedServices[index] = {
            ...updatedServices[index],
            [name]: value,
        };
        if (name === 'image' && files.length > 0) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file); // Create a preview URL
            updatedServices[index] = {
                ...updatedServices[index],
                image: file,
                imageUrl: imageUrl,
            };
        }
        setServiceRows(updatedServices);
        onFormDataChange(updatedServices); // Pass updated services to parent
    };
    // Add a new service row
    const addServiceRow = () => {
        setServiceRows([...serviceRows, { serviceFormData }]);
    };
    // Remove a service row by index
    const removeServiceRow = (index) => {
        const updatedServices = serviceRows.filter((_, i) => i !== index);
        setServiceRows(updatedServices);
        onFormDataChange(updatedServices); // Pass updated services to parent
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
                      <input_1.Input type="text" name="serviceTitle" value={service.serviceTitle} placeholder="Hotel Name" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <textarea_1.Textarea name="serviceDescription" value={service.serviceDescription} placeholder="Service Description" onChange={(e) => handleChange(index, e)}/>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <input_1.Input type="file" name="image" onChange={(e) => handleChange(index, e)} // No value binding for file input
        />
                    </table_1.TableCell>
                    <table_1.TableCell>
                      {service.imageUrl && (<div>
                          <img src={service.imageUrl} alt="Hotel Preview" width="50"/>
                        </div>)}
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
