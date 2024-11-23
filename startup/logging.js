const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){

// winston exception handler
winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(new winston.transports.MongoDB({
        db: `mongodb+srv://shahzadsaldri:${process.env.PASSWORD}@cluster0.mpzcf.mongodb.net/vidly?retryWrites=true&w=majority&appName=Cluster0`,
        options: { useUnifiedTopology: true },
        level: 'info',
    }));

}