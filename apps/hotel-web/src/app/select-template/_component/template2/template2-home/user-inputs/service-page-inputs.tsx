import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

export default function ServiceForm({ serviceFormData, onFormDataChange }: any) {
  const [serviceRows, setServiceRows] = useState([serviceFormData]);

  // Handle change in the form and pass the updated data to the parent
  const handleChange = (index :any, e:any) => {
    const { name, files, value } = e.target;
    const updatedServices = [...serviceRows];
    updatedServices[index] = {
      ...updatedServices[index],
      [name]: value,
    };

    if (name === "image" && files.length > 0) {
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
    setServiceRows([
      ...serviceRows,
      { serviceFormData },
    ]);
  };

  // Remove a service row by index
  const removeServiceRow = (index:any) => {
    const updatedServices = serviceRows.filter((_, i) => i !== index);
    setServiceRows(updatedServices);
    onFormDataChange(updatedServices); // Pass updated services to parent
  };

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">
            Hotel Services Information
          </AccordionTrigger>
          <AccordionContent>
            <Table className="w-[150%] overflow-x-auto overflow-y-auto">
              <TableCaption>A list of your Hotel Services.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Services Title</TableHead>
                  <TableHead>Services Description</TableHead>
                  <TableHead>Services Icon</TableHead>
                  <TableHead>Services Icon Preview</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceRows.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        type="text"
                        name="serviceTitle"
                        value={service.serviceTitle}
                        placeholder="Hotel Name"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        name="serviceDescription"
                        value={service.serviceDescription}
                        placeholder="Service Description"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="file"
                        name="image"
                        onChange={(e) => handleChange(index, e)} // No value binding for file input
                      />
                    </TableCell>
                    <TableCell>
                      {service.imageUrl && (
                        <div>
                          <img
                            src={service.imageUrl}
                            alt="Hotel Preview"
                            width="50"
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => removeServiceRow(index)}
                        className="bg-red-500 text-white"
                      >
                        X
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              onClick={addServiceRow}
              className="mt-4 p-2 bg-blue-500 text-white"
            >
              Add Service
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
