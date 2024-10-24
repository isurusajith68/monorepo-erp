"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileForm;
const accordion_1 = require("@/components/ui/accordion");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_1 = __importDefault(require("react"));
function ProfileForm({ formData, onFormDataChange }) {
    // Handle change in the form and pass the updated data to the parent
    const handleChange = (e) => {
        const { name, files, value } = e.target;
        onFormDataChange({
            ...formData,
            [name]: value,
        });
        if (name === 'image' && files.length > 0) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file); // Create a preview URL
            // Update the formData with the file and its URL
            onFormDataChange({
                ...formData,
                image: file,
                imageUrl: imageUrl,
            });
        }
    };
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
                  <label>Hotel Title</label>
                  <input_1.Input type="text" name="title" value={formData.title} placeholder="Enter Hotel Title" onChange={handleChange}/>
                </div>
                <div>
                  <div>
                    <label>Hotel Image</label>
                    <input_1.Input type="file" name="image" onChange={handleChange} // No value binding for file input
    />
                  </div>
                  <div>
                    {formData.imageUrl && (<div>
                        <img src={formData.imageUrl} alt="Hotel Preview" width="100"/>
                      </div>)}
                  </div>
                </div>
              </form>
            </form_1.Form>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
