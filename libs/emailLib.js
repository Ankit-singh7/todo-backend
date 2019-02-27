'use strict';

const nodemailer = require('nodemailer');


let sendEmail = (sendEmailOptions) => {

    

    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user:'Ankit.as2307@gmail.com', 
            pass: 'Your Password'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: ' Ankit.as2307@gmail.com', // sender address
        to: sendEmailOptions.email, // list of receivers
        subject: sendEmailOptions.subject, // Subject line
        text: `Dear ${sendEmailOptions.name},
               Welcome to our Trego.
        `, // plain text body
        html: sendEmailOptions.html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else{
            console.log('Message successfully sent.', info);
            
        }
       
    });

}

module.exports = {
    sendEmail: sendEmail
  }
