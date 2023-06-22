/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/

const express = require('express');
const mongoose = require('mongoose');
const about = require('./routes/about');
const addcost = require('./routes/addcost');
const report = require('./routes/report');
const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://nodejs-project:nodejs-project-hit@cluster0.fycjem3.mongodb.net/nodejs-finalDB', { useNewUrlParser: true }).then(function () {
    console.log("Connected to DB.");
}).catch(function(err) {
    console.log(err);
});

// Set the view engine for rendering views
app.set('view engine');

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Register the routes handler
app.use('/addcost', addcost);
app.use('/report', report);
app.use('/about', about);


module.exports = app;