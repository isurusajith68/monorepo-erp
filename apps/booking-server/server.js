const express = require('express')
const cors = require('cors')
const pool = require('./database')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/b', (req, res) => {
  const a = req.body['roomnumber']
  const b = req.body['checkin']
  const c = req.body['checkout']
  const d = req.body['telephone']
  const e = req.body['email']
  const f = req.body['adultcount']
  const g = req.body['childrencount']
  const h = req.body['bookingdate']

  const insertSTMT = `INSERT INTO booking (roomnumber , checkin , checkout, telephone, email,adultcount, childrencount, bookingdate ) VALUES ('${a}','${b}','${c}','${d}','${e}','${f}','${g}','${h}')`
  pool
    .query(insertSTMT)
    .then((response) => {
      console.log('Data saved')
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  console.log(req.body)
  res.send('response recived :' + req.body)
})

// add booking
// app.post('/bookings', (req, res) => {
//   const {
//     checkin,
//     checkout,
//     guestinformation,
//   } = req.body

//   const insertSTMT = `
//       INSERT INTO booking ( checkin, checkout, guestinformation)
//       VALUES ($1, $2, $3,)
//       RETURNING id;`

//   pool
//     .query(insertSTMT, [

//       checkin,
//       checkout,
//      guestinformation,
//     ])
//     .then((response) => {
//       const lastInsertRowid = response.rows[0].id
//       console.log('Booking saved', lastInsertRowid)
//       res.json({ success: true, msg: '', lastInsertRowid })
//     })
//     .catch((err) => {
//       console.error('Insert failed', err)
//       res.json({
//         success: false,
//         msg: `Insert failed- ${err}`,
//         lastInsertRowid: 0,
//       })
//     })
// })
app.post('/bookings', (req, res) => {
  const {
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
  } = req.body

  // Insert guest information first
  const guestInsertSTMT = `
      INSERT INTO guestinformation (firstname, lastname, email, phonenumber, address, city, country, postalcode) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;`

  pool
    .query(guestInsertSTMT, [
      firstname,
      lastname,
      email,
      phonenumber,
      address,
      city,
      country,
      postalcode,
    ])
    .then((guestResponse) => {
      const guestId = guestResponse.rows[0].id // Get the guestinformation ID

      console.log('Guest Information saved', guestId)

      // Now insert booking data with guestinformation foreign key
      const bookingInsertSTMT = `
        INSERT INTO booking (checkin, checkout, guestinformation)
        VALUES ($1, $2, $3)
        RETURNING id;`

      return pool.query(bookingInsertSTMT, [checkindate, checkoutdate, guestId])
    })
    .then((bookingResponse) => {
      const bookingId = bookingResponse.rows[0].id
      console.log('Booking saved', bookingId)

      // Respond with success
      res.json({ success: true, msg: '', bookingId })
    })
    .catch((err) => {
      console.error('Insert failed', err)

      // Respond with failure
      res.json({
        success: false,
        msg: `Insert failed - ${err}`,
      })
    })
})

//update booking
app.put('/bookings/:id', (req, res) => {
  const { id } = req.params
  const dirtyfields = req.body
  console.log('dirtyfields', dirtyfields, id)
  // Prepare column definitions and values from dirtyfields
  const colDefs = Object.keys(dirtyfields).map(
    (field, index) => `${field} = $${index + 1}`,
  )
  const values = Object.values(dirtyfields)

  if (colDefs.length === 0) {
    // No changes to be made, exit early
    return res.json({ success: false, msg: 'No fields to update' })
  }

  // Construct the SQL query
  const updateSQL = `UPDATE booking SET ${colDefs.join(', ')} WHERE id = $${
    colDefs.length + 1
  } RETURNING *`

  // Execute the update query
  pool
    .query(updateSQL, [...values, id])
    .then((response) => {
      if (response.rowCount > 0) {
        res.json({
          success: true,
          msg: 'Booking updated successfully',
          updatedBooking: response.rows[0],
        })
      } else {
        res.json({
          success: false,
          msg: 'Booking not found or no changes made',
        })
      }
    })
    .catch((err) => {
      console.error('Error executing update query:', err)
      res.json({
        success: false,
        msg: 'Error updating booking',
        error: err.message,
      })
    })
})

