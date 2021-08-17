// Require packages and set the port
const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const app = express();
const winston = require('winston');

CONFIG = {
  sendGridApiKey  : process.env.SENDGRID_API_KEY, // you can get your api key in https://sendgrid.com/
  emailFrom       : process.env.EMAIL_FROM,       // email with which you want to send the notification
  emailTo         : process.env.EMAIL_TO,         // email where you want to receive de the notification
  subject         : 'New message from your web',
  redirectURL     : process.env.REDIRECT_URL,     // url to redirect the user after submitting the form
  website         : process.env.WEBSITE,          // url of the site where the form is located
  userName        : process.env.USER_NAME         // your name
}

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