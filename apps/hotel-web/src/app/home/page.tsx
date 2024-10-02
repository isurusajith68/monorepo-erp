import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Home from '../select-template/_component/template1/template1-home/home-page'


function page() {
  return (
    <div>
        <h1>Page</h1>
        <Link href={"/select-template"}>
          <Button className='bg-green-500 ml-10'>Create Web</Button>
         
        </Link>

        {/* <Home></Home> */}
    </div>
  )
}

export default page