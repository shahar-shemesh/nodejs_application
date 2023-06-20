/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, required: true },
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

const report = mongoose.model("report", reportSchema);

module.exports = report;