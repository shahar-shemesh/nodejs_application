/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/

const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    day: { type: String, min: 1, max: 31, required: true },
    month: { type: String, min: 1, max: 12, required: true },
    year: { type: String, required: true },
    id: { type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId},
    description: { type: String, required: true },
    category: { type: String, required: true },
    sum: { type: Number, required: true}
});

const cost = mongoose.model("cost", costSchema);

module.exports = cost;