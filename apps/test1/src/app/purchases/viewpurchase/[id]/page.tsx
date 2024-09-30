import PurchaseView from '@/components/features/purchase/purchase-view'
import React from 'react'

export default function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <PurchaseView id={params.id} />
    </div>
  )
}
