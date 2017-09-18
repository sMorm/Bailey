// Node Modules
const express = require('express')
const bodyParser = require('body-parser')

// Configurations
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/.env`})
const PORT = process.env.PORT || '4000'

// Routes
const email = require('./routes/email')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})

app.use('/email', email)

app.get('/', (req, res) => { res.send('Home Route /')})

app.listen(PORT, () => {
  console.log(`Server Started port ${PORT}`)
})