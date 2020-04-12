const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    gener: String,
    rate: Number,
    watched:Boolean,
    directorId: String
})

module.exports = new mongoose.model('Movie', movieSchema);