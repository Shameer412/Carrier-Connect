const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Email from environment variable
        pass: process.env.EMAIL_PASS  // Password from environment variable
    }
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // From address
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};

module.exports = sendMail;
