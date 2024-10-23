"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContactForm;
const accordion_1 = require("@/components/ui/accordion");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_1 = require("react");
function ContactForm({ contactdata, onFormDataChange }) {
    // Handle change in the form and pass the updated data to the parent
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFormDataChange({
            ...contactdata,
            [name]: value,
        });
    };
    return (<div>
      <accordion_1.Accordion type="single" collapsible>
        <accordion_1.AccordionItem value="item-1">
          <accordion_1.AccordionTrigger className="text-xl">
            Contact Information
          </accordion_1.AccordionTrigger>
          <accordion_1.AccordionContent>
            <form_1.Form>
              <form>
                <div>
                  <div>
                    <label>Phone Number</label>
                    <input_1.Input type="text" name="phone" value={contactdata.phone} placeholder="Enter phone number" onChange={handleChange}/>
                  </div>

                  <div>
                    <label>Email</label>
                    <input_1.Input type="email" name="email" value={contactdata.email} placeholder="Enter email" onChange={handleChange}/>
                  </div>

                  <div>
                    <label>Technical Email</label>
                    <input_1.Input type="text" name="address" value={contactdata.address} placeholder="Address" onChange={handleChange}/>
                  </div>
                </div>
              </form>
            </form_1.Form>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
