const express = require('express');
const app = express();

const dotenv = require('dotenv');

const connectDatabase = require('./config/database');


// Setting up config.ev file variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDatabase();

// Setup body parser
app.use(express.json());

// Import all routes
const jobs = require('./routes/jobs');


app.use('/api/v1', jobs);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`);
})