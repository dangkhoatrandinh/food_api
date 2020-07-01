const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    vendorId: {
        type:mongoose.Types.ObjectId,
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;