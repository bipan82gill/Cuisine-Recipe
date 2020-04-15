const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const chefSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength:6 },
    image: { type: String, required: true },
    cuisines: { type: String, required: true }
});

chefSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Chef', chefSchema);