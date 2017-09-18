// Node Modules
const express = require('express')
const nodemailer = require('nodemailer')
const iplocation = require('iplocation')

// Express Router
const router = express.Router()

const { 
  MAIL_ID,
  MAIL_CLIENT,
  MAIL_SECRET,
  MAIL_REFRESH,
  MAIL_TOKEN
} = process.env
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      type: 'OAuth2',
      user: MAIL_ID,
      clientId: MAIL_CLIENT,
      clientSecret: MAIL_SECRET,
      refreshToken: MAIL_REFRESH,
      accessToken: MAIL_TOKEN
  }
});

router.post('/', (req, res) => {
  const { name, address, subject, text } = req.body
  const mailOptions = {
      from: `${name} <${address}>`,
      to: process.env.MAIL_RECEIVER,
      subject: subject,
      html: `<html><body>${text}<br/></body></html>`
  }
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          res.send(error);
      }
      res.send(`Successfully sent mail`);
  })
})

router.get('/', (req, res) => {
  res.send('Email Route')
})

module.exports = router