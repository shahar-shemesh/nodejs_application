/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/

const mongoose = require('mongoose');

// Define the report schema using the mongoose.Schema class
const reportSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, max: new Date().getFullYear(), required: true },
    categories: { type: JSON, default:
        {
            food: [],
            health: [],
            housing: [],
            sport: [],
            education: [],
            transportation: [],
            other: []
        }
    }
});

// Create a Mongoose model named "report" based on the reportSchema
const report = mongoose.model("report", reportSchema);

// Export the "report" model
module.exports = report;