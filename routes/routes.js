const mailSenderController = require('../controllers/mailSender');

// Router
const router = app => {
  app.post('/sendForm', async (req, res) => {

    const { code , ...response } = await mailSenderController.sendForm(req);

    if( code === 301 ) {
      return res.redirect(response.Location);
    }
    
    return res.status(code).json(response);

  });
}

// Export the router
module.exports = router;