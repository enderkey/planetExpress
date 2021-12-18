const winston = require('winston');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const restStatus = require('./enum/restStatus.js');
const axios = require('axios');

const buildHtml = async ({ params }) => {
  
  const message = Object.entries(params).map(([title, value]) => `<p><strong>${title}: </strong> ${value}</p>`).join('');
  
  const data = {
    '__username__': process.env.USERNAME,
    '__website__' : process.env.WEBSITE,
    '__message__' : message
  };

  let template = await fs.readFileSync('./templates/template.html', 'utf8');

  for( const [ key , value ] of Object.entries(data) ) {
    template = template.replace(key, value);
  }

  return template;
  
}

const validRecatcha = async ({ recaptcha }) => {

  const { data : { success: isValid } } = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    `secret=${process.env.RECAPTCHA}&response=${recaptcha}`
  );

  if (!isValid) {
    throw restStatus.codes[401];
  }

}

const sendForm = async ( { body : { 'g-recaptcha-response' : recaptcha , ...params } }, res) => {

  try {
    
    await validRecatcha({ recaptcha });
  
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
  
    winston.info("mailSender | sendForm | params : " , JSON.stringify(params));
    
    await sgMail.send({
      to      : process.env.EMAIL_TO, 
      from    : process.env.EMAIL_FROM,
      subject : process.env.SUBJECT,
      html    : await buildHtml({ params })
    });

    return restStatus.codes[301];
    
  } catch (error) {
    winston.error("mailSender | sendForm | Error caught! " , JSON.stringify(error,null,1));
    
    if('code' in error) {
      return error;
    }

    return restStatus.codes[500];
  }

}

module.exports = {
  sendForm
}
