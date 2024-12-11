const winston = require('winston');
const mongoose=require('mongoose');

module.exports = function(){
    mongoose.connect(`mongodb+srv://shahzadsaldri:${process.env.PASSWORD}@cluster0.mpzcf.mongodb.net/vidly_tests?retryWrites=true&w=majority&appName=Cluster0`)
        .then(()=>winston.info('Connected to MongoDB...'));
}