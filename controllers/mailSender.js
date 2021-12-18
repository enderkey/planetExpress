const winston = require('winston');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const restStatus = require('./enum/restStatus.js');

const buildHtml = async ({ body }) => {
  
  const message = Object.entries(body).map(([title, value]) => `<p><strong>${title}: </strong> ${value}</p>`).join('');
  
  const params = {
    '__username__': process.env.username,
    '__website__' : process.env.website,
    '__message__' : message
  };

  let template = await fs.readFileSync('./templates/template.html', 'utf8');

  for( const [ key , value ] of Object.entries(params) ) {
    template = template.replace(key, value);
  }

  return template;
  
}

const sendForm = async ({ body }, res) => {

  try {
  
    sgMail.setApiKey(process.env.sendGridApiKey)
  
    winston.info("mailSender | sendForm | body : " , JSON.stringify(body));
    
    await sgMail.send({
      to      : process.env.emailTo, 
      from    : process.env.emailFrom,
      subject : process.env.subject,
      html    : await buildHtml({ body })
    });

    return restStatus.codes[301];
    
  } catch (error) {
    winston.error("mailSender | sendForm | Error caught! " , JSON.stringify(error,null,1));
    return restStatus.codes[500];
  }

}

module.exports = {
  sendForm
}
