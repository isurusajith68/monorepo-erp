import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <h1>Page</h1>
      <Link href={'/select-template'}>
        <Button className="bg-green-500 ml-10">Create Web</Button>
      </Link>
    </div>
  )
}

export default page
