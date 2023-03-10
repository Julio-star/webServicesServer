const express = require('express'); //framework
const helmet = require('helmet'); //Configure HTTP Headers
const mongoose = require('mongoose'); // DataBase
const compression = require('compression'); // Compression for quick server response


const app = express(); // app creation
app.use(helmet());
app.use(compression());

// Passby CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserID, email');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

//const DB_ID = process.env.DB_ID;
//const DB_PW = process.env.DB_PW;

const DB_ID = "root";
const DB_PW = "root";

//connect to MongoDB
const DB = 'mongodb+srv://'+ DB_ID +':'+ DB_PW +'@cluster0.uzuvc4p.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err);
    })
app.use(express.urlencoded({extended:false}))
app.use(express.json())


// import routes
const objectRoutes = require('./routes/object');
const userRoutes = require('./routes/user');

app.use('/api/objects', objectRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;