require('dotenv').config();

const codes = {
  200: {
    code: 200,
    message: 'Ok'
  },
  301: { 
    code: 301, 
    Location: process.env.REDIRECT_URL
  },
  500: {
    code: 500,
    message: 'Internal Server Error'
  },
  401: {
    code: 401,
    message: 'Unauthorized'
  },
};


module.exports = {
  codes
}
