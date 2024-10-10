'use server'

import { connectToDatabase } from '@/lib/db'

export const fetchHotels = async () => {
  const client = await connectToDatabase()

  try {
    const result = await client.query(
      `SELECT * FROM hoteldetails ORDER BY id ASC`,
    )
    console.log(result.rows, 'Hotel Data Fetched')
    return result.rows
  } catch (error) {
    console.error('Error fetching hotels:', error)
    throw new Error('Failed to fetch hotel data.')
  } finally {
    await client.end()
  }
}

export const InsertHotelData = async ({
  data,
  aboutFormData,
  contactdata,
  serviceFormData,
  roomsFormData,
  imageData, // FormData object containing main image files
  aboutImageData, // FormData object containing multiple about image files
  roomImageData,
  serviceImageData,
}: any) => {
  console.log('zzzzzzzzzzzzzz', roomImageData)
  console.log('ttttttttttt', roomsFormData)
  console.log('dddddddddd', serviceImageData)
  console.log('rrrrrrrrrr', serviceFormData)
  const client = await connectToDatabase()

  try {
    // Begin the transaction
    await client.query('BEGIN')

    // Insert hotel details as JSON into the 'hoteldetails' table
    const hotelQuery =
      'INSERT INTO hoteldetails (data) VALUES ($1) RETURNING id'
    const hotelValues = [
      JSON.stringify({
        data,
        aboutFormData,
        serviceFormData,
        roomsFormData,
        contactdata,
      }),
    ]
    const hotelResult = await client.query(hotelQuery, hotelValues)
    const hotelId = hotelResult.rows[0].id

    // Convert FormData main image data to Buffer for binary storage
    const imageBuffer = imageData
      ? Buffer.from(await imageData.get('0').arrayBuffer())
      : null

    // Insert the main image (if exists) into the Images table
    const imageQuery =
      'INSERT INTO Images (image, aboutimages, serviceimages, roomimages, hotelid) VALUES ($1, $2, $3, $4, $5)'
    const imageValues = [imageBuffer, null, null, null, hotelId] // aboutimage is null for the main image

    if (imageBuffer) {
      await client.query(imageQuery, imageValues)
    }

    // Loop through the `aboutImageData` and insert each about image
    if (aboutImageData && aboutImageData.entries) {
      for (const [key, value] of aboutImageData.entries()) {
        const aboutImageBuffer = Buffer.from(await value.arrayBuffer()) // Convert to Buffer
        const aboutImageQuery =
          'INSERT INTO Images (image, aboutimages, serviceimages, roomimages, hotelid) VALUES ($1, $2, $3, $4, $5)'
        const aboutImageValues = [null, aboutImageBuffer, null, null, hotelId] // image is null for about images
        await client.query(aboutImageQuery, aboutImageValues) // Insert each about image
      }
    }

    //  // Loop through the `serviceImageData` and insert each about image
    if (serviceImageData && serviceImageData.entries) {
      for (const [key, value] of serviceImageData.entries()) {
        const serviceImageBuffer = Buffer.from(await value.arrayBuffer()) // Convert to Buffer
        const serviceImageQuery =
          'INSERT INTO Images (image, aboutimages, serviceimages, roomimages, hotelid) VALUES ($1, $2, $3, $4, $5)'
        const serviceImageValues = [
          null,
          null,
          serviceImageBuffer,
          null,
          hotelId,
        ] // image is null for about images
        await client.query(serviceImageQuery, serviceImageValues) // Insert each about image
      }
    }

    // Loop through the `roomImageData` and insert each about image
    if (roomImageData && roomImageData.entries) {
      for (const [key, value] of roomImageData.entries()) {
        const roomImageBuffer = Buffer.from(await value.arrayBuffer()) // Convert to Buffer
        const roomImageQuery =
          'INSERT INTO Images (image, aboutimages, serviceimages, roomimages, hotelid) VALUES ($1, $2, $3, $4, $5)'
        const roomImageValues = [null, null, null, roomImageBuffer, hotelId] // image is null for about images
        await client.query(roomImageQuery, roomImageValues) // Insert each about image
      }
    }

    // Commit the transaction
    await client.query('COMMIT')

    return {
      success: true,
      msg: 'Insert successful',
      lastInsertRowid: hotelId,
    }
  } catch (error) {
    // Rollback the transaction in case of an error
    await client.query('ROLLBACK')
    console.error('Error in InsertHotelData:', error)
    return { success: false, msg: error.message, lastInsertRowid: 0 }
  } finally {
    await client.end()
  }
}
