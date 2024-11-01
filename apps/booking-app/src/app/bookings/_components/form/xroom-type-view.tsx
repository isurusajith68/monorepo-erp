import React, { useEffect, useState } from 'react'
import { useGetPrice } from '../../_services/queries'

type SelectedRoomType = {
  type?: string
  typeid?: number | null
  view?: string | null
  viewid?: number | null
  price?: number | null
  basis?: string | null
}

function RoomTypeViewCompo() {
  const { data: roomprices } = useGetPrice(checkindate)

  const [selectedRooms, setselectedRooms] = useState<SelectedRoomType[]>([])
  const [selectedRoomBasis, setselectedRoomBasis] = useState<
    SelectedRoomType[]
  >([])

  const bookinghandle = (
    typeid: number,
    viewid: number,
    price: number,
    type: string,
    view: string,
    basis: string,
  ) => {
    setselectedRooms((p) => {
      const res = selectedRoomBasis.find(
        (r) => r.typeid == typeid && r.viewid == viewid,
      )
      if (res) {
        return [
          ...p,
          { typeid, viewid, price: res.price, type, view, basis: res.basis },
        ]
      } else {
        return p

        // if(1){
      }
      // }else{
      //   return p.filter(r=> r.typeid !== typeid && r.viewid !== viewid)
      // }
    })
  }
  const bookingBasishandle = (
    checked: boolean,
    typeid: number,
    viewid: number,
    price: number,
    type: string,
    view: string,
    basis: string,
  ) => {
    console.log('xxtypeid', typeid)
    console.log('xxviewid', viewid)

    setselectedRoomBasis((p) => {
      console.log('selectedRoomBasis falsee', checked)
      if (checked) {
        const t = p.filter((r) => !(r.typeid == typeid && r.viewid == viewid))
        return [...t, { typeid, viewid, price, type, view, basis }]
      }
      // else{
      //   return p.filter(r=> r.typeid !== typeid && r.viewid !== viewid)
      // }
    })
  }

  useEffect(() => {
    console.log('selectedRooms', selectedRooms)
  }, [selectedRooms])
  useEffect(() => {
    console.log('selectedRoomBasis', selectedRoomBasis)
  }, [selectedRoomBasis])
  return (
    <div>
      {a && roomprices && (
        <div>
          {roomviewtypes.map((roomcat, index) => {
            const prices = roomprices.find(
              (r) =>
                r.roomtypeid === roomcat.roomtypeid &&
                r.roomviewid === roomcat.roomviewid,
            )

            return (
              <div key={index} className="ml-4">
                <nav className="h-2 bg-green-400 items-center"></nav>
                <div className="border-b py-4 grid grid-cols-2 gap-1">
                  <div className="ml-4">
                    <div className="flex items-center ">
                      <h3 className="text-2xl font-bold">
                        {roomcat.roomtype} -{' '}
                      </h3>
                      <p className="text-xl font-bold">{roomcat.roomview}</p>
                    </div>
                    {/* <button
                      className="text-blue-600 underline mt-2"
                      onClick={() => openModal(roomcat)}
                    >
                      View Room Details
                    </button> */}

                    {/* {prices && (
                        <p className="text-sm">Ro Price: {prices.roprice}</p>
                      )}
                      {prices && (
                        <p className="text-sm">BB Price: {prices.bbprice}</p>
                      )}
                      {prices && (
                        <p className="text-sm">FB Price: {prices.fbprice}</p>
                      )}
                      {prices && (
                        <p className="text-sm">HB Price: {prices.hbprice}</p>
                      )} */}
                    <button
                      className="text-blue-600 underline mt-2"
                      onClick={() => openModal(roomcat)}
                    >
                      View Room Details
                    </button>
                  </div>
                  <div>
                    <label className="">
                      <div className="flex items-center justify-between cursor-pointer mb-2   hover:bg-gray-100 p-2 rounded-lg">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`deal-${roomcat.roomtypeid}-${roomcat.roomviewid}`}
                            className="mr-2"
                            checked={
                              selectedRoomBasis.find((rb) => {
                                // console.log("ioi",rb )

                                return (
                                  rb.typeid == roomcat.roomtypeid &&
                                  rb.viewid == roomcat.roomviewid &&
                                  rb.basis == 'hb'
                                )
                              })
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              console.log('e.target.value', e.target.checked)

                              bookingBasishandle(
                                e.target.checked,
                                roomcat.roomtypeid,
                                roomcat.roomviewid,
                                prices?.hbprice,
                                roomcat.roomtype,
                                roomcat.roomview,
                                'hb',
                              )
                            }}
                          />
                          {/* onChangeCapture={(e) => {
                                bookingBasishandle(e.target.checked,
                                  roomcat.roomtypeid,
                                  roomcat.roomviewid,
                                  prices?.hbprice,
                                  roomcat.roomtype,
                                  roomcat.roomview,
                                  'hb',
                                )
                                }}
                            /> */}
                          <p className="text-red-600 font-bold">
                            Deal: <span className="text-black">HB Price</span>
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <span className="line-through mr-2 text-gray-400">
                            {/* {formatPrice(roomcat.hbprice)} {currency} */}
                          </span>
                          <span className="font-bold">
                            {/* {formatPrice(deal.discountedPrice)} {currency} */}
                            {prices && prices.hbprice}
                          </span>
                        </div>
                      </div>
                    </label>
                    <label>
                      <div className="flex items-center justify-between cursor-pointer mb-2   hover:bg-gray-100 p-2 rounded-lg">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`deal-${roomcat.roomtypeid}-${roomcat.roomviewid}`}
                            className="mr-2"
                            checked={
                              selectedRoomBasis.find(
                                (rb) =>
                                  rb.typeid == roomcat.roomtypeid &&
                                  rb.viewid == roomcat.roomviewid &&
                                  rb.basis == 'fb',
                              )
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              console.log('e.target.value 1', e.target.checked)

                              bookingBasishandle(
                                e.target.checked,
                                roomcat.roomtypeid,
                                roomcat.roomviewid,
                                prices?.fbprice,
                                roomcat.roomtype,
                                roomcat.roomview,
                                'fb',
                              )
                            }}
                          />
                          <p className="text-red-600 font-bold">
                            Deal: <span className="text-black">FB Price</span>
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <span className="line-through mr-2 text-gray-400">
                            {/* {formatPrice(roomcat.hbprice)} {currency} */}
                          </span>
                          <span className="font-bold">
                            {/* {formatPrice(deal.discountedPrice)} {currency} */}
                            {prices && prices.fbprice}
                          </span>
                        </div>
                      </div>
                    </label>
                    <label>
                      <div className="flex items-center justify-between cursor-pointer mb-2   hover:bg-gray-100 p-2 rounded-lg">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`deal-${roomcat.roomtypeid}-${roomcat.roomviewid}`}
                            className="mr-2"
                            checked={
                              selectedRoomBasis.find(
                                (rb) =>
                                  rb.typeid == roomcat.roomtypeid &&
                                  rb.viewid == roomcat.roomviewid &&
                                  rb.basis == 'ro',
                              )
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              console.log('e.target.value 2', e.target.checked)

                              bookingBasishandle(
                                e.target.checked,
                                roomcat.roomtypeid,
                                roomcat.roomviewid,
                                prices?.roprice,
                                roomcat.roomtype,
                                roomcat.roomview,
                                'ro',
                              )
                            }}
                          />
                          <p className="text-red-600 font-bold">
                            Deal: <span className="text-black">RO Price</span>
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <span className="line-through mr-2 text-gray-400">
                            {/* {formatPrice(roomcat.hbprice)} {currency} */}
                          </span>
                          <span className="font-bold">
                            {/* {formatPrice(deal.discountedPrice)} {currency} */}
                            {prices && prices.roprice}
                          </span>
                        </div>
                      </div>
                    </label>
                    <label>
                      <div className="flex items-center justify-between cursor-pointer mb-2   hover:bg-gray-100 p-2 rounded-lg">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`deal-${roomcat.roomtypeid}-${roomcat.roomviewid}`}
                            className="mr-2"
                            checked={
                              selectedRoomBasis.find(
                                (rb) =>
                                  rb.typeid == roomcat.roomtypeid &&
                                  rb.viewid == roomcat.roomviewid &&
                                  rb.basis == 'bb',
                              )
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              console.log('e.target.value 3', e.target.checked)

                              bookingBasishandle(
                                e.target.checked,
                                roomcat.roomtypeid,
                                roomcat.roomviewid,
                                prices?.bbprice,
                                roomcat.roomtype,
                                roomcat.roomview,
                                'bb',
                              )
                            }}
                          />
                          <p className="text-red-600 font-bold">
                            Deal: <span className="text-black">BB Price</span>
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <span className="line-through mr-2 text-gray-400">
                            {/* {formatPrice(roomcat.hbprice)} {currency} */}
                          </span>
                          <span className="font-bold">
                            {/* {formatPrice(deal.discountedPrice)} {currency} */}
                            {prices && prices.bbprice}
                          </span>
                        </div>
                      </div>
                    </label>

                    {selectedRoomBasis.find(
                      (r) =>
                        r.typeid == roomcat.roomtypeid &&
                        r.viewid == roomcat.roomviewid,
                    ) && (
                      <div className="border border-green-500 flex items-center justify-between p-2 rounded-lg">
                        <div>{selectedDeal}</div>
                        <button
                          className="bg-orange-300 text-black py-2 px-4 mt-4"
                          onClick={() =>
                            bookinghandle(
                              roomcat.roomtypeid,
                              roomcat.roomviewid,
                              1000,
                              roomcat.roomtype,
                              roomcat.roomview,
                              'trgrdgg',
                            )
                          }
                        >
                          Book
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RoomTypeViewCompo
