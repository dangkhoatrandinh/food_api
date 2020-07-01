const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;