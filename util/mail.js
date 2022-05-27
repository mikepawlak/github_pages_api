/*Utility to send email from the message form on /contacts
Uses nodemailer and gmail credentials passed as arguments */
const mailer = require('nodemailer');

const auth = {
  user: process.argv[2],
  pass: process.argv[3],
  validated: (process.argv[2] && process.argv[3])
};

let transporter = mailer.createTransport({
  service: 'gmail',
  auth: auth
});
console.log(process.argv);

module.exports = (messageData) => {
  if (!auth.validated) {
    console.log(auth);
    throw ("ERROR: Mail credentials invalid or undefined");
  }
  //construct message text
  let messageText = `<strong>A Message from ${messageData.name} (${messageData.email})`;
  if (messageData.company.length > 0) messageText += ` with ${messageData.company}`;
  messageText += `</strong>\n
    <p><strong>Message</strong>: ${messageData.message.replace(/(<([^>]+)>)/ig,"")}
    <p><em><a href="mailto:${messageData.email}?subject=Re:${messageData.subject.replace(/ /g,"%20")}">Click to reply</a></em></p>
    `;


  const mailOptions =  {
    from: messageData.email,
    to: 'mpawlak719@gmail.com',
    subject: `Portfolio - ${messageData.subject}`,
    html: messageText
  };

  //promise chain like this feels super weird, may be a better way to do this
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions).then((succ) => {
      resolve(succ);
    }).catch((err) => {
      reject(err);
    });
  });
};
