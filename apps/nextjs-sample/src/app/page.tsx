'use client'
import { add } from '@erp/sample-lib'

import { useEffect } from 'react'
export default function Home() {
  useEffect(() => {}, [])

  return (
    <div>
      <h1>Sample App</h1>
      <p>1 + 2 = {add(1, 2)}</p>
      <div>
        <a href="/test1">Go to Test</a>
      </div>
    </div>
  )
}
