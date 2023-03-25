const mongoose = require('mongoose');

// Connect to MongoDB
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

        // Use IPv4, skip trying IPv6
        // otherwise use 127.0.0.1 instead of localhost
        family: 4
    }).then(con => {
        console.log(`MongoDB connected successfully. ${con.connection.host}`);
    }).catch(err => {
        console.log(`MongoDB connection failed. ${err}`);
    });
};

module.exports = connectDatabase;

