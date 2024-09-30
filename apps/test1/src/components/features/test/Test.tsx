'use client'
import React, { useRef } from 'react'
import { useCounterStore } from './Store'
import { Button } from '@/components/ui/button'

const Test = () => {
  // const  count = useCounterStore((state)=> state.count)
  // const count2 = useCounterStore.getState().count
  // //const count3 = useCounterStore.setState({count:25})

  // const inc = useCounterStore.getState().increment;
  // const dec = useCounterStore.getState().decrement;

  const inputRef = useRef()

  return (
    <div>
      {/* <h1>Hello, World!</h1>
        <h1>{count}</h1>
        <h1>{count2}</h1>
        <Button onClick={inc}>Increment</Button>
        <Button onClick={dec}>Decrement</Button> */}
    </div>
  )
}

export default Test
