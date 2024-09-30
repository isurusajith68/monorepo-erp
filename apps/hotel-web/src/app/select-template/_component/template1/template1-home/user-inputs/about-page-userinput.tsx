import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function AboutProfileForm({ formData, onFormDataChange }: any) {
  const handleChange = (e: any) => {
    const { name, value, files } = e.target

    // Check if the input is for images
    if (name === 'aboutimages' && files.length > 0) {
      const selectedFiles = Array.from(files)

      // Limit selection to a maximum of 4 files
      if (selectedFiles.length > 4) {
        alert('You can only select a maximum of 4 images.')
        return
      }

      const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file))

      // Update the formData with the file objects and image URLs
      onFormDataChange({
        ...formData,
        aboutimages: selectedFiles, // Store the selected files
        aboutimageUrls: imageUrls, // Store the image preview URLs
      })
    } else {
      // Update the formData for text fields (like description, room, staff, client)
      onFormDataChange({
        ...formData,
        [name]: value, // Update the field with the corresponding value
      })
    }
  }

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
                    value={formData.description}
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
                    value={formData.room}
                    placeholder="Hotel Rooms"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Hotel Staff</label>
                  <Input
                    type="text"
                    name="staff"
                    value={formData.staff}
                    placeholder="Hotel Staff"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Hotel Clients</label>
                  <Input
                    type="text"
                    name="client"
                    value={formData.client}
                    placeholder="Hotel Clients"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Hotel Images</label>
                  <Input
                    type="file"
                    name="aboutimages"
                    multiple
                    onChange={handleChange}
                  />
                </div>
                <div className="grid">
                  {formData.aboutimageUrls &&
                    formData.aboutimageUrls.length > 0 && (
                      <div className="flex gap-2">
                        {formData.aboutimageUrls.map(
                          (imageUrl: any, index: any) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt={`Hotel Preview ${index + 1}`}
                              width="50"
                            />
                          ),
                        )}
                      </div>
                    )}
                </div>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
