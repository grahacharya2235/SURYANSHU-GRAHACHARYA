const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    location: String,
    capacity: Number,
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Event', eventSchema);