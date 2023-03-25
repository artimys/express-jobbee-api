const express = require('express');
const app = express();

const dotenv = require('dotenv');

const connectDatabase = require('./config/database');
const errorMiddleware = require('./middlewares/errors');


// Setting up config.ev file variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDatabase();

// Setup body parser
app.use(express.json());

// Import all routes
const jobs = require('./routes/jobs');


app.use('/api/v1', jobs);

// Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});

