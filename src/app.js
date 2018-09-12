const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient;
const mysql = require('mysql')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

/*const url = 'mongodb+srv://Nerloggz:nerlozyss622@clubv-dev-hwg8b.mongodb.net/test?retryWrites=true';
const dbName = 'test';

MongoClient.connect(url, function(err, client) {
  if (!client) console.log(err)
  
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  client.close();
});*/

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fivem_1'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

app.get('/posts', (req, res) => {
  let search = req.query.search ? req.query.search : ''
  
  connection.query(`SELECT * FROM vrp_user_identities WHERE firstname LIKE '%${search}%' OR name LIKE '%${search}%' OR user_id LIKE '%${search}%' ORDER BY user_id DESC LIMIT 300`, function(err, results) {
    if (err) throw err
    res.send(results)
  })
})

app.listen(process.env.PORT || 8081)