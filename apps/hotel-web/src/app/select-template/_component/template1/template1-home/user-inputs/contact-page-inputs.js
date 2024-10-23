"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContactForm;
const accordion_1 = require("@/components/ui/accordion");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_1 = require("react");
function ContactForm({ contactdata, handleContactFormDataChange, }) {
    // Handle change in the form and pass the updated data to the parent
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleContactFormDataChange({
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
                  <label>Booking Email</label>
                  <input_1.Input type="email" name="bookingemail" value={contactdata.bookingemail} placeholder="Booking Email" onChange={handleChange}/>
                </div>

                <div>
                  <label>General Email</label>
                  <input_1.Input type="email" name="generaleemail" value={contactdata.generaleemail} placeholder="General Email" onChange={handleChange}/>
                </div>

                <div>
                  <label>Technical Email</label>
                  <input_1.Input type="email" name="technicalemail" value={contactdata.technicalemail} placeholder="Technical Email" onChange={handleChange}/>
                </div>
                <div>
                  <label>Address</label>
                  <input_1.Input type="text" name="address" value={contactdata.address} placeholder="Address" onChange={handleChange}/>
                </div>
              </form>
            </form_1.Form>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
