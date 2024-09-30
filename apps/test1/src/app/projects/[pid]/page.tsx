import ProjectForm from '@/components/features/projects/form-projects'
import React from 'react'

const Page = ({ params }: { params: { pid: string } }) => {
  return (
    <>
      {/* <div>Page {params.id}</div> */}
      <ProjectForm pid={params.pid} />
    </>
  )
}

export default Page
