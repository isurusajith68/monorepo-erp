import BankeForm from '@/components/features/bank/bankform'
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      {/* <div>Page {params.id}</div> */}
      <BankeForm id={params.id} />
    </>
  )
}

export default Page