// get booking details by id
app.get('/bookings/:id', (req, res) => {
  const { id } = req.params

  const getBookingQuery = `SELECT * FROM booking WHERE id = $1`

  pool
    .query(getBookingQuery, [id])
    .then((response) => {
      if (response.rows.length > 0) {
        const bookingData = response.rows[0]
        res.json({ success: true, msg: '', data: bookingData })
      } else {
        res.json({ success: false, msg: 'Booking not found', data: {} })
      }
    })
    .catch((err) => {
      console.error('Error fetching booking:', err)
      res.json({ success: false, msg: 'Error fetching booking', data: {} })
    })
})

// get all bookings

app.get('/allbookings', (req, res) => {
  const getAllBookingQuery = `SELECT * FROM booking`

  pool
    .query(getAllBookingQuery)
    .then((response) => {
      if (response.rows.length > 0) {
        const bookingData = response.rows // Get all rows
        res.json({ success: true, msg: '', data: bookingData })
      } else {
        res.json({ success: false, msg: 'No booking found', data: [] })
      }
    })
    .catch((err) => {
      console.error('Error fetching booking:', err)
      res.json({ success: false, msg: 'Error fetching booking', data: [] })
    })
})

//delete booking
app.delete('/bookings/delete/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Prepare the SQL query
    const sqlDel = 'DELETE FROM booking WHERE id = $1'
    const result = await pool.query(sqlDel, [id])

    // Check if any row was deleted
    if (result.rowCount > 0) {
      res
        .status(200)
        .json({ success: true, msg: 'booking deleted successfully', data: {} })
    } else {
      res
        .status(404)
        .json({ success: false, msg: 'booking not found', data: {} })
    }
  } catch (error) {
    console.error('Error deleting booking:', error)
    res.status(500).json({ success: false, msg: 'Server error', data: {} })
  }
})

app.get('/bookings/prev/:id?', async (req, res) => {
  const { id } = req.params // Assuming 'id' is passed as a URL parameter
  try {
    let prevRow

    if (id) {
      const prevIdQuery = `SELECT * FROM booking WHERE id < $1 ORDER BY id DESC LIMIT 1`
      const prevResult = await pool.query(prevIdQuery, [id])
      prevRow = prevResult.rows[0]
    } else {
      const prevIdQuery2 = `SELECT * FROM booking ORDER BY id DESC LIMIT 1`
      const prevResult2 = await pool.query(prevIdQuery2)
      prevRow = prevResult2.rows[0]
    }

    if (prevRow) {
      res.json({ success: true, msg: '', data: prevRow })
    } else {
      res.json({ success: true, msg: '', data: {} })
    }
  } catch (error) {
    console.error('Error in getPrevMaterialItem API:', error)
    res.json({ success: false, msg: error.message, data: {} })
  }
})

app.get('/bookings/next/:id?', async (req, res) => {
  const { id } = req.params // Assuming 'id' is passed as a URL parameter
  try {
    let nextRow

    if (id) {
      const nextIdQuery = `SELECT * FROM booking WHERE id > $1 ORDER BY id ASC LIMIT 1`
      const nextResult = await pool.query(nextIdQuery, [id])
      nextRow = nextResult.rows[0]
    } else {
      const nextIdQuery2 = `SELECT * FROM booking ORDER BY id ASC LIMIT 1`
      const nextResult2 = await pool.query(nextIdQuery2)
      nextRow = nextResult2.rows[0]
    }

    if (nextRow) {
      res.json({ success: true, msg: '', data: nextRow })
    } else {
      res.json({ success: true, msg: 'This is the last ID', data: {} })
    }
  } catch (error) {
    console.error('Error in getNextMaterialItem API:', error)
    res.json({ success: false, msg: error.message, data: {} })
  }
})

