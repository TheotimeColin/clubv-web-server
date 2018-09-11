const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const connection = mysql.createConnection({
  host: 'theotimester.mysql.db',
  user: 'theotimester',
  password: 'Nerlozyss622',
  database: 'theotimester'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

app.get('/posts', (req, res) => {
  connection.query('SELECT * FROM vrp_user_identities LIMIT 300', function(err, results) {
    if (err) throw err
    res.send(results)
  })
})

app.listen(process.env.PORT || 8081)