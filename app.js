/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/

const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');

const about = require('./routes/about');
const addcost = require('./routes/addcost');
const report = require('./routes/report');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/nodejs-finalDB', { useNewUrlParser: true }).then(function () {
    console.log("Connected to DB.");
}).catch(function(err) {
    console.log(err);
});

app.set('view engine');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/addcost', addcost);
app.use('/report', report);
app.use('/about', about);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
