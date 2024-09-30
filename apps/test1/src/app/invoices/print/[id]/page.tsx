import InvoicePrint from '@/components/features/invoices/print-invoice'
import React from 'react'

function page({ params }: { params: { id: number } }) {
  return (
    <div>
      <InvoicePrint id={params.id} />
    </div>
  )
}

export default page
