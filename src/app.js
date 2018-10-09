const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

const UserFixtures = require('../fixtures/Users')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
mongoose.connect('mongodb+srv://Nerloggz:nerlozyss622@clubv-dev-hwg8b.mongodb.net/test?retryWrites=true');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  
  var userSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true
    },
    firstName: String,
    lastName: String,
    phone: String
  })
  
  var User = mongoose.model('User', userSchema)
  
  // User.deleteMany({}, () => console.log('deleted'))
  
  /*UserFixtures.forEach((user) => {
    console.log(user)
    var query = { id: user.id }
    User.findOneAndUpdate(query, user, { upsert: true }, (err, user) => {
      if (err) return console.error(err);
    })
  })*/
  
  app.post('/posts', (req, res) => {
    let options = Object.assign({
      search: {}, limit: 30, page: 0,
    }, req.body)
    
    let query = {
      firstName: new RegExp(options.search.firstName, 'i'),
      lastName: new RegExp(options.search.lastName, 'i')
    }
    
    let params = {
      sort: { id: -1 }
    }
    
    User.count(query, (err, count) => {
      let pages = Math.ceil(count / options.limit) - 1
      let offset = options.limit * options.page
      
      params = Object.assign({
        limit: options.limit,
        skip: offset
      }, params)
      
      console.log(params)
      
      User.find(query, null, params, (err, users) => {
        
        res.send({
          users: users,
          pages: pages,
          items: (pages * options.limit) - offset
        })
      })
    })
  })
  
});

app.listen(process.env.PORT || 8081)