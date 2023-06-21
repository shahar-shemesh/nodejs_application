/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/

const express = require('express');
const cost = require('../models/costs');
const report = require('../models/reports');
const user = require('../models/users');

const app = express();


app.route("/")
    .get(async function (req, res) {
        
        const { user_id, month, year } = req.query;

        //check that user exists
        const userExist = await user.findOne({ id: user_id });
        if (!userExist) {
            const err = {"error":"The user could not be located."};
            return res.status(400).json(err);
        };

        if (month < 1 || month > 12){ return res.status(400).json({error: "The month is invalid."}) }


        report.findOne({ user_id: user_id, month: month, year: year })
            .then(function (foundReport) {
                return res.status(200).json(foundReport.categories);
            })

            .catch(function () { 
                cost.find({ user_id: user_id, month: month, year: year })
                    .then(function(foundCosts) {
                        const newReportItem = new report({
                            user_id: user_id,
                            month: month,
                            year: year
                        });

                        foundCosts.forEach(function(currentCost) {
                            newReportItem.categories[currentCost.category].push(
                                {
                                    day: currentCost.day,
                                    description: currentCost.description,
                                    sum: currentCost.sum
                                }
                            );
                        });

                        newReportItem.save()
                            .then(function(currReport) {
                                return res.status(200).json(currReport.categories);   
                            })
                            .catch(function (err) {
                            
                            });
                    })
                    .catch(function (err) {
                        return res.status(200).json(err);
                    });
            });


        
    });

module.exports = app;