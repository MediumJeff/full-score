const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDb = require('./config/db');
const port = process.env.PORT || 5000;
const{ errorHandler} = require('./middleware/errorMiddleware');

connectDb();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/students', require('./routes/studentRoutes'))
app.use('/api/instruments', require('./routes/instrumentRoutes'))
app.use('/api/calendar', require('./routes/calendarRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));
