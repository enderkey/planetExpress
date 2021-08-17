const mailSenderController = require('../controllers/mailSender');

// Router
const router = app => {
  app.post('/sendForm', (req, res) => {
    mailSenderController.sendForm(req, res);
  });
}

// Export the router
module.exports = router;