const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

const citizens = require('../api/citizens')
const register = require('../api/register')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb+srv://Nerloggz:nerlozyss622@clubv-dev-hwg8b.mongodb.net/test?retryWrites=true');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  
  app.post('/citizens', citizens)
  app.post('/register', register)
  
});

app.listen(process.env.PORT || 8081)