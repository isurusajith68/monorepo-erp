import React from 'react'
import Template1 from './_component/template1/page'
import Template2 from './_component/template2/page'
import Template4 from './_component/template4/page'
import Template3 from './_component/template3/page'
import Template6 from './_component/template6/page'
import Template5 from './_component/template5/page'

function page() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] ml-10">
        <Template1></Template1>
        <Template2></Template2>
        <Template3></Template3>
        <Template4></Template4>
        <Template5></Template5>
        <Template6></Template6>
      </div>
    </div>
  )
}

export default page
