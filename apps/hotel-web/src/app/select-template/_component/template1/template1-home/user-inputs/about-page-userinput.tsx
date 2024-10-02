'use clinet'

import PayBillForm, { FileRecord } from '@/app/imageSave/page'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'

export default function AboutProfileForm({
  aboutFormData,
  handleAboutFormDataChange,
}: any) {
  const [aboutimages, setFileRecords] = useState<FileRecord[]>([])

  const handleChange = (e) => {
    const { name, files, value } = e.target

    handleAboutFormDataChange({
      ...aboutFormData,
      [name]: value,
      aboutimages: aboutimages,
    })
  }

  useEffect(() => {
    handleAboutFormDataChange({
      ...aboutFormData,
      aboutimages: aboutimages,
    })
  }, [aboutimages])

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">About Hotel</AccordionTrigger>
          <AccordionContent>
            <Form>
              <form>
                <div>
                  <label>Hotel Description</label>
                  <Textarea
                    name="description"
                    value={aboutFormData.description}
                    placeholder="Hotel description"
                    onChange={handleChange}
                    className="h-20"
                  />
                </div>
                <div>
                  <label>Hotel Rooms</label>
                  <Input
                    type="text"
                    name="room"
                    value={aboutFormData.room}
                    placeholder="Hotel Rooms"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Hotel Staff</label>
                  <Input
                    type="text"
                    name="staff"
                    value={aboutFormData.staff}
                    placeholder="Hotel Staff"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Hotel Clients</label>
                  <Input
                    type="text"
                    name="client"
                    value={aboutFormData.client}
                    placeholder="Hotel Clients"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Hotel Images</label>

                  <PayBillForm
                    invoiceid={8}
                    setParentFileRecords={setFileRecords}
                  />

                  {/* <Input
                    type="file"
                    name="aboutimages"
                    multiple
                    onChange={handleChange}
                  />
                </div>
                <div className="grid">
                  {aboutFormData.aboutimageUrls &&
                    aboutFormData.aboutimageUrls.length > 0 && (
                      <div className="flex gap-2">
                        {aboutFormData.aboutimageUrls.map(
                          (imageUrl: any, index: any) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt={`Hotel Preview ${index + 1}`}
                              width="50"
                            />
                          )
                        )}
                      </div>
                    )}*/}
                </div>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
