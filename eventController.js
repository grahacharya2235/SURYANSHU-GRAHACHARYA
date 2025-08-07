const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const { name, date, location, capacity } = req.body;
        const event = new Event({ name, date, location, capacity });
        await event.save();
        } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
};

exports.getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};