// add registration
app.post('/registration', (req, res) => {
  const {
    fullname,
    address,
    email,
    telephone,
    city,
    province,
    country,
    postalcode,
  } = req.body

  const insertSTMT = `
      INSERT INTO registration (fullname , address , email, telephone, city, province, country, postalcode ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;`

  pool
    .query(insertSTMT, [
      fullname,
      address,
      email,
      telephone,
      city,
      province,
      country,
      postalcode,
    ])
    .then((response) => {
      const lastInsertRowid = response.rows[0].id
      console.log('Booking saved')
      res.json({ success: true, msg: '', lastInsertRowid })
    })
    .catch((err) => {
      console.error('Insert failed', err)
      res.json({ success: false, msg: 'Insert failed', lastInsertRowid: 0 })
    })
})

// update registration
app.put('/registrations/:id', (req, res) => {
  const { id } = req.params
  const dirtyfields = req.body

  // Prepare column definitions and values from dirtyfields
  const colDefs = Object.keys(dirtyfields).map(
    (field, index) => `${field} = $${index + 1}`,
  )
  const values = Object.values(dirtyfields)

  if (colDefs.length === 0) {
    // No changes to be made, exit early
    return res.json({ success: false, msg: 'No fields to update' })
  }

  // Construct the SQL query
  const updateSQL = `UPDATE registration SET ${colDefs.join(
    ', ',
  )} WHERE id = $${colDefs.length + 1} RETURNING *`

  // Execute the update query
  pool
    .query(updateSQL, [...values, id])
    .then((response) => {
      if (response.rowCount > 0) {
        res.json({
          success: true,
          msg: 'registration updated successfully',
          updatedRegistration: response.rows[0],
        })
      } else {
        res.json({
          success: false,
          msg: 'registration not found or no changes made',
        })
      }
    })
    .catch((err) => {
      console.error('Error executing update query:', err)
      res.json({
        success: false,
        msg: 'Error updating registration',
        error: err.message,
      })
    })
})

// get registration details
app.get('/registration/:id', (req, res) => {
  const { id } = req.params

  const getRegistrationQuery = `SELECT * FROM registration WHERE id = $1`

  pool
    .query(getRegistrationQuery, [id])
    .then((response) => {
      if (response.rows.length > 0) {
        const registrationData = response.rows[0]
        res.json({ success: true, msg: '', data: registrationData })
      } else {
        res.json({ success: false, msg: 'Registration not found', data: {} })
      }
    })
    .catch((err) => {
      console.error('Error fetching registration:', err)
      res.json({ success: false, msg: 'Error fetching registration', data: {} })
    })
})

// getting all registration data
app.get('/allregistration', (req, res) => {
  const getAllRegistrationQuery = `SELECT * FROM registration`

  pool
    .query(getAllRegistrationQuery)
    .then((response) => {
      if (response.rows.length > 0) {
        const registrationData = response.rows // Get all rows
        res.json({ success: true, msg: '', data: registrationData })
      } else {
        res.json({ success: false, msg: 'No registration found', data: [] })
      }
    })
    .catch((err) => {
      console.error('Error fetching registration:', err)
      res.json({ success: false, msg: 'Error fetching registration', data: [] })
    })
})

//delete registration
app.delete('/deleteRegistration/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Prepare the SQL query
    const sqlDel = 'DELETE FROM registration WHERE id = $1'
    const result = await pool.query(sqlDel, [id])

    // Check if any row was deleted
    if (result.rowCount > 0) {
      res.status(200).json({
        success: true,
        msg: 'registration deleted successfully',
        data: {},
      })
    } else {
      res
        .status(404)
        .json({ success: false, msg: 'registration not found', data: {} })
    }
  } catch (error) {
    console.error('Error deleting registration:', error)
    res.status(500).json({ success: false, msg: 'Server error', data: {} })
  }
})

