const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const dotenv = require('dotenv');


const connectDB = require('./config/db');

//load  congfig
dotenv.config({ path: './config/config.env'});

connectDB();
//routes
app.use('/', require('./routes/index'));



app.listen(3000);