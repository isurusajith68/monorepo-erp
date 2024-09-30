import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Template2() {
  return (
    <div>
      <div className="ml-10">
        <h1>Template 2</h1>
        <p>This is a template 2</p>
      </div>
      <div className="bg-slate-100 border-2 w-[100%] text-center ml-10">
        <Image src="/img/sohohotel.png" width={410} height={10} alt={'hh'} />
      </div>
      <Link href={'create-template2'}>
        <Button className="mt-2 ml-[90%]">Use This</Button>
      </Link>
    </div>
  )
}

export default Template2
