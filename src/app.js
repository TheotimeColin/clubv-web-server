const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient;

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const url = 'mongodb+srv://Nerloggz:nerlozyss622@clubv-dev-hwg8b.mongodb.net/test?retryWrites=true';
const dbName = 'test';

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  client.close();
});

app.get('/posts', (req, res) => {
  res.send([])
})

app.listen(process.env.PORT || 8081)