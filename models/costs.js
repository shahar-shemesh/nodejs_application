/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/

const mongoose = require('mongoose');

// Define the cost schema using the mongoose.Schema class
const costSchema = new mongoose.Schema({
    id: { type: Number, default: () => Number(Date.now())},
    user_id: { type: String, required: true },
    day: { type: Number, min: 1, max: 31, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    sum: { type: Number, min: 1, required: true}
});

// Create a Mongoose model named "cost" based on the costSchema
const cost = mongoose.model("cost", costSchema);

// Export the "cost" model
module.exports = cost;