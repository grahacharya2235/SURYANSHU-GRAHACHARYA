const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.bookEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.bookings.length >= event.capacity)
    return res.status(400).json({ message: 'Event is full' });

    const booking = await Booking.create({ user: req.user._id, event: event._id });
    event.bookings.push(req.user._id);
    await event.save();

    res.json(booking);
};

exports.cancelBooking = async (req, res) => {
    const booking = await Booking.findOneAndDelete({
    user: req.user._id,
    event: req.params.id,
    });

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const event = await Event.findById(req.params.id);
    event.bookings.pull(req.user._id);
    await event.save();

    res.json({ message: 'Booking cancelled' });
};