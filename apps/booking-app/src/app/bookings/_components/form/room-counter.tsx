import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
type P = {
  typeid: number
  viewid: number
  basis: string
  count: number
  callback: () => void
}

const RoomCountSelector = ({ typeid, viewid, basis, count, callback }: P) => {
  const [roomCount, setRoomCount] = useState(count ?? 1)

  useEffect(() => {
    callback(typeid, viewid, basis, roomCount)
  }, [roomCount])
  const increment = () =>
    setRoomCount((prev) => {
      // callback(typeid, viewid, basis, roomCount)

      return prev + 1
    })
  const decrement = () =>
    setRoomCount((prev) => {
      // callback(typeid, viewid, basis, roomCount)

      return prev > 1 ? prev - 1 : 1
    })

  return (
    <div className="flex items-center space-x-4">
      <Button onClick={decrement} disabled={roomCount === 1}>
        -
      </Button>
      <Input
        type="number"
        value={roomCount}
        readOnly
        className="w-16 text-center"
      />
      <Button onClick={increment}>+</Button>
    </div>
  )
}

export default RoomCountSelector
