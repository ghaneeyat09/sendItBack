const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;

require("dotenv").config();

const loginRoutes = require('./api/routes/login');
const registerRoutes = require('./api/routes/register');
const ordersRoutes = require('./api/routes/ordersRoute');
const userRoutes = require('./api/routes/user');

mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

mongoose.Promise = global.Promise;

//using middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());



app.use('/user', registerRoutes);
app.use('/user', loginRoutes);
app.use('/order', ordersRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

app.get("/", (req, res) => {
    res.send("app is running")
  })

app.listen(PORT, () => {
    console.log('now listening to port' +PORT);
});