const pool = require('../config/db');
const Event = require('../models/Event');


// CREATE EVENT
exports.createEvent = async (req, res) => {
    const { title, description, start_time, end_time, is_public } = req.body;
    const userId = req.user.id;

    try {
        await Event.createEvent(userId, {
            title,
            description,
            start_time,
            end_time,
            is_public
        });

        return res.redirect('/events');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error creating event");
    }
};


// GET EVENTS FOR LOGGED-IN USER
exports.getUserEvents = async (req, res) => {
    const userId = req.user.id;

    function formatDate(date) {
        return new Date(date).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    try {
        const events = await Event.getEventsByUserId(userId);

        const formattedEvents = events.map(event => ({
            ...event,
            start_time: formatDate(event.start_time),
            end_time: formatDate(event.end_time)
        }));

        res.render('events.html', {
            title: "Your Events",
            user: req.user,
            events: formattedEvents
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading events");
    }
};


// DELETE EVENT
exports.deleteEvent = async (req, res) => {
    const eventId = req.params.id;

    try {
        await Event.deleteEvent(eventId, req.user.id);
        return res.redirect('/events');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error deleting event");
    }
};


// GET SINGLE EVENT FOR EDIT PAGE
exports.getEventById = async (req, res) => {
    const eventId = req.params.id;

    try {
        const records = await Event.getEventsByUserId(req.user.id);
        const event = records.find(e => e.id == eventId);

        if (!event) return res.status(404).send("Event not found");

        res.render('editEvent.html', {
            title: "Edit Event",
            user: req.user,
            event
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading event");
    }
};


// UPDATE EVENT
exports.updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { title, description, start_time, end_time, is_public } = req.body;

    try {
        await Event.updateEvent(eventId, req.user.id, {
            title,
            description,
            start_time,
            end_time,
            is_public
        });

        return res.redirect('/events');

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error updating event");
    }
};
