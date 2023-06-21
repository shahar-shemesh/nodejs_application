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

// Start the server on port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000");
});

module.exports = app;