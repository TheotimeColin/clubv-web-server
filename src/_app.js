const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient;
const mysql = require('mysql')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const UserEntity = require('../entities/User')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const sequelize = new Sequelize('fivem_1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  define: { timestamps: false },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('vrp_user_identities', UserEntity);

app.post('/posts', (req, res) => {
  let options = Object.assign({
    search: {}, limit: 30, page: 0,
  }, req.body)
  
  let params = {
    order: [ ['user_id', 'DESC'] ],
    where: {
      firstname: { [Op.like]: options.search.firstname ? '%' + options.search.firstname + '%' : '%%' },
      name: { [Op.like]: options.search.lastname ? '%' + options.search.lastname + '%' : '%%' }
    }
  }
  
  User.findAndCountAll(params).then(data => {
    let pages = Math.ceil(data.count / options.limit) - 1
    let offset = options.limit * options.page
    
    params = Object.assign({
      limit: options.limit,
      offset: offset
    }, params)

    User.findAll(params).then(users => {
      res.send({
        users: users,
        pages: pages,
        items: (pages * options.limit) - offset
      })
    })
  })
})

app.listen(process.env.PORT || 8081)