import FormVendors from '@/components/features/vendors/form-vendor'
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <FormVendors id={params.id} />
    </>
  )
}

export default Page
