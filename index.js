const winston = require('winston');
const express = require('express');
const app = express();
const config = require('config');
require('dotenv').config()

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')(); // calling a function cause we are returning a function in db.js
require('./startup/config')();
require('./startup/validation')();

// Uncaught exception logging into mongodb & file
// process.on('uncaughtException',(ex)=>{
//         winston.error(ex.message, ex);
//         process.exit(1);
// });

// setTimeout(() => {
//         throw new Error('This is a test uncaught exception');
//     }, 1000);

// rejected promise handler
// process.on('unhandledRejection',(ex)=>{
//         winston.error(ex.message,ex);
//         process.exit(1);
// });

// const p = Promise.reject(new Error('Something failed miserably!'));
// p.then(()=> console.log('Done'));

if (!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;