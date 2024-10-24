const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Ensure this is configured correctly

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


//insert new 
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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
