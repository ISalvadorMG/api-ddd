const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_PROVIDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;