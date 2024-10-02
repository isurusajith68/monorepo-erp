import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

export default function ContactForm({ contactdata, handleContactFormDataChange }: any) {
  // Handle change in the form and pass the updated data to the parent
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    handleContactFormDataChange({
      ...contactdata,
      [name]: value,
    });
  };

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">
            Contact Information
          </AccordionTrigger>
          <AccordionContent>
            <Form>
              <form>
                <div>
                  <label>Booking Email</label>
                  <Input
                    type="email"
                    name="bookingemail"
                    value={contactdata.bookingemail}
                    placeholder="Booking Email"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>General Email</label>
                  <Input
                    type="email"
                    name="generaleemail"
                    value={contactdata.generaleemail}
                    placeholder="General Email"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Technical Email</label>
                  <Input
                    type="email"
                    name="technicalemail"
                    value={contactdata.technicalemail}
                    placeholder="Technical Email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Address</label>
                  <Input
                    type="text"
                    name="address"
                    value={contactdata.address}
                    placeholder="Address"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
