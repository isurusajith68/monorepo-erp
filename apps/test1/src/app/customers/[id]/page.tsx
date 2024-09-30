import CustomerFormAdd from '@/components/features/customers/add-customer'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      {/* <div>Page {params.id}</div> */}
      <CustomerFormAdd id={params.id} />
    </>
  )
}

export default Page
