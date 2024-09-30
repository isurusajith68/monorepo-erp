'use client'

import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { insertPurchase } from './_actions/action'

export default function PayBillForm() {
  const { handleSubmit, control, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]) // Store the selected file
    }
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)

    // Create a FormData object to send file and other data
    const formData = new FormData()

    if (file) {
      formData.append('receipt', file) // Append the selected file
    } else {
      console.error('No file selected')
      setIsSubmitting(false)
      return
    }

    formData.append('billId', data.billId) // Append additional data

    try {
      // Call the server action to save the data
      const response = await insertPurchase(formData)

      if (response.success) {
        reset()
        alert('Receipt uploaded and saved successfully!')
      } else {
        alert('Failed to save receipt.')
      }
    } catch (error) {
      console.error('Error saving receipt:', error)
      alert('Failed to save receipt.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Controller
        name="billId"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            placeholder="Enter Bill ID"
            className="mb-4"
          />
        )}
      />

      <Input
        type="file"
        accept="*/*" // Accept any type of file
        className="mb-4"
        onChange={onFileChange} // Handle file input change
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Uploading...' : 'Upload Receipt'}
      </Button>
    </form>
  )
}
