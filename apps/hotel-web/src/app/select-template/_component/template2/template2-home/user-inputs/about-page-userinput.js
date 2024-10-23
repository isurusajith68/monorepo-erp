"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AboutProfileForm;
const accordion_1 = require("@/components/ui/accordion");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const react_1 = require("react");
function AboutProfileForm({ formData, onFormDataChange }) {
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        // Check if the input is for images
        if (name === 'aboutimages' && files.length > 0) {
            const selectedFiles = Array.from(files);
            // Limit selection to a maximum of 4 files
            if (selectedFiles.length > 4) {
                alert('You can only select a maximum of 4 images.');
                return;
            }
            const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
            // Update the formData with the file objects and image URLs
            onFormDataChange({
                ...formData,
                aboutimages: selectedFiles, // Store the selected files
                aboutimageUrls: imageUrls, // Store the image preview URLs
            });
        }
        else {
            // Update the formData for text fields (like description, room, staff, client)
            onFormDataChange({
                ...formData,
                [name]: value, // Update the field with the corresponding value
            });
        }
    };
    return (<div>
      <accordion_1.Accordion type="single" collapsible>
        <accordion_1.AccordionItem value="item-1">
          <accordion_1.AccordionTrigger className="text-xl">About Hotel</accordion_1.AccordionTrigger>
          <accordion_1.AccordionContent>
            <form_1.Form>
              <form>
                <div>
                  <label>Hotel Description</label>
                  <textarea_1.Textarea name="description" value={formData.description} placeholder="Hotel description" onChange={handleChange} className="h-20"/>
                </div>
                <div>
                  <label>About Hotel</label>
                  <textarea_1.Textarea name="description2" value={formData.description2} placeholder="Hotel description" onChange={handleChange}/>
                </div>
                <div>
                  <label>Hotel Images</label>
                  <input_1.Input type="file" name="aboutimages" multiple onChange={handleChange}/>
                </div>
                <div className="grid">
                  {formData.aboutimageUrls &&
            formData.aboutimageUrls.length > 0 && (<div className="flex gap-2">
                        {formData.aboutimageUrls.map((imageUrl, index) => (<img key={index} src={imageUrl} alt={`Hotel Preview ${index + 1}`} width="50"/>))}
                      </div>)}
                </div>
              </form>
            </form_1.Form>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
