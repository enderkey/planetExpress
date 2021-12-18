// Require packages and set the port
const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const app = express();
const winston = require('winston');
require('dotenv').config();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

routes(app);


//
// Setup Winston logger
//
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: 'debug',
  colorize: true, timestamp: true, handleExceptions: false
});
winston.add(winston.transports.File, {
  level: 'debug',
  json: './logs.json', timestamp: true, filename: './logs.log',
  handleExceptions: false
});



// Start the server
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(server.address());
  winston.info(`Server listening on port ${server.address().port}`);
});