import InvoiceForm from '@/components/features/invoices/form-invoices'
import InvoiceFormAdd from '@/components/features/invoices/invoice-add'
import React from 'react'

const Page = ({ params }: { params: { id: number } }) => {
  return (
    <>
      {/* <div>Page {params.id}</div> */}
      <InvoiceFormAdd id={params.id} />
    </>
  )
}

export default Page
