import ReciptForm from '@/components/features/reciepts/recipt-form'
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      {/* <div>Page {params.id}</div> */}
      <ReciptForm id={params.id} />
    </>
  )
}

export default Page
