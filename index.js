const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const express = require('express');
const app = express();
require('dotenv').config()

mongoose.connect(`mongodb+srv://shahzadsaldri:${process.env.PASSWORD}@cluster0.mpzcf.mongodb.net/vidly?retryWrites=true&w=majority&appName=Cluster0`)
        .then(()=>console.log('Connected to MongoDB...'))
        .catch(err=>console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres',genres); // use the genres router for any routes that start with /api/genres
app.use('/api/customers',customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));