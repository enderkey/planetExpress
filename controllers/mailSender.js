const winston = require('winston');
const sgMail = require('@sendgrid/mail')

const sendForm = (req, res) => {

  sgMail.setApiKey(CONFIG.sendGridApiKey)
  var msg = {
    to      : CONFIG.emailTo, 
    from    : CONFIG.emailFrom,
    subject : CONFIG.subject
  }

  winston.info("mailSender | sendForm | body : " , JSON.stringify(req.body));

  sgMail.send({
    ...msg,
    html: `<html>    
            <body style="padding: 9em 0; font-family: 'Roboto', sans-serif;
            background-color: #f9f9f9;
            display: flex;
            color: #737f8d">
                <div style=" margin-top: 3em; margin-bottom: 3em; background-color: #FFF;
                margin: auto;
                padding: 1em 3em 1em 3em;">
                    <h4 style="margin-bottom: .5em;">Hello, ${CONFIG.userName}!</h4>
                    <p>You have a new message from <a href="${CONFIG.website}">tu sitio web</a>.</p>
                    <div style=" margin-top: 1.5em;">
                      ${(Object.entries(req.body).map(element => { return `<p><strong>${element[0]}: </strong> ${element[1]}</p>` })).join(" ")}
                    </div>
                </div>
            </body>
            
          </html>`
  }).then(() => {
    winston.info('mailSender | sendForm | Email sent');
    res.writeHead(301,
      {Location: CONFIG.redirectURL}
    );
    res.end()
  })
  .catch((error) => {
    winston.error('mailSender | sendForm | error sending mail ', JSON.stringify(error,null,1))
    res.status(500).send(`Error sending mail`);
  })

}

module.exports = {
  sendForm
}