app.get('/registration/prev/:id?', async (req, res) => {
  const { id } = req.params // Assuming 'id' is passed as a URL parameter
  try {
    let prevRow

    if (id) {
      const prevIdQuery = `SELECT * FROM registration WHERE id < $1 ORDER BY id DESC LIMIT 1`
      const prevResult = await pool.query(prevIdQuery, [id])
      prevRow = prevResult.rows[0]
    } else {
      const prevIdQuery2 = `SELECT * FROM registration ORDER BY id DESC LIMIT 1`
      const prevResult2 = await pool.query(prevIdQuery2)
      prevRow = prevResult2.rows[0]
    }

    if (prevRow) {
      res.json({ success: true, msg: '', data: prevRow })
    } else {
      res.json({ success: true, msg: '', data: {} })
    }
  } catch (error) {
    console.error('Error in getPrevMaterialItem API:', error)
    res.json({ success: false, msg: error.message, data: {} })
  }
})

app.get('/registration/next/:id?', async (req, res) => {
  const { id } = req.params // Assuming 'id' is passed as a URL parameter
  try {
    let nextRow

    if (id) {
      const nextIdQuery = `SELECT * FROM registration WHERE id > $1 ORDER BY id ASC LIMIT 1`
      const nextResult = await pool.query(nextIdQuery, [id])
      nextRow = nextResult.rows[0]
    } else {
      const nextIdQuery2 = `SELECT * FROM registration ORDER BY id ASC LIMIT 1`
      const nextResult2 = await pool.query(nextIdQuery2)
      nextRow = nextResult2.rows[0]
    }

    if (nextRow) {
      res.json({ success: true, msg: '', data: nextRow })
    } else {
      res.json({ success: true, msg: 'This is the last ID', data: {} })
    }
  } catch (error) {
    console.error('Error in getNextMaterialItem API:', error)
    res.json({ success: false, msg: error.message, data: {} })
  }
})

app.get('/kasun', (req, res) => {
  res.send('hello world')
})

