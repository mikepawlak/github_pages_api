const express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    res.send(":D");
});


const contact = require('./routes/contact.js');
app.use('/contact', contact);

app.get('/not-found', (req, res) => {
  res.status(404);
  res.send('not-found');
});

app.listen(8000, () => {
  console.log("Listening on 8000");
});


module.exports = app;