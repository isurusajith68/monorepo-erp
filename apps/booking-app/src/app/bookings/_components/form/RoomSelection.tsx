import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  useGetBooking,
  useGetPhoneNumber,
  useGetPrice,
  useGetRoomtype,
} from '../../_services/queries'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import {
  useInsertBookingMutation,
  useInsertGuestInformationMutation,
  useUpdateBookingMutation,
} from '../../_services/mutation'
import { useNavigate, useParams } from 'react-router-dom'
import { getDirtyValuesTF } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { CiCircleRemove } from 'react-icons/ci'
import RoomCountSelector from './room-counter'
import { RoomSummaryItem } from './room-summary-item'

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler) // Cleanup on unmount or value change
    }
  }, [value, delay])

  return debouncedValue
}

type RoomCountDta = {
  typeid: number
  viewid: number
  basis: string
  count: number
}

type SelectedRoomType = {
  type?: string
  typeid?: number | null
  view?: string | null
  viewid?: number | null
  price?: number | null
  basis?: string | null
  count?: number | null
  occupantdetails?: any[] | null
}
const SelectedRoomsList = ({
  selectedRooms,
  handleremove,
  handleCount,
  addoccupentdata,
  handleremoveocd,
}) => {
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const calTotal = (selectedRooms1) => {
    const t = selectedRooms1.reduce((a, c) => a + c.count * c.price, 0)
    console.log('tttt', t)

    setTotalAmount(t)
  }
  // const [roomAmounts, setRoomAmounts] = useState({}); // Track each room’s amount individually
  // const handleCount = (c:number,typeid:number,viewid:number,basis:string)=>{
  //  const t = selectedRooms.find(r=> r.typeid==typeid && r.viewid==viewid && r.basis ==basis)
  //  if(t){
  //   t.count = c
  //  }

  //  console.log("selectedRooms",selectedRooms)
  //  calTotal(selectedRooms)

  // }

  useEffect(() => {
    console.log('selectedRoomsx', selectedRooms)
    calTotal(selectedRooms)
  }, [selectedRooms])
  // Function to update each room's total amount based on count and price
  const updateTotal = (amount) => {
    // setTotalAmount(p=> p+amount)
    //setRoomAmounts((prev) => ({ ...prev, [`${typeid}-${viewid}`]: amount }));
  }

  // useEffect(() => {
  //   // Calculate the total amount whenever roomAmounts changes
  //   const newTotal = Object.values(roomAmounts).reduce((sum, amount) => sum + amount, 0);
  //   setTotalAmount(newTotal);
  // }, [roomAmounts]);

  return (
    <div className="p-4 border-l border-gray-300">
      <h3 className="text-xl font-bold mb-4">Selected Rooms</h3>
      {selectedRooms.length > 0 ? (
        selectedRooms.map((room, index) => (
          <RoomSummaryItem
            room={room}
            handleremove={handleremove}
            updateTotal={updateTotal}
            handleCount={handleCount}
            addoccupentdata={addoccupentdata}
            handleremoveocd={handleremoveocd}
            key={index}
          />
        ))
      ) : (
        <p className="text-gray-500">No rooms selected.</p>
      )}
      <p className="font-bold">Total Amount : {totalAmount}</p>
    </div>
  )
}

