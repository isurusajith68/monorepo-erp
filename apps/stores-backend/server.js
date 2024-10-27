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
app.get('/requests', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM goodreq');
        console.log('Fetched Data:', result.rows); 
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

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

        const { id, name, categoryid, defaultunit,description } = req.body;

   
        const insertSTMT = `INSERT INTO items (id, name, categoryid, defaultunit,description) VALUES ($1, $2, $3, $4,$5)`;
        await pool.query(insertSTMT, [id, name, categoryid, defaultunit,description]);

        
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





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
