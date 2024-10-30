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


//save request hrader
app.post('/requests', async (req, res) => {
    console.log("addrequest");
    try {
        console.log('Received data:', req.body);

        const { requester, date, department,remark } = req.body; 

        const insertSTMT = `INSERT INTO requests (requester, date, department,remark) VALUES ($1, $2, $3,$4)`;
        
        await pool.query(insertSTMT, [requester, date, department,remark]); 

        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});


//fetch request
app.get('/fetchrequests', async (req, res) => {
    try {
        const result = await pool.query(`SELECT rq.id,rq.requester,rq.date,rq.department,rq.remark,
                            rd.item,rd.quentity
                            FROM requests rq
                            INNER JOIN requestdetails rd 
                            ON rq.id = rd.requestid;
                            
         
            `);


        
            


          
     

        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
