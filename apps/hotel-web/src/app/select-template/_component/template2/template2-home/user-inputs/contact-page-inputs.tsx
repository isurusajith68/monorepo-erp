import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

export default function ContactForm({ contactdata, onFormDataChange }: any) {
  // Handle change in the form and pass the updated data to the parent
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    onFormDataChange({
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
                <div>
                  <label>Phone Number</label>
                  <Input
                    type="text"
                    name="phone"
                    value={contactdata.phone}
                    placeholder="Enter phone number"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={contactdata.email}
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Technical Email</label>
                  <Input
                    type="text"
                    name="address"
                    value={contactdata.address}
                    placeholder="Address"
                    onChange={handleChange}
                  />
                </div>
                </div>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