const RoomSelection = () => {
  const { id } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [currency, setCurrency] = useState('LKR')
  const [exchangeRate, setExchangeRate] = useState(1)
  // const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null)
  const [phone, setphone] = useState()
  //--------------------------------------
  const [useSameAddress, setUseSameAddress] = useState(false)
  const [notifySpecialOffers, setNotifySpecialOffers] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const insertMutation = useInsertBookingMutation()
  const updateMutation = useUpdateBookingMutation()
  const debouncedPhone = useDebounce(phone, 500)
  const { data: getphonedata, isFetched } = useGetPhoneNumber(debouncedPhone)

  const [checkindate, setcheckindate] = useState<string | undefined>(undefined)
  const [checkoutdate, setcheckoutdate] = useState<string | undefined>(
    undefined,
  )
  const { data: roomprices } = useGetPrice(checkindate)

  // const [totalAmount, settotalAmount] = useState<number>(0)

  const [selectedRooms, setselectedRooms] = useState<SelectedRoomType[]>([])
  const [selectedRoomBasis, setselectedRoomBasis] = useState<
    SelectedRoomType[]
  >([])

  console.log('roomprice', roomprices)

  useEffect(() => {
    if (getphonedata) {
      form.setFieldValue('firstname', getphonedata.firstname)
      form.setFieldValue('lastname', getphonedata.lastname)
      form.setFieldValue('email', getphonedata.email)
      form.setFieldValue('phonenumber', getphonedata.phonenumber)
      form.setFieldValue('address', getphonedata.address)
      form.setFieldValue('city', getphonedata.city)
      form.setFieldValue('country', getphonedata.country)
      form.setFieldValue('postalcode', getphonedata.postalcode)
    } else {
      form.reset()
    }
  }, [getphonedata])

  // form.setFieldValue('roles', roles.roles)
  const form = useForm({
    defaultValues: {
      booking_id: null,
      checkindate: new Date().toISOString().split('T')[0],
      checkoutdate: new Date().toISOString().split('T')[0],
      flexibledates: false,
      adults: 1,
      children: 0,
      currency: 'USD',
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      address: '',
      city: '',
      country: '',
      postalcode: '',
    },
    onSubmit: async ({ value: data }) => {
      console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data)
      if (id) {
        // If id exists, we're updating the booking
        const dirtyValues = getDirtyValuesTF(q, data, [], 'booking_id')
        console.log('dirtyvaluessssssss', dirtyValues)

        if (dirtyValues) {
          console.log('Dirty values to update:', dirtyValues)

          // Make the PUT request with only dirty fields
          const responseData = await updateMutation.mutateAsync({
            id,
            dirtyValues,
          })

          if (responseData) {
            toast({
              className: 'text-green-600',
              title: 'Booking',
              description: <span>Updated successfully.</span>,
              duration: 2000,
            })

            navigate(`/booking/${id}`)
          }
        } else {
          console.log('No fields were changed')
          toast({
            className: 'text-blue-600',
            title: 'Booking',
            description: <span>No changes to update.</span>,
            duration: 2000,
          })
        }
      } else {
        // Insert new booking
        const responseData = await insertMutation.mutateAsync({ data })

        if (responseData.success) {
          const newId = responseData.bookingId

          toast({
            className: 'text-green-600',
            title: 'Booking',
            description: <span>Added successfully.</span>,
            duration: 2000,
          })

          navigate(`/booking/${newId}`)
        }
      }
    },
  })

  const handleSearch = () => {
    const checkindate = form.getFieldValue('checkindate')
    const checkoutdate = form.getFieldValue('checkoutdate')
    console.log('Searching for rooms with:', checkindate, checkoutdate)

    if (checkindate && checkoutdate) {
      // Set the state variables
      setcheckindate(checkindate)
      setcheckoutdate(checkoutdate)

      // Make API call with checkindate and checkoutdate
      console.log('Searching for rooms with:', checkindate, checkoutdate)
      // Call your search function here
    } else {
      console.error('Both check-in and check-out dates are required.')
    }
  }

  console.log('checkindateeeeeeeeeeeeeeeeeeeeeeee', checkindate)

  const { data: roomviewtypes, isFetched: isFetchedRoomTypes } = useGetRoomtype(
    checkindate,
    checkoutdate,
  )

  console.log('roomviewtypes', roomviewtypes)

  const { data: q, isLoading, isError, error } = useGetBooking(id)

  //--------------------------------------------------------------------

  useEffect(() => {
    if (q) {
      try {
        // Populate the form with fetched data
        // form.setFieldValue('checkindate', q.checkindate)
        form.setFieldValue('booking_id', q.booking_id)
        // form.setFieldValue('checkoutdate', q.checkoutdate)
        form.setFieldValue('flexibledates', q.flexibledates)
        form.setFieldValue('adults', q.adults)
        form.setFieldValue('children', q.children)
        form.setFieldValue('currency', q.currency)
        form.setFieldValue('firstname', q.firstname)
        form.setFieldValue('lastname', q.lastname)
        form.setFieldValue('email', q.email)
        form.setFieldValue('phonenumber', q.phonenumber)
        form.setFieldValue('address', q.address)
        form.setFieldValue('city', q.city)
        form.setFieldValue('country', q.country)
        form.setFieldValue('postalcode', q.postalcode)
      } catch (error) {
        console.error('Error fetching booking data:', error)
        toast({
          className: 'text-red-600',
          title: 'Error',
          description: <span>Something went wrong while fetching data.</span>,
          duration: 2000,
        })
      }
    }
  }, [q])

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value
    setCurrency(selectedCurrency)

    // Adjust rates based on selected currency (simplified)
    if (selectedCurrency === 'USD') setExchangeRate(0.003)
    else if (selectedCurrency === 'EUR') setExchangeRate(0.0028)
    else setExchangeRate(1) // Default is LKR
  }

  const formatPrice = (price: number) => {
    return (price * exchangeRate).toFixed(2)
  }
  const handleremoveocd = (
    typeid: number,
    viewid: number,
    basis: string,
    roomid: any,
  ) => {
    setselectedRooms((p) => {
      return p.occupantdetails.filter((od) => {
        !(
          od.typeid == typeid &&
          od.viewid == viewid &&
          od.basis == basis &&
          od.occupantdetails.roomid == roomid
        )
      })
    })
  }

  const handleremove = (typeid: number, viewid: number, basis: string) => {
    console.log('pop2')

    setselectedRoomBasis((p) => {
      return p.filter(
        (rb) =>
          !(rb.typeid == typeid && rb.viewid == viewid && rb.basis == basis),
      )
    })
    setselectedRooms((p) => {
      return p.filter(
        (rb) =>
          !(rb.typeid == typeid && rb.viewid == viewid && rb.basis == basis),
      )
    })
  }

  const bookinghandle = (
    typeid: number,
    viewid: number,
    price: number,
    type: string,
    view: string,
    basis: string,
  ) => {
    console.log('pop', typeid, viewid)

    setselectedRooms((p) => {
      const res = selectedRoomBasis.find(
        (r) => r.typeid == typeid && r.viewid == viewid,
      )
      if (res) {
        return [
          ...p,
          {
            typeid,
            viewid,
            price: res.price,
            type,
            view,
            basis: res.basis,
            count: 1,
            occupantdetails: [
              { roomid: 1, adultcount: 3, childcount: 3, infantcount: 4 },
            ],
          },
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

  const addoccupentdata = (typeid, viewid, basis) => {
    setselectedRooms((p) => {
      const i = p.findIndex(
        (r) => r.typeid == typeid && r.viewid == viewid && r.basis == basis,
      )
      if (i != -1) {
        return [
          ...p.slice(0, i),
          {
            ...p[i],
            occupantdetails: [
              ...p[i].occupantdetails,
              {
                roomid: p[i].occupantdetails.length + 1,
                adultcount: 3,
                childcount: 3,
                infantcount: 4,
              },
            ],
          },
          ...p.slice(i + 1),
        ]
      } else {
        console.warn(' not fount type,view basis')
        return p
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
    console.log('xxselectedRooms', selectedRooms)
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

  // useEffect(() => {
  //   console.log("xxselectedRooms",selectedRooms )

  //   selectedRooms.map((r) => {
  //     settotalAmount((p) => p + r.count * r.price)
  //   })
  // }, [selectedRooms])

  useEffect(() => {
    console.log('qqqselectedRooms', selectedRooms)
  }, [selectedRooms])
  useEffect(() => {
    console.log('selectedRoomBasis', selectedRoomBasis)
  }, [selectedRoomBasis])

  const handleCount = (
    typeid: number,
    viewid: number,
    basis: string,
    c: number,
  ) => {
    setselectedRooms((p) => {
      const o = p.find(
        (r) => r.typeid == typeid && r.viewid == viewid && r.basis == basis,
      )
      return [
        ...p.filter(
          (r) =>
            !(r.typeid == typeid && r.viewid == viewid && r.basis == basis),
        ),
        { ...o, count: c },
      ]
    })
  }

  return (
    <>
      {/* <header className=" top-0 z-50 flex h-14 items-center justify-center gap-4 border-b  backdrop-blur-md px-4 lg:h-[90px] lg:px-6 bg-[#89749A]">
        <div className="">
          <img src="icon.jpg" className="w-[60px] h-[80px] " />
        </div>
      </header> */}

      {/* jhg------------------------------------------------------------------ */}

      {/* Background Image */}

      {/* <img
            src="banner.jpg"
            alt="Resort Background"
            className="w-full h-[500px] object-cover"
          />   */}

      {/* Overlay Form */}
      <div className=" bg-gray-100 bg-opacity-80 py-4 ">
        <div className="container mx-auto px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault(), e.stopPropagation()
            }}
          >
            <div className="grid grid-cols-6 gap-4 items-center ">
              {/* Property Selection */}
              {/* <div className="col-span-2">
                    <label className="block text-sm font-semibold">
                      Property
                    </label>
                    <select className="w-full border border-gray-300 p-2 rounded">
                      <option>Hillroost Kandy</option> */}
              {/* Add more options if needed */}
              {/* </select>
                  </div> */}
              {/* Check-in Date */}

              {/* <form.Field
                name="booking_id"
                children={(field) => (
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold">
                      Check in
                    </label>
                    <input
                      type="hidden"
                      value={field.state.value}
                     
                    />
                  </div>
                )}
              /> */}
              <form.Field
                name="checkindate"
                children={(field) => (
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold">
                      Check in
                    </label>
                    <input
                      type="date"
                      value={
                        field.state.value
                          ? new Date(field.state.value)
                              .toISOString()
                              .split('T')[0]
                          : ''
                      }
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded"
                      // value={
                      //   field.value
                      //     ? new Date(field.value)
                      //         .toISOString()
                      //         .split('T')[0]
                      //     : ''
                      // }
                    />
                  </div>
                )}
              />

              <form.Field
                name="checkoutdate"
                children={(field) => (
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold">
                      Check out
                    </label>
                    <input
                      type="date"
                      value={
                        field.state.value
                          ? new Date(field.state.value)
                              .toISOString()
                              .split('T')[0]
                          : ''
                      }
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>
                )}
              />

              {/* Check-out Date
                <div className="col-span-1">
                  <label className="block text-sm font-semibold">
                    Check out
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div> */}

              <form.Field
                name="flexibledates"
                children={(field) => (
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      id="flexibleDates"
                      className="mr-2"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)} // Use `checked` property
                    />
                    <label
                      htmlFor="flexibleDates"
                      className="text-sm font-semibold"
                    >
                      Flexible Dates
                    </label>
                  </div>
                )}
              />
              {/* Flexible Dates */}

              {/* Adults */}
              <form.Field
                name="adults"
                children={(field) => (
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold">
                      Adults
                    </label>
                    <select
                      value={field.state.value} // Bind the selected value to field.state.value
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      } // Update the value on change
                      className="w-full border border-gray-300 p-2 rounded"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                )}
              />

              <form.Field
                name="children"
                children={(field) => (
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold">
                      Children
                    </label>
                    <select
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="w-full border border-gray-300 p-2 rounded"
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                    </select>
                  </div>
                )}
              />

              {/* Children */}
              <form.Field
                name="currency"
                children={(field) => (
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold">
                      Currency
                    </label>
                    <select
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded"
                    >
                      <option>LKR</option>
                      <option>USD</option>
                      <option>EUR</option>
                    </select>
                  </div>
                )}
              />

              {/* Currency */}

              {/* Promo Code & Search Button */}
              <div className="col-span-2 flex flex-col justify-center">
                <label className="block text-sm font-semibold underline cursor-pointer">
                  Use Promo Code
                </label>
              </div>
              <div className="col-span-1">
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded w-full"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* jhgjg-------------------------------------------------------------------- */}
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Hillroost Kandy (LKR)</h1>
          <div>
            <label htmlFor="currency" className="mr-2 font-bold">
              Currency:
            </label>
            <select
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
              className="border p-2"
            >
              <option value="LKR">LKR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            {isFetchedRoomTypes && roomprices && (
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
                            <p className="text-xl font-bold">
                              {roomcat.roomview}
                            </p>
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
                                    console.log(
                                      'e.target.value',
                                      e.target.checked,
                                    )

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
                                  Deal:{' '}
                                  <span className="text-black">HB Price</span>
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
                                    console.log(
                                      'e.target.value 1',
                                      e.target.checked,
                                    )

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
                                  Deal:{' '}
                                  <span className="text-black">FB Price</span>
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
                                    console.log(
                                      'e.target.value 2',
                                      e.target.checked,
                                    )

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
                                  Deal:{' '}
                                  <span className="text-black">RO Price</span>
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
                                    console.log(
                                      'e.target.value 3',
                                      e.target.checked,
                                    )

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
                                  Deal:{' '}
                                  <span className="text-black">BB Price</span>
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
          <div>
            <SelectedRoomsList
              selectedRooms={selectedRooms}
              handleremove={handleremove}
              handleCount={handleCount}
              addoccupentdata={addoccupentdata}
              handleremoveocd={handleremoveocd}
            />
          </div>
        </div>

        {/* Modal */}
      </div>
      {/*  ------------------------------------------------------------------------------ */}

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-3 gap-8">
          {/* Guest Information Section */}
          <div className="col-span-2 bg-white p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Guest Information</h2>
            <p className="text-blue-600 underline mb-4 cursor-pointer">
              Been here before? Click here
            </p>
            <div className="space-y-4">
              <form.Field
                name="phonenumber"
                children={(field) => (
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                    value={field.state.value}
                    // onChange={(e) => {
                    //   console.log("q111111",e.target.value)
                    //   field.handleChange(e.target.value)}}
                    onChangeCapture={(e) => {
                      console.log('q122222', e.target.value)
                      field.handleChange(e.target.value)

                      setphone(e.target.value)
                    }}
                  />
                )}
              />

              <form.Field
                name="firstname"
                validators={{
                  onChange: (value) => {
                    if (value.length < 3) {
                      return 'Please enter a valid first name'
                    }
                  },
                }}
                children={(field) => (
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
              <form.Field
                name="lastname"
                children={(field) => (
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />

              <form.Field
                name="email"
                children={(field) => (
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />

              <form.Field
                name="address"
                children={(field) => (
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
              <form.Field
                name="city"
                children={(field) => (
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
              <form.Field
                name="country"
                children={(field) => (
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  >
                    <option value="">Country</option>
                    <option value="lk">Sri Lanka</option>
                    {/* Add more options as needed */}
                  </select>
                )}
              />
              <form.Field
                name="postalcode"
                children={(field) => (
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="col-span-1 bg-white p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <div className="flex space-x-2 mb-4">
              <img src="visa-secure.svg" alt="Visa" className="w-12" />
              <img src="master-secure.svg" alt="MasterCard" className="w-12" />
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="First and Last Name on Card"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useSameAddress}
                  onChange={() => setUseSameAddress(!useSameAddress)}
                />
                <label>Use the same address as contact information</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifySpecialOffers}
                  onChange={() => setNotifySpecialOffers(!notifySpecialOffers)}
                />
                <label>Notify me about special offers</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label>
                  I have read and agree to the{' '}
                  <a href="#" className="text-blue-600 underline">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </form>
            <p className="text-red-600 mt-4 text-sm">
              Please do not close the payment pop-up(s) until your transaction
              is completed. If you do not receive a booking confirmation via
              email, please contact the hotel directly.
            </p>
            <Button
              className="bg-yellow-500 text-white py-2 px-4 rounded w-full mt-4  "
              type="submit"
              onClick={form.handleSubmit}
            >
              BOOK NOW
            </Button>
            {/* <button className="bg-yellow-500 text-white py-2 px-4 rounded w-full mt-4">
              BOOK NOW
            </button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomSelection
