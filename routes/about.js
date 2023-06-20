/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/


const express = require('express');
const app = express();

app.route("/")
    .get(function (req, res) {
        const developers = [
            {
                firstName: 'shahar',
                lastName: 'shemesh',
                id: '315049460',
                email: 'shahar@usa.com',
            },
            {
                firstName: 'liron',
                lastName: 'dahan',
                id: '207382078',
                email: 'liron.d28@gmail.com',
            },
            {
                firstName: 'tal',
                lastName: 'rajwan',
                id: '315095489',
                email: 'talrajtr@gmail.com',
            }
        ];
        res.send(developers);
    });

module.exports = app;
