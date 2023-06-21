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

        //// Validating the existence of the user.
        const userExist = await user.findOne({ id: user_id });
        if (!userExist) {
            return res.status(400).json({ "Error": "The user could not be located." });
        };


        //// Validating the date.
        const inputDate = new Date(year + "-" + month);
        if (inputDate.getMonth() + 1 != month || inputDate.getFullYear() != year) {
            return res.status(400).json({ "Error": "The date is invalid." });
        }
        const currentDate = new Date();
        if (inputDate > currentDate) {
            return res.status(400).json({ "Error": "Entering a date beyond the current day is not permitted." });
        }

        
        // Finding a report matching the user ID, month, and year.
        report.findOne({ user_id: user_id, month: month, year: year })
            .then(function (foundReport) { // If the report is found, return its categories.
                return res.status(200).json(foundReport.categories);
            })
            
            .catch(function () { // If the report is not found, find costs matching the user ID, month, and year.
                cost.find({ user_id: user_id, month: month, year: year })
                    .then(function (foundCosts) {
                        const newReportItem = new report(
                            {
                                user_id: user_id,
                                month: month,
                                year: year
                            }
                        );
                        // Iterate through the found costs and add them to the corresponding category in the new report item.
                        foundCosts.forEach(function (currentCost) {
                            newReportItem.categories[currentCost.category].push(
                                {
                                    day: currentCost.day,
                                    description: currentCost.description,
                                    sum: currentCost.sum
                                }
                            );
                        });

                        // Save the new report item.
                        newReportItem.save()
                            .then(function (currReport) {
                                return res.status(200).json(currReport.categories);
                            });
                    })

                    // Return an error if there's an issue with finding costs or saving the report item.
                    .catch(function (error) {
                        return res.status(500).json({ "Error": error.message });
                    });
            });
    });

module.exports = app;