app.post('/reg', (req, res) => {
  const a = req.body['fullname']
  const b = req.body['address']
  const c = req.body['email']
  const d = req.body['telephone']
  const e = req.body['city']
  const f = req.body['province']
  const g = req.body['country']
  const h = req.body['postalcode']

  const insertSTMT = `INSERT INTO registration (fullname , address , email, telephone, city, province, country, postalcode ) VALUES ('${a}','${b}','${c}','${d}','${e}','${f}','${g}','${h}')`
  pool
    .query(insertSTMT)
    .then((response) => {
      console.log('Data saved')
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  console.log(req.body)
  res.send('response recived :' + req.body)
})

app.get('/kasun', (req, res) => {
  res.send('hello world')
})

// app.delete('deletecustomers/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Prepare the SQL query
//         const sqlDel = 'DELETE FROM booking WHERE id = $1';
//         const result = await pool.query(sqlDel, [id]);

//         // Check if any row was deleted
//         if (result.rowCount > 0) {
//             res.status(200).json({ success: true, msg: ' deleted successfully', data: {} });
//         } else {
//             res.status(404).json({ success: false, msg: 'Customer not found', data: {} });
//         }
//     } catch (error) {
//         console.error('Error deleting customer:', error);
//         res.status(500).json({ success: false, msg: 'Server error', data: {} });
//     }
// });

app.get('/booking-by-phone/:phone', async (req, res) => {
  const { phone } = req.params

  try {
    const query = 'SELECT * FROM booking WHERE telephone = $1'
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

// add booking
app.post('/roomdetails', (req, res) => {
  const { roomnumber, roomtype, selectedprice, price, maintenance, roomview } =
    req.body

  const insertSTMT = `
      INSERT INTO roomdetails (roomnumber, roomtype, selectedprice, price, maintenance, roomview) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;`

  pool
    .query(insertSTMT, [
      roomnumber,
      roomtype,
      selectedprice,
      price,
      maintenance,
      roomview,
    ])
    .then((response) => {
      const lastInsertRowid = response.rows[0].id
      console.log('Room Details saved', lastInsertRowid)
      res.json({ success: true, msg: '', lastInsertRowid })
    })
    .catch((err) => {
      console.error('Insert failed', err)
      res.json({
        success: false,
        msg: `Insert failed- ${err}`,
        lastInsertRowid: 0,
      })
    })
})

app.put('/roomdetails/:id', (req, res) => {
  const { id } = req.params
  const dirtyfields = req.body
  console.log('dirtyfields', dirtyfields, id)
  // Prepare column definitions and values from dirtyfields
  const colDefs = Object.keys(dirtyfields).map(
    (field, index) => `${field} = $${index + 1}`,
  )
  const values = Object.values(dirtyfields)

  if (colDefs.length === 0) {
    // No changes to be made, exit early
    return res.json({ success: false, msg: 'No fields to update' })
  }

  // Construct the SQL query
  const updateSQL = `UPDATE roomdetails SET ${colDefs.join(', ')} WHERE id = $${
    colDefs.length + 1
  } RETURNING *`

  // Execute the update query
  pool
    .query(updateSQL, [...values, id])
    .then((response) => {
      if (response.rowCount > 0) {
        res.json({
          success: true,
          msg: 'Room Details updated successfully',
          updatedBooking: response.rows[0],
        })
      } else {
        res.json({
          success: false,
          msg: 'Room Details not found or no changes made',
        })
      }
    })
    .catch((err) => {
      console.error('Error executing update query:', err)
      res.json({
        success: false,
        msg: 'Error updating booking',
        error: err.message,
      })
    })
})

// get booking details by id
app.get('/roomdetails/:id', (req, res) => {
  const { id } = req.params

  const getBookingQuery = `SELECT * FROM roomdetails WHERE id = $1`

  pool
    .query(getBookingQuery, [id])
    .then((response) => {
      if (response.rows.length > 0) {
        const bookingData = response.rows[0]
        res.json({ success: true, msg: '', data: bookingData })
      } else {
        res.json({ success: false, msg: 'Room Details not found', data: {} })
      }
    })
    .catch((err) => {
      console.error('Error fetching Room Details:', err)
      res.json({ success: false, msg: 'Error fetching Room Details', data: {} })
    })
})

// get all roomdetails

app.get('/allroomdetails', (req, res) => {
  const getAllRoomDetailsQuery = `SELECT * FROM roomdetails WHERE maintenance=false`

  pool
    .query(getAllRoomDetailsQuery)
    .then((response) => {
      if (response.rows.length > 0) {
        const roomData = response.rows // Get all rows
        res.json({ success: true, msg: '', data: roomData })
      } else {
        res.json({ success: false, msg: 'No booking found', data: [] })
      }
    })
    .catch((err) => {
      console.error('Error fetching booking:', err)
      res.json({ success: false, msg: 'Error fetching booking', data: [] })
    })
})
app.get('/library', (req, res) => {
  const getAllRoomDetailsQuery = `SELECT * FROM roomprices `

  pool
    .query(getAllRoomDetailsQuery)
    .then((response) => {
      if (response.rows.length > 0) {
        const roomData = response.rows // Get all rows
        res.json({ success: true, msg: '', data: roomData })
      } else {
        res.json({ success: false, msg: 'No booking found', data: [] })
      }
    })
    .catch((err) => {
      console.error('Error fetching booking:', err)
      res.json({ success: false, msg: 'Error fetching booking', data: [] })
    })
})

// app.get('/hotel-data', async (req, res) => {
//   try {
//     // Query to get all necessary data from the tables
//     const usersQuery = 'SELECT * FROM hotelrooms';
//     const hotelOffersQuery = 'SELECT discount FROM hoteloffers';
//     const hotelRoomsQuery = 'SELECT roomtype FROM hotelrooms';
//     const hotelRoomTypesQuery = 'SELECT roomtype FROM hotelroomtypes';
//     const hotelRoomViewQuery = 'SELECT roomview FROM hotelroomview';
//     const roomPricesQuery = 'SELECT * FROM roomprices';

//     // Execute all queries asynchronously
//     const [hotelRooms, hotelOffers, hotelRoomTypes, hotelRoomViews, roomPrices] = await Promise.all([
//       pool.query(usersQuery),
//       pool.query(hotelOffersQuery),
//       pool.query(hotelRoomTypesQuery),
//       pool.query(hotelRoomViewQuery),
//       pool.query(roomPricesQuery),
//     ]);

//     // Combine data into one object
//     const combinedData = hotelRooms.rows.map((room) => {
//       const roomOffer = hotelOffers.rows.find((offer) => offer.roomtype === room.roomtype);
//       const roomType = hotelRoomTypes.rows.find((type) => type.roomtype === room.roomtype);
//       const roomView = hotelRoomViews.rows.find((view) => view.roomtype === room.roomtype);
//       const roomPrice = roomPrices.rows.find((price) => price.roomtype === room.roomtype);

//       return {
//         ...room,
//         discount: roomOffer ? roomOffer.discount : null,
//         roomType: roomType ? roomType.roomtype : null,
//         roomView: roomView ? roomView.roomview : null,
//         roomPrice: roomPrice ? roomPrice.price : null,
//       };
//     });

//     // Send combined data as response
//     res.json(combinedData);
//   } catch (error) {
//     console.error('Error fetching data', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/library', async (req, res) => {
//   try {
//     // Fetch data from users and orders tables
//     const usersQuery = 'SELECT * FROM hotelrooms'
//     const hotelofers = 'SELECT discount FROM hoteloffers'
//     const hotelrooms = 'SELECT roomtype FROM hotelrooms'
//     const hotelroomtypes = 'SELECT roomtype FROM hotelroomtypes'
//     const hotelroomview = 'SELECT roomview FROM hotelroomview'
//     const roomprices = 'SELECT * FROM roomprices'
//     // const ordersQuery =
//     //   'SELECT id, user_id, order_date, total_amount FROM orders'

//     const usersResult = await pool.query(usersQuery)
//     const hotelofersResult = await pool.query(hotelofers)
//     const hotelroomsResult = await pool.query(hotelrooms)
//     const hotelroomtypesResult = await pool.query(hotelroomtypes)
//     const hotelroomviewResult = await pool.query(hotelroomview)
//     const roompricesResult = await pool.query(roomprices)

//     const users = usersResult.rows
//     const b = hotelofersResult.rows
//     const c = hotelroomsResult.rows
//     const d = hotelroomtypesResult.rows
//     const e = hotelroomviewResult.rows
//     const f = roompricesResult.rows

//     // Create an array of objects with the combined data
//     const usersWithOrders = users.map((user) => {
//       // Find orders for this user
//       const userOrders = orders.filter((order) => order.user_id === user.id)

//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         orders: userOrders.map((order) => ({
//           orderId: order.id,
//           orderDate: order.order_date,
//           totalAmount: order.total_amount,
//         })),
//       }
//     })

//     // Send structured response
//     res.json(usersWithOrders)
//   } catch (error) {
//     console.error(error)
//     res.status(500).send('Error fetching data')
//   }
// })

app.post('/guestinformation', (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phonenumber,
    address,
    city,
    country,
    postalcode,
  } = req.body

  const insertSTMT = `
      INSERT INTO guestinformation (firstname, lastname, email, phonenumber, address, city, country, postalcode) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;`

  pool
    .query(insertSTMT, [
      firstname,
      lastname,
      email,
      phonenumber,
      address,
      city,
      country,
      postalcode,
    ])
    .then((response) => {
      const lastInsertRowid = response.rows[0].id
      console.log('Room Details saved', lastInsertRowid)
      res.json({ success: true, msg: '', lastInsertRowid })
    })
    .catch((err) => {
      console.error('Insert failed', err)
      res.json({
        success: false,
        msg: `Insert failed- ${err}`,
        lastInsertRowid: 0,
      })
    })
})

app.listen(4000, () => console.log('server is running on port 4000'))
