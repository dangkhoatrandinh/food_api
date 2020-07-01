const mongoose = require('mongoose');
const VendorSchema = new mongoose.Schema({
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

const Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor;