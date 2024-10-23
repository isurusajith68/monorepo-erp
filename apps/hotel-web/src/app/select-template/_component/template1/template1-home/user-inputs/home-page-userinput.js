"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileForm;
const page_1 = require("@/app/imageSave/page");
const accordion_1 = require("@/components/ui/accordion");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_1 = require("react");
function ProfileForm({ formData, setParentFormDataChange, }) {
    // Handle change in the form and pass the updated data to the parent
    const [fileRecords, setFileRecords] = (0, react_1.useState)([]);
    const handleChange = (e) => {
        const { name, files, value } = e.target;
        setParentFormDataChange({
            ...formData,
            [name]: value,
            fileRecords: fileRecords,
        });
    };
    (0, react_1.useEffect)(() => {
        setParentFormDataChange({
            ...formData,
            fileRecords: fileRecords,
        });
    }, [fileRecords]);
    return (<div>
      <accordion_1.Accordion type="single" collapsible>
        <accordion_1.AccordionItem value="item-1">
          <accordion_1.AccordionTrigger className="text-xl">
            Hotel Information
          </accordion_1.AccordionTrigger>
          <accordion_1.AccordionContent>
            <form_1.Form>
              <form>
                <div>
                  <label>Hotel Name</label>
                  <input_1.Input type="text" name="name" value={formData.name} placeholder="Hotel Name" onChange={handleChange}/>
                </div>

                <div>
                  <label>Phone Number</label>
                  <input_1.Input type="text" name="phone" value={formData.phone} placeholder="Enter phone number" onChange={handleChange}/>
                </div>

                <div>
                  <label>Email</label>
                  <input_1.Input type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange}/>
                </div>

                <div>
                  <label>Hotel Title</label>
                  <input_1.Input type="text" name="title" value={formData.title} placeholder="Enter Hotel Title" onChange={handleChange}/>
                </div>
                <div>
                  <div>
                    <label>Hotel Image</label>
                    {/* <Input
          type="file"
          name="image"
          onChange={handleChange} // No value binding for file input
        /> */}

                    <page_1.default invoiceid={8} setParentFileRecords={setFileRecords}/>
                  </div>
                  {/* <div>
          {formData.imageUrl && (
            <div>
              <img
                src={formData.imageUrl}
                alt="Hotel Preview"
                width="100"
              />
            </div>
          )}
        </div> */}
                </div>
              </form>
            </form_1.Form>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
