// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
        user: 'careerconnectnarowal@gmail.com',
        pass: 'User1234,'
    }
});

const sendApprovalEmail = (to, job) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: 'Job Approved',
        text: `Your job posting for ${job.position} has been approved.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = { sendApprovalEmail };
