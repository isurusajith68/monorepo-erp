import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Template1() {
  return (
    <div>
      <div className='ml-10'>
      <h1>Template 1</h1>
      <p>This is a template 1</p>
      </div>

      <div className='bg-slate-100 border-2 w-[100%] text-center ml-10'>
      <Image src="/img/Screenshot 2024-09-09 211107.png" width={500} height={10} alt={'hh'} />
      </div>
      <Link href={"create-template1"} >
        <Button className='mt-2 ml-[90%]'>Use This</Button>
       </Link>
    </div>
  )
}

export default Template1