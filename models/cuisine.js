const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cuisineSchema = new Schema({

            title: { type: String, required:true },
            recipe: { type: String, required: true },
            image: { type: String, required: true },
            ingredients: { type: String, required: true },
            creator : { type: mongoose.Types.ObjectId, required: true, ref:'Chef' }
})

module.exports =mongoose.model('Cuisine', cuisineSchema);