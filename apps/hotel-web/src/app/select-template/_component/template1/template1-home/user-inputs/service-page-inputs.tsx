import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";

export default function ServiceForm({
  serviceFormData,
  handleServiceFormDataChange,
}: any) {
  const [serviceRows, setServiceRows] = useState(serviceFormData || []);

  // Update serviceRows whenever serviceFormData changes
  useEffect(() => {
    setServiceRows(serviceFormData);
  }, [serviceFormData]);

  // Handle change in the form and pass the updated data to the parent
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, files, value } = event.target;
    const updatedServices = [...serviceRows];

    // Update the service field for text inputs
    if (name !== "image") {
      updatedServices[index] = {
        ...updatedServices[index],
        [name]: value,
      };
    }

    // Handle file upload for the specific service
    if (name === "image" && files) {
      const selectedFiles = Array.from(files); // Get selected files

      // Update the service row with the new files
      updatedServices[index] = {
        ...updatedServices[index],
        serviceimage: selectedFiles.map((file) => ({
          id: null,
          file,
          title: "",
        })), // Store file info
        imageUrl: selectedFiles.map((file) => URL.createObjectURL(file)), // Create preview URLs
      };
    }

    setServiceRows(updatedServices);
    handleServiceFormDataChange(updatedServices); // Pass updated services to the parent
  };

  // Add a new service row
  const addServiceRow = () => {
    setServiceRows([
      ...serviceRows,
      {
        servicetitle: "{Service Title}",
        servicedescription: "{Service Description}",
        serviceimage: [], // Initialize as an empty array for new rows
        imageUrl: [], // Initialize as an empty array for new rows
      },
    ]);
  };

  // Remove a service row by index
  const removeServiceRow = (index: number) => {
    const updatedServices = serviceRows.filter((_, i) => i !== index);
    setServiceRows(updatedServices);
    handleServiceFormDataChange(updatedServices); // Pass updated services to the parent
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
                        name="servicetitle" // Ensure correct naming
                        value={service.servicetitle || ""}
                        placeholder="Service Title"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        name="servicedescription" // Ensure correct naming
                        value={service.servicedescription || ""}
                        placeholder="Service Description"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="file"
                        name="image"
                        accept="image/*" // Restrict file selection to images
                        onChange={(e) => handleChange(index, e)} // Handle file selection
                        multiple // Allow multiple files
                      />
                    </TableCell>
                    <TableCell>
                      {service.imageUrl &&
                        service.imageUrl.map((url: any, idx: any) => (
                          <div key={idx}>
                            <img
                              src={url}
                              alt={`Service Preview ${idx}`}
                              width="50"
                            />
                          </div>
                        ))}
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
