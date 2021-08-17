const winston = require('winston');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(CONFIG.sendGridApiKey)
const msg = {
  to      : CONFIG.emailTo, 
  from    : CONFIG.emailFrom,
  subject : CONFIG.subject
}

const sendForm = (req, res) => {

  winston.info("mailSender | sendForm | body : " , JSON.stringify(req.body));
  
  if(!(req.body && req.body.email && req.body.name && req.body.message)) {
    winston.error("mailSender | sendForm | Some value is empty! ", JSON.stringify(req.body,null,1));
    res.status(422).send("Some value is empty!");
    return;
  }

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
                    <h4 style="margin-bottom: .5em;">Hola Sebastian.</h4>
                    <p>Tienes un nuevo mensaje de <a href="www.sebastian-gutierrez.com">tu sitio web</a>.</p>
                    <div style=" margin-top: 1.5em;">
                      ${Object.entries(req.body).map(element => { return `<p><strong>${element[0]}: </strong> ${element[1]}</p>` })}
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