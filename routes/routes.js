const mailSenderController = require('../controllers/mailSender');

// Router
const router = app => {
  app.post('/sendForm', async (req, res) => {
    const status = await mailSenderController.sendForm(req);

    return res.status(status.code).json(status);

  });
}

// Export the router
module.exports = router;