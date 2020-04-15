const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cuisineSchema = new Schema({

            title: { type: String, required:true },
            recipe: { type: String, required: true },
            image: { type: String, required: true },
            url_video: { type: String, required: true },
            creator : { type: String, required: true }
})

module.exports =mongoose.model('Cuisine', cuisineSchema);