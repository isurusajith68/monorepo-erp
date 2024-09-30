import FormPurchase from '@/components/features/purchase/form-purchase'
import React from 'react'

export default function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <FormPurchase id={params.id} />
    </div>
  )
}
