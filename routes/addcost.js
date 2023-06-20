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


        //check that category exists
        if (!categories.includes(category)) {
            const err = {"error":"The cost should belong to an existing category."};
            return res.status(400).json(err);
        }


        //check that user exists
        const userExist = await user.findOne({ id: user_id });
            if (!userExist) {
                const err = {"error":"The user could not be located."};
                return res.status(400).json(err);
            };


        let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            monthLength[1] = 29;
        } else {
            monthLength[1] = 28;
        }


        if ((parseInt(day) != day || day < 1 || day > monthLength[parseInt(month)]) && day) {
            const err = {"error":"The day is invalid."};
            return res.status(400).json(err);
        }

        //check that month is valid
        if ((parseInt(month) != month || month < 1 || month > 12) && month) {
            const err = {"error":"The month is invalid."};
            return res.status(400).json(err);
        }

        //check that year is valid
        if ((parseInt(year) != year) && year) {
            const err = {"error":"The year is invalid."};
            return res.status(400).json(err);
        }

        //check that date is not in the future
        const date = new Date();
        let assignedYear = year;
        let assignedMonth = month;
        let assignedDay = day;

        if (year > date.getFullYear()) {
            assignedYear = date.getFullYear();
            assignedMonth = date.getMonth() + 1;
            assignedDay = date.getDate();
        } else if (month > date.getMonth() + 1) {
            assignedYear = date.getFullYear();
            assignedMonth = date.getMonth() + 1;
            assignedDay = date.getDate();
        } else if (day > date.getDate()) {
            assignedYear = date.getFullYear();
            assignedMonth = date.getMonth() + 1;
            assignedDay = date.getDate();
        }

        //check that sum is valid
        if (isNaN(sum) || sum < 0) {
            const err = {"error":"The sum is invalid."};
            return res.status(400).json(err);
        }

        //add the new cost document to costs collection
        const newCostItem = new cost({
            user_id: user_id,
            day: assignedDay,
            month: assignedMonth,
            year: assignedYear,
            description: description,
            category: category,
            sum: sum
        });

        newCostItem.save().then(function(x){
            return res.json(x.toObject({
                versionKey: false, transform: function(doc, ret){
                    delete ret._id;
                }
            }))
        }
        ).catch(function(error){
            const err = {error: error.message};
            return res.status(400).json(err);
        });

        

        //check if report exists (by user_id, month, year)
        report.findOne({ user_id: newCostItem.user_id, month: newCostItem.month, year: newCostItem.year })
            .then(function(foundReport) {
                if (foundReport) {
                    ////if yes, add relevant details from the new cost to it, under the relevant category
                    foundReport.categories[newCostItem.category].push({
                        day: newCostItem.day,
                        description: newCostItem.description,
                        sum: newCostItem.sum
                    });

                    report.updateOne({
                        user_id: user_id,
                        year: assignedYear,
                        month: assignedMonth
                    }, { categories: foundReport.categories }).then(function(){}).catch(function() {});
                }

            });

    });

module.exports = app;