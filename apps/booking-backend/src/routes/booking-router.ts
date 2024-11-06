import { Router } from 'express'
import pool from '../config/db'
import { Request, Response } from 'express'
import getUpdateQuery from '../utils/utils'

const bookingRouter = Router()

Object.defineProperty(Object, 'groupBy', {
  value: function (array: any[], keyFunction: (item: any) => any) {
    return array.reduce((result, item) => {
      const key = keyFunction(item)
      if (!result[key]) {
        result[key] = []
      }
      result[key].push(item)
      return result
    }, {})
  },
  writable: true,
  configurable: true,
})

//booking insert
bookingRouter.post('/bookinginsert', async (req: Request, res: Response) => {
  // console.log("dataaa", req.body )

  const {
    hotelid,
    remarks,
    createdate,
    checkindate,
    checkoutdate,
    firstname,
    lastname,
    email,
    phonenumber,
    address,
    city,
    country,
    postalcode,
    selectedRooms,
  } = req.body
  try {
    //console.log("checkindate,",checkindate,        checkoutdate,)

    const checkPhoneQuery =
      'SELECT * FROM guestinformation WHERE phonenumber = $1'
    const phoneResult = await pool.query(checkPhoneQuery, [phonenumber])
    //   console.log('qqqqqqqqqq', phoneResult)

    let guestId = 0
    //if exists
    if (phoneResult.rowCount ?? 0 > 0) {
      guestId = phoneResult.rows[0].id
    } else {
      const guestInsertSTMT = ` INSERT INTO guestinformation (firstname, lastname, email, phonenumber, address, city, country, postalcode,hotelid) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8 , $9)
      RETURNING id;`

      const guestRes = await pool.query(guestInsertSTMT, [
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        city,
        country,
        postalcode,
        hotelid,
      ])
      //console.log('guestRes', guestRes)

      guestId = guestRes.rows[0].id
    }

    //insert booking
    const bookingInsertSTMT = `
    INSERT INTO booking ( guestid, checkindate, checkoutdate ,createdate,remarks,hotelid)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING id;`

    const bookRes = await pool.query(bookingInsertSTMT, [
      guestId,
      checkindate,
      checkoutdate,
      createdate,
      remarks,
      hotelid,
    ])
    const bookingid = bookRes.rows[0].id

    //check if all rooms with type and view are available
    const rmgrupbyTYpeView: any = Object.groupBy(selectedRooms, (r: any) => {
      return `${r.typeid}-${r.viewid}`
    })

    // console.log("rmgrupbyTYpeView",rmgrupbyTYpeView)

    const keys = Object.keys(rmgrupbyTYpeView)

    for (let index = 0; index < keys.length; index++) {
      const elements = rmgrupbyTYpeView[keys[index] as string]
      const rowcount = elements.reduce(
        (a: any, c: any) => a + c.occupantdetails.length,
        0,
      )
      const roomsql = `select * from public.hotelrooms where id not in
        (SELECT bd.roomid FROM public.booking b
      join public.bookingdetails bd on bd.bookingid = b.id
        where $1 not between b.checkindate   and b.checkoutdate 
        and $2 not between b.checkindate   and b.checkoutdate)
        and roomtypeid = $3 and roomviewid=$4;`

      const resrooms = await pool.query(roomsql, [
        checkindate,
        checkoutdate,
        elements[0].typeid,
        elements[0].viewid,
      ])
      // console.log('room count', resrooms.rows.length, 'ppp--', rowcount)
      // console.log('elements[0].typeid', elements[0].typeid, elements[0].viewid)

      if (resrooms.rows.length < rowcount) {
        res.status(200).json({
          success: false,
          message: `Not enough rooms available for type ${elements[0].type} and view type ${elements[0].view}`,
        })
        return
      }
    }

    //const allocatedRoomids:number[]=[]
    // for (let index = 0; index < selectedRooms.length; index++) {
    for (let index = 0; index < keys.length; index++) {
      const elements = rmgrupbyTYpeView[keys[index] as string]
      const rowcount = elements.length
      // const room = selectedRooms[index]

      for (let i1 = 0; i1 < elements.length; i1++) {
        const room = elements[i1]

        const roomsql = `select * from public.hotelrooms where id not in
            (SELECT bd.roomid FROM public.booking b
            join public.bookingdetails bd on bd.bookingid = b.id
            where $1 not between b.checkindate   and b.checkoutdate 
            and $2 not between b.checkindate   and b.checkoutdate)
            and roomtypeid = $3 and roomviewid=$4;`

        const resrooms1 = await pool.query(roomsql, [
          checkindate,
          checkoutdate,
          room.typeid,
          room.viewid,
        ])
        // console.log("resrooms",resrooms)

        for (let rindex = 0; rindex < room.occupantdetails.length; rindex++) {
          const rrow = room.occupantdetails[rindex]

          //insert booking room

          // console.log('rindex', rindex)

          let roomId = 0
          //if exists
          if (resrooms1.rowCount ?? 0 > 0) {
            roomId = resrooms1.rows[rindex].id
            // if(!allocatedRoomids.includes(roomId)){
            //   allocatedRoomids.push(roomId)
            // }else{
            //   //find next available room
            //   roomId = resrooms.rows[0].id
            // }

            const { adultcount, childcount, infantcount } = rrow

            const bookingInsertSTMT = `INSERT INTO bookingdetails ( bookingid,  roomId,  basis, adultcount,  childcount,  infantcount,price)
                      VALUES ($1,$2,$3,$4,$5,$6,$7)
                      RETURNING id;`

            const res = await pool.query(bookingInsertSTMT, [
              bookingid,
              roomId,
              room.basis,
              adultcount,
              childcount,
              infantcount,
              room.price,
            ])
            //   let bid = res.rowCount ?? 0 > 0 ? res.rows[0].id : 0
            //   if (res.rowCount ?? 0 > 0) {
            //     bid = res.rows[0].id
          } else {
            console.log('no room found')
          }
        }
      }
    }
    console.log('Successfully added booking')
    res.status(200).json({
      success: true,
      message: 'Booking created successfully',
      booking_id: bookingid,
      guestId, // Return the booking ID to the frontend
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error creating user', error })
  }
})

//booking update
bookingRouter.patch('/bookings/:id', async (req, res) => {
  const { id, bookingHeaderData, guestInfo, selectedRooms }: any = req.body // modified fields from the frontend

  // const {firstname,lastname,email,phonenumber,address,city,country,postalcode,hotelid} = guestInfo
  // const{bookingid,checkindate,checkoutdate}=bookingHeaderData
  try {
    const client = await pool.connect()
    try {
      //update guest information
      const [updatesql, valuesArray] = getUpdateQuery(
        guestInfo,
        'guestinformation',
        'id',
      )
      const guestResult = await client.query(updatesql, valuesArray)

      // Update booking information
      const [updateHsql, valuesHArray] = getUpdateQuery(
        guestInfo,
        'bookings',
        'id',
      )
      const hResult = await client.query(updateHsql, valuesHArray)

      const bdsql = `select roomid from bookingdetails where bookingid= $1 `
      const bdresult = await pool.query(bdsql, [id])
      // console.log("bdresultsssssssssssss",bdresult)

      for (let index = 0; index < selectedRooms.length; index++) {
        const room = selectedRooms[index]

        for (let rindex = 0; rindex < room.occupantdetails.length; rindex++) {
          const rrow = room.occupantdetails[rindex]

          // Check for available rooms as in your original code
          const roomCheckQuery = `
              SELECT * FROM public.hotelrooms
              WHERE id NOT IN (
                SELECT bd.roomid
                FROM public.booking b
                JOIN public.bookingdetails bd ON bd.bookingid = b.id
                WHERE $1 NOT BETWEEN b.checkindate AND b.checkoutdate
                AND $2 NOT BETWEEN b.checkindate AND b.checkoutdate
              )
              AND roomtypeid = $3 AND roomviewid = $4;
            `
          const availableRooms = await client.query(roomCheckQuery, [
            // checkindate,
            // checkoutdate,
            room.typeid,
            room.viewid,
          ])

          // if (availableRooms.rowCount > 0) {
          //   const roomId = availableRooms.rows[0].id;

          //   // Insert new booking details
          //   const bookingDetailsInsertQuery = `
          //     INSERT INTO bookingdetails (bookingid, roomId, basis, adultcount, childcount, infantcount, price)
          //     VALUES ($1, $2, $3, $4, $5, $6, $7);
          //   `;
          //   await client.query(bookingDetailsInsertQuery, [
          //     bookingId,
          //     roomId,
          //     room.basis,
          //     rrow.adultcount,
          //     rrow.childcount,
          //     rrow.infantcount,
          //     room.price,
          //   ]);
          // } else {
          //   console.log("No available rooms found for the requested dates.");
          // }
        }
      }

      // const bookingUpdateQuery = `
      //   UPDATE booking
      //   SET guestid = $1, checkindate = $2, checkoutdate = $3, createdate = $4, remarks = $5, hotelid = $6
      //   WHERE id = $7;
      // `;
      // await client.query(bookingUpdateQuery, [
      //   guestId,
      //   checkindate,
      //   checkoutdate,
      //   new Date(), // Assuming createdate should be the current date
      //   remarks,
      //   hotelid,
      //   bookingId,
      // ]);

      // Update booking details for each room
      if (selectedRooms && selectedRooms.length > 0) {
        // Delete existing room details for this booking
        const deleteBookingDetailsQuery =
          'DELETE FROM bookingdetails WHERE bookingid = $1'
        await client.query(deleteBookingDetailsQuery, [id])

        // Insert new room details
        for (let index = 0; index < selectedRooms.length; index++) {
          const room = selectedRooms[index]

          for (let rindex = 0; rindex < room.occupantdetails.length; rindex++) {
            const rrow = room.occupantdetails[rindex]

            // Check for available rooms as in your original code
            const roomCheckQuery = `
                SELECT * FROM public.hotelrooms
                WHERE id NOT IN (
                  SELECT bd.roomid
                  FROM public.booking b
                  JOIN public.bookingdetails bd ON bd.bookingid = b.id
                  WHERE $1 NOT BETWEEN b.checkindate AND b.checkoutdate
                  AND $2 NOT BETWEEN b.checkindate AND b.checkoutdate
                )
                AND roomtypeid = $3 AND roomviewid = $4;
              `
            const availableRooms = await client.query(roomCheckQuery, [
              // checkindate,
              // checkoutdate,
              room.typeid,
              room.viewid,
            ])

            // if (availableRooms.rowCount > 0) {
            //   const roomId = availableRooms.rows[0].id;

            //   // Insert new booking details
            //   const bookingDetailsInsertQuery = `
            //     INSERT INTO bookingdetails (bookingid, roomId, basis, adultcount, childcount, infantcount, price)
            //     VALUES ($1, $2, $3, $4, $5, $6, $7);
            //   `;
            //   await client.query(bookingDetailsInsertQuery, [
            //     bookingId,
            //     roomId,
            //     room.basis,
            //     rrow.adultcount,
            //     rrow.childcount,
            //     rrow.infantcount,
            //     room.price,
            //   ]);
            // } else {
            //   console.log("No available rooms found for the requested dates.");
            // }
          }
        }
      }

      res.status(200).json({
        success: true,
        message: 'Booking updated successfully',
        bookingId: id,
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error creating user', error })
  }
})

// get all data
bookingRouter.get('/bookings/:id', async (req: Request, res: Response) => {
  const { id } = req.params // Get booking ID from the URL

  const client = await pool.connect()

  try {
    // Query to get booking and associated guest information
    const query = `
        SELECT 
          b.id AS booking_id,
          b.checkindate,
          b.checkoutdate,
          g.firstname,
          g.lastname,
          g.email,
          g.phonenumber,
          g.address,
          g.city,
          g.country,
          g.postalcode,
          b.guestid
        FROM 
          booking b
        JOIN 
          guestinformation g ON b.guestid = g.id
        WHERE 
          b.id = $1;
      `

    const result = await client.query(query, [id])

    if (result.rows.length === 0) {
      // No booking found with the given ID
      res.status(404).json({
        success: false,
        msg: 'Booking not found',
      })
      return
    }

    const bookingData = result.rows[0]

    //get details

    const bookingdetails = `SELECT bd.* , r.roomtypeid ,r.roomviewid 
              FROM bookingdetails bd
              join public.hotelrooms r
              on bd.roomid = r.id
              WHERE bookingid =$1 `

    const bdresult = await client.query(bookingdetails, [
      bookingData.booking_id,
    ])

    // console.log('bdresult', bdresult)

    // Return the booking and guest information
    res.status(200).json({
      success: true,
      data: bookingData,
      details: bdresult.rows,
    })
  } catch (err: any) {
    // Add explicit type for error
    console.error('Error fetching booking-get:', err)
    res.status(500).json({
      success: false,
      msg: 'Error fetching booking details',
      error: err.message,
    })
  } finally {
    client.release()
  }
})

// get all rooms
bookingRouter.get('/rooms', (req, res) => {
  const { checkindate, checkoutdate } = req.query
  const getAllBookingQuery = `
      select r.roomtypeid,r.roomviewid, t.roomtype ,v.roomview,t.maxadultcount from public.hotelrooms r
    JOIN public.hotelroomtypes t 
    on t.id = r.roomtypeid 
    JOIN public.hotelroomview v
    on v.id = r.roomviewid 
    WHERE r.id not in 
    (SELECT bd.roomid FROM public.bookingdetails bd
    join public.booking b 
    on b.id =bd.bookingid
    WHERE $1 BETWEEN b.checkindate AND b.checkoutdate
    or $2  between b.checkindate AND b.checkoutdate)
    group by r.roomtypeid , r.roomviewid ,t.roomtype ,v.roomview,t.maxadultcount
    
    `

  pool
    .query(getAllBookingQuery, [checkindate, checkoutdate])
    .then((response) => {
      if (response.rows.length > 0) {
        const bookingData = response.rows // Get all rows
        res.json({ success: true, msg: '', data: bookingData })
      } else {
        res.json({ success: false, msg: 'No booking found', data: [] })
      }
    })
    .catch((err) => {
      console.error('Error fetching booking-rooms:', err)
      res.json({
        success: false,
        msg: 'Error fetching booking-rooms',
        data: [],
      })
    })
})

// get all prices

bookingRouter.get('/prices', (req, res) => {
  const { checkindate } = req.query
  const getAllBookingQuery = `
      SELECT p.*, v.roomview, t.roomtype from public.hotelroompriceshedules s
    JOIN public.hotelroomprices p
    on s.id = p.sheduleid
    join public.hotelroomview v 
    on v.id = p.roomviewid
    join public.hotelroomtypes t 
    on t.id = p.roomtypeid
    WHERE $1 BETWEEN startdate AND enddate`

  pool
    .query(getAllBookingQuery, [checkindate])
    .then((response) => {
      if (response.rows.length > 0) {
        const bookingData = response.rows // Get all rows
        res.json({ success: true, msg: '', data: bookingData })
      } else {
        res.json({ success: false, msg: 'No booking found', data: [] })
      }
    })
    .catch((err) => {
      console.error('Error fetching booking-prices:', err)
      res.json({
        success: false,
        msg: 'Error fetching booking-prices',
        data: [],
      })
    })
})

//check phone number

bookingRouter.get('/guest-by-phone/:phone', async (req, res) => {
  const { phone } = req.params
  //rrrrrrr
  try {
    const query = 'SELECT * FROM guestinformation WHERE phonenumber = $1'
    const result = await pool.query(query, [phone])

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, data: result.rows[0] })
    } else {
      res.status(404).json({ success: false, msg: 'Booking not found' })
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server error' })
  }
})

export default bookingRouter
