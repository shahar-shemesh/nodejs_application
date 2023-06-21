/******  Developers:  ******
Shahar Shemesh, ID: 315049460
Liron Dahan, ID: 207382078
Tal Reguan, ID: 315095489
****************************/

const mongoose = require('mongoose');

// Define the user schema using the mongoose.Schema class
const userSchema = new mongoose.Schema({
    id: { type: String, required: true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: String, required: true }
});

// Create a Mongoose model named "user" based on the userSchema
const user = mongoose.model("users", userSchema);

// Export the "user" model
module.exports = user;