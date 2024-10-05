import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

export default function ProfileForm({ formData, onFormDataChange }: any) {
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
        imageUrl: imageUrl
      });
    }
  };

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">
            Hotel Information
          </AccordionTrigger>
          <AccordionContent>
            <Form>
              <form>
                <div>
                  <label>Hotel Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Hotel Name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Hotel Title</label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Enter Hotel Title"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <div>
                    <label>Hotel Image</label>
                    <Input
                      type="file"
                      name="image"
                      onChange={handleChange} // No value binding for file input
                    />
                  </div>
                  <div>
                    {formData.imageUrl && (
                      <div>
                        <img
                          src={formData.imageUrl}
                          alt="Hotel Preview"
                          width="100"
                        />
                      </div>
                    )}
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
