import PayBillForm, { FileRecord } from '@/app/imageSave/page'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'

export default function ProfileForm({
  formData,
  setParentFormDataChange,
}: any) {
  // Handle change in the form and pass the updated data to the parent
  const [fileRecords, setFileRecords] = useState<FileRecord[]>([])

  const handleChange = (e) => {
    const { name, files, value } = e.target

    setParentFormDataChange({
      ...formData,
      [name]: value,
      fileRecords: fileRecords,
    })
  }

  useEffect(() => {
    setParentFormDataChange({
      ...formData,
      fileRecords: fileRecords,
    })
  }, [fileRecords])

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
                  <label>Phone Number</label>
                  <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter phone number"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter email"
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
                    {/* <Input
                      type="file"
                      name="image"
                      onChange={handleChange} // No value binding for file input
                    /> */}

                    <PayBillForm
                      invoiceid={8}
                      setParentFileRecords={setFileRecords}
                    />
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
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
