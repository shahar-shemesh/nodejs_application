/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/

const express = require('express');
const user = require('../models/users');
const cost = require('../models/costs');
const report = require('../models/reports');
const app = express();

const categories = ["food", "health", "housing", "sport", "education", "transportation", "other"];

app.route("/")
    .post(async function (req, res) {

        const { user_id, day, month, year, description, category, sum } = req.body;


        // Validating the existence of the category.
        if (!categories.includes(category)) {
            return res.status(400).json({ "Error": "The cost should belong to an existing category." });
        }


        // Validating the existence of the user.
        const userExist = await user.findOne({ id: user_id });
        if (!userExist) {
            return res.status(400).json({ "Error": "The user could not be located." });
        };


        // Validating the date (leap year, future date).
        const inputDate = new Date(year + "-" + month + "-" + day);
        if (inputDate.getDate() != day || inputDate.getMonth() + 1 != month || inputDate.getFullYear() != year) {
            return res.status(400).json({ "Error": "The date is invalid." });
        }
        const currentDate = new Date();
        if (inputDate > currentDate) {
            return res.status(400).json({ "Error": "Entering a date beyond the current day is not permitted." });
        }


        //  Validating the sum.
        if (isNaN(sum) || Number(sum) <= 0) {
            return res.status(400).json({ "Error": "The sum is invalid." });
        }


        //  Include the new cost document in the costs collection.
        const newCostItem = new cost({
            user_id: user_id,
            day: day,
            month: month,
            year: year,
            description: description,
            category: category,
            sum: sum
        });

        // Save the new cost item.
        newCostItem.save()
            .then(function (newItem) {
                // Return the saved cost item without the "_id" field.
                return res.json(newItem.toObject(
                    {
                        versionKey: false,
                        transform: function (doc, ret) { delete ret._id }
                    }
                ));
            })
            // Return an error if there's an issue with saving the cost item.
            .catch(function (err) {
                return res.status(400).json({ "Error": err.message });
            });


        // Validating if there is an existing report for the specified user ID, year, and month.
        report.findOne({ user_id: user_id, month: month, year: year })
            .then(function (foundReport) {
                if (foundReport) {
                    // If a report is found, add the new cost to the corresponding category.
                    foundReport.categories[category].push({ day: day, description: description, sum: sum });
                    // Update the existing report with the modified categories.
                    report.updateOne({ user_id: user_id, month: month, year: year }, { categories: foundReport.categories }).catch();
                }
            });
    });


module.exports = app;
