const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Ensure this is configured correctly

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


//insert new request
app.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);

        const { id, buyer, date, message } = req.body;

   
        const insertSTMT = `INSERT INTO goodreq (reqid, date, buyer, remark) VALUES ($1, $2, $3, $4)`;
        await pool.query(insertSTMT, [id, date, buyer, message]);

        
        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});


//fetch the data 
// app.get('/requests', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM goodreq');
//         console.log('Fetched Data:', result.rows); 
//         res.json(result.rows); 
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

//fetch items
app.get('/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

//insert new item
app.post('/additem', async (req, res) => {
    console.log("Api working",res)
    // res.status(200).json({
    //     message: 'API is working, no data processed.'
    // });
    try {
      
        console.log('Received data:', req.body);

        const {  name, categoryid, defaultunit,description,itemtype} = req.body;

   
        const insertSTMT = `INSERT INTO items ( name, categoryid, defaultunit,description,itemtype) VALUES ($1, $2, $3, $4,$5)`;
        await pool.query(insertSTMT, [ name, categoryid, defaultunit,description,itemtype]);

        
        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});



//fetch units 
app.get('/units', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM units');
        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

//fetch category id and name 
app.get('/categoryid', async (req, res) => {
    try {
        const result = await pool.query('SELECT id ,category FROM itemcategories');
        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

//add new unit 
app.post('/addunit', async (req, res) => {
    try {
        // console.log("add unit is working ")
        console.log('Received data:', req.body);

        const {unit, description } = req.body;

   
        const insertSTMT = `INSERT INTO units (unit, description) VALUES ($1, $2)`;
        await pool.query(insertSTMT, [unit, description]);

        
        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});

//delete unit
app.delete('/deleteunit/:unit', async (req, res) => {
    try {
        const { unit } = req.params;

        const deleteSTMT = `DELETE FROM units WHERE unit = $1`;
        const result = await pool.query(deleteSTMT, [unit]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.json({ message: 'Unit deleted successfully' });
    } catch (error) {
        console.error('Error deleting unit:', error);
        res.status(500).send('Internal Server Error');
    }
});

//edit unit
app.put('/editunit/:unit', async (req, res) => {
    try {
        const { unit } = req.params;
        const { description } = req.body;

        const updateSTMT = `
            UPDATE units 
            SET description = $1
            WHERE unit = $2
        `;

        const result = await pool.query(updateSTMT, [description, unit]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.json({ message: 'Unit updated successfully' });
    } catch (error) {
        console.error('Error updating unit:', error);
        res.status(500).send('Internal Server Error');
    }
});

//fetch all categories
app.get('/allcategories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM itemcategories');
        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// get unit and description
app.get('/unitoptions', async (req, res) => {
    try {
        const result = await pool.query('SELECT unit,description FROM units');
        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


//add new category
app.post('/addcategory', async (req, res) => {
    console.log("addcategory");
    try {
        console.log('Received data:', req.body);

        const { category, description, itemtype } = req.body; 

        const insertSTMT = `INSERT INTO itemcategories (category, description, itemtype) VALUES ($1, $2, $3)`;
        
        await pool.query(insertSTMT, [category, description, itemtype]); 

        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});


//delete category
app.delete('/deletecategory/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteSTMT = `DELETE FROM itemcategories WHERE id = $1`;
        const result = await pool.query(deleteSTMT, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting unit:', error);
        res.status(500).send('Internal Server Error');
    }
});

//edit category
app.put('/editcategory/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { category,description,itemtype } = req.body;

        const updateSTMT = `
            UPDATE itemcategories 
            SET category = $1,description=$2,itemtype=$3
            WHERE id = $4
        `;

        const result = await pool.query(updateSTMT, [category,description,itemtype, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating unit:', error);
        res.status(500).send('Internal Server Error');
    }
});


//delete a cetegory
app.delete('/deleteitem/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteSTMT = `DELETE FROM items WHERE id = $1`;
        const result = await pool.query(deleteSTMT, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting unit:', error);
        res.status(500).send('Internal Server Error');
    }
});


//edit item 
app.put('/edititem/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name,categoryid, defaultunit,description,itemtype} = req.body;

        const updateSTMT = `
            UPDATE items 
            SET name = $1,categoryid=$2,defaultunit=$3,description=$4,itemtype=$5
            WHERE id = $6
        `;

        const result = await pool.query(updateSTMT, [name,categoryid, defaultunit,description,itemtype, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.json({ message: 'Unit updated successfully' });
    } catch (error) {
        console.error('Error updating unit:', error);
        res.status(500).send('Internal Server Error');
    }
});




app.post('/requests', async (req, res) => {
    console.log("addrequest");
    try {
        console.log('Received data:', req.body);

        const { requester, date, department, remark, details,hotelid } = req.body;

        const insertSTMT = `INSERT INTO requests (requester, date, department, remark,hotelid) VALUES ($1, $2, $3, $4,$5) RETURNING id`;

        const result = await pool.query(insertSTMT, [requester, date, department, remark,hotelid]);
        const requestId = result.rows[0].id;

       
        const insertSTMT2 = `INSERT INTO requestdetails (item, quentity, requestid,unit) VALUES ($1, $2, $3,$4)`;
        for (const detail of details) {
            const { item, quantity } = detail;
            await pool.query(insertSTMT2, [item, quantity, requestId,unit]);
        }

        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});



//fetch request
app.get('/fetchrequests', async (req, res) => {
    try {
        const result = await pool.query(`SELECT 

                                       *    FROM 
                                        requests rq
                                   `);
        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


//fetch req details
app.get('/fetchreqdetails/:id', async (req, res) => {
    console.log("hello")
    const { id } = req.params;
    console.log(id)
    try {
        const resulth = await pool.query(`SELECT  rq.* FROM requests rq
                                        where rq.id=$1;
                                   `,[id]);

        const resultd = await pool.query(`SELECT rd.* FROM requestdetails rd
                                        where rd.requestid=$1;
                                   `,[id]);
        console.log('Fetched Data:', resulth.rows); 
        console.log('Fetched Data:', resultd.rows); 
        res.json({success:true,data:{header:resulth.rows[0],details:resultd.rows},msg:"Success!"}); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.json({success:false,data:{},msg:"Something went wrong!"}); 
    }
});


//delete requests
app.delete('/deleteheader/:id', async (req, res) => {
    console.log("hello");
    try {
        const { id } = req.params;

        // Delete related records in requestdetails table
        await pool.query(`DELETE FROM requestdetails WHERE requestid = $1`, [id]);

        // Delete the main record in requests table
        const deleteSTMT = `DELETE FROM requests WHERE id = $1`;
        const result = await pool.query(deleteSTMT, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error('Error deleting unit:', error);
        res.status(500).send('Internal Server Error');
    }
});


//edit request and header  
// app.put('/editrequests/:selectedData.value.id', async (req, res) => {
//     console.log("editRequest");
//     try {
//         const requestId = req.params.selectedData.value.id;
//         console.log("reqid",selectedData.value.id)
//         const { requester, date, department, remark, details } = req.body;

//         console.log('Received updated data:', req.body);

      
//         const updateRequestSTMT = `UPDATE requests SET requester = $1, date = $2, department = $3, remark = $4 WHERE id = $5`;
//         await pool.query(updateRequestSTMT, [requester, date, department, remark, requestId]);

        
//         const existingDetails = await pool.query(`SELECT id FROM requestdetails WHERE requestid = $1`, [requestId]);
//         const existingDetailIds = existingDetails.rows.map(row => row.id);

//         for (const detail of details) {
//             const { id, item, quantity } = detail;

//             if (id) {
             
//                 if (existingDetailIds.includes(id)) {
//                     const updateDetailSTMT = `UPDATE requestdetails SET item = $1, quentity = $2 WHERE id = $3`;
//                     await pool.query(updateDetailSTMT, [item, quantity, id]);
//                 }
//             } else {
                
//                 const insertDetailSTMT = `INSERT INTO requestdetails (item, quentity, requestid) VALUES ($1, $2, $3)`;
//                 await pool.query(insertDetailSTMT, [item, quantity, requestId]);
//             }
//         }

//         const newDetailIds = details.map(detail => detail.id).filter(id => id);
//         for (const existingId of existingDetailIds) {
//             if (!newDetailIds.includes(existingId)) {
//                 await pool.query(`DELETE FROM requestdetails WHERE id = $1`, [existingId]);
//             }
//         }

//         res.send('Data updated successfully');
//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
app.put('/editrequests/:id', async (req, res) => {
    try {
        const requestId = req.params.id;
        const { requester, date, department, remark, details,item,quentity } = req.body;

        const updateRequestSTMT = `UPDATE requests SET requester = $1, date = $2, department = $3, remark = $4 WHERE id = $5`;
        await pool.query(updateRequestSTMT, [requester, date, department, remark, requestId]);

        const existingDetails = await pool.query(`SELECT id FROM requestdetails WHERE requestid = $1`, [requestId]);
        const existingDetailIds = existingDetails.rows.map(row => row.id);

        for (const detail of details) {
            const { id, item, quentity } = detail;

            if (quentity == null) {
                throw new Error(`Quantity is required for item ${item}`);
            }

            if (id && existingDetailIds.includes(id)) {
                const updateDetailSTMT = `UPDATE requestdetails SET item = $1, quentity = $2 WHERE id = $3`;
                await pool.query(updateDetailSTMT, [item, quentity, id]);
            } else if (!id) {
                const insertDetailSTMT = `INSERT INTO requestdetails (item, quentity, requestid) VALUES ($1, $2, $3)`;
                await pool.query(insertDetailSTMT, [item, quentity, requestId]);
            }
        }

        const newDetailIds = details.map(detail => detail.id).filter(id => id);
        for (const existingId of existingDetailIds) {
            if (!newDetailIds.includes(existingId)) {
                await pool.query(`DELETE FROM requestdetails WHERE id = $1`, [existingId]);
            }
        }

        res.send('Data updated successfully');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});
   



//add new grn 
// app.post('/addgrn', async (req, res) => {
//     console.log("new grn");
//     try {
//         console.log('Received data:', req.body);

//         const { invno, vendor, date ,remark} = req.body; 

//         const insertSTMT = `INSERT INTO grn (invoiceno, vendorname, date,remark) VALUES ($1, $2, $3,$4)`;
        
//         await pool.query(insertSTMT, [invno, vendor, date ,remark]); 

//         res.send('Data inserted successfully');
//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



//fetch grn header
app.get('/fetchgrn', async (req, res) => {
    try {
        const result = await pool.query(`SELECT 

                                       *    FROM 
                                        grn rq
                                   `);
        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

//fetch item options 
app.get('/itemoptions', async (req, res) => {
    try {
        const result = await pool.query('SELECT id,name FROM items');
        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/addgrn', async (req, res) => {
    console.log("addrequest");
     try {
      console.log('Received data grnnnnnn:', req.body);

        const { invno,  vendor, date, remark,details,hotelid } = req.body;

        const insertSTMT = `INSERT INTO grn (invoiceno, vendorname, date, remark,hotelid) VALUES ($1, $2, $3, $4,$5) RETURNING id`;

        const result = await pool.query(insertSTMT, [invno, vendor,date, remark,hotelid]);
        const requestId = result.rows[0].id;

       
        const insertSTMT2 = `INSERT INTO grndetails (grnid,itemid, description, unit,quantity,remark) VALUES ($1, $2, $3,$4,$5,$6)`;
        for (const detail of details) {
            const {item, description,unit,quentity,remark } = detail;
            await pool.query(insertSTMT2, [requestId,item, description,unit,quentity,remark]);
        }

        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});




//fetch data
app.get('/fetchgrndetails/:id', async (req, res) => {
    console.log("hello")
    const { id } = req.params;
    console.log(id)
    try {
        const resulth = await pool.query(`SELECT  * FROM grn 
                                        where id=$1;
                                   `,[id]);

        const resultd = await pool.query(`SELECT * FROM grndetails rd
                                        where grnid=$1;
                                   `,[id]);
        console.log('Fetched Data:', resulth.rows); 
        console.log('Fetched Data:', resultd.rows); 
        res.json({success:true,data:{header:resulth.rows[0],details:resultd.rows},msg:"Success!"}); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.json({success:false,data:{},msg:"Something went wrong!"}); 
    }
});


// search items 
app.get('/searchItems', async (req, res) => {
    const searchQuery = req.query.query;
    try {
        // const result = await pool.query('SELECT * from items');

        const result = await pool.query(
            'SELECT * FROM items WHERE name ILIKE $1', 
            [`%${searchQuery}%`]
          );
        console.log('Fetched item popup  Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


//delete grn
app.delete('/deletegrn/:id', async (req, res) => {
    console.log("hello");
    try {
        const { id } = req.params;

        // Delete related records in requestdetails table
        await pool.query(`DELETE FROM grndetails WHERE grnid = $1`, [id]);

        // Delete the main record in requests table
        const deleteSTMT = `DELETE FROM grn WHERE id = $1`;
        const result = await pool.query(deleteSTMT, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error('Error deleting unit:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
