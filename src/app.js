const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient;

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  client.close();
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

app.get('/posts', (req, res) => {
  res.send([])
})

app.listen(process.env.PORT || 8081)