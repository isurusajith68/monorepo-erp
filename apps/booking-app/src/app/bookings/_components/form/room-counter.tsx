import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

type Occupentrow = {
  roomid: number
  adultcount: number
  childcount: number
  infantcount: number
}

type P = {
  typeid: number
  viewid: number
  basis: string
  count: number
  callback: (typeid, viewid, basis, count) => void
  occupantdetails: Occupentrow[]
  addoccupentdata: (typeid, viewid, basis, count) => void
  handleremoveocd: (typeid, viewid, basis, roomid) => void
  updateocupentcount: (typeid, viewid, basis, roomid, propName, count) => void
}

const RoomCountSelector = ({
  typeid,
  viewid,
  basis,
  count,
  callback,
  occupantdetails,
  addoccupentdata,
  handleremoveocd,
  updateocupentcount,
}: P) => {
  //   const [roomCount, setRoomCount] = useState(count ?? 1)
  //   console.log("xroomcount 1", roomCount)

  //   useEffect(() => {
  //     console.log("xroomcount 2", roomCount)

  //      callback( roomCount)
  //   }, [roomCount])
  const increment = () => {
    //setRoomCount((prev) => {
    //    callback(typeid, viewid, basis, ++count)
    addoccupentdata(typeid, viewid, basis, occupantdetails.length + 1)

    //   return prev + 1
  }
  const decrement = () => {
    // callback(typeid, viewid, basis, --count )
    addoccupentdata(typeid, viewid, basis, occupantdetails.length - 1)
  }
  // setRoomCount((prev) => {
  //   // callback(typeid, viewid, basis, roomCount)

  //   return prev > 1 ? prev - 1 : 1
  // })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-4 justify-end">
        {/* <Button
          onClick={() => {
            decrement()
          }}
          disabled={occupantdetails.length === 1}
        >
          -
        </Button> */}
        <Input
          type="number"
          value={count}
          readOnly
          className="w-16 text-center"
        />
        <Button
          onClick={() => {
            increment()
          }}
        >
          +
        </Button>
      </div>
      {occupantdetails?.map((oc) => (
        <div
          key={oc.roomid}
          className="flex items-center justify-between gap-4 p-1 bg-gray-200 rounded-md text-xs"
        >
          <div className="flex flex-col items-center">
            <span className="font-normal">{oc.roomid}</span>
            <span className="font-medium ">Room</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-medium">Adults</span>
            <Select
              value={oc.adultcount.toString()}
              onValueChange={(e) => {
                updateocupentcount(
                  typeid,
                  viewid,
                  basis,
                  oc.roomid,
                  'adultcount',
                  Number(e),
                )
              }}
            >
              <SelectTrigger className="w-16 bg-white ">
                <SelectValue placeholder="0" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-medium">Children</span>
            <Select
              value={oc.childcount.toString()}
              onValueChange={(e) => {
                updateocupentcount(
                  typeid,
                  viewid,
                  basis,
                  oc.roomid,
                  'childcount',
                  Number(e),
                )
              }}
            >
              <SelectTrigger className="w-16 bg-white mt-1">
                <SelectValue placeholder="0" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-medium">Infant</span>
            <Select
              value={oc.infantcount.toString()}
              onValueChange={(e) => {
                updateocupentcount(
                  typeid,
                  viewid,
                  basis,
                  oc.roomid,
                  'infantcount',
                  Number(e),
                )
              }}
            >
              <SelectTrigger className="w-16 bg-white mt-1">
                <SelectValue placeholder="0" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            className="text-red-600 hover:bg-orange-600"
            onClick={() => handleremoveocd(typeid, viewid, basis, oc.roomid)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  )
}

export default RoomCountSelector
