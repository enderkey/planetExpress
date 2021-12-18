const codes = {
  200: {
    code: 200,
    message: 'Ok'
  },
  301: { 
    code: 301, 
    Location: process.env.redirectURL
  }
};


module.exports = {
  codes
}
