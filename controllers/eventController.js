const pool = require('../config/db');

// CREATE EVENT
exports.createEvent = async (req, res) => {
    const { title, description, start_time, end_time, is_public } = req.body;
    const userId = req.user.id;

    try {
        await pool.query(
            `INSERT INTO events (title, description, start_time, end_time, is_public, user_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                start_time,
                end_time,
                is_public ? 1 : 0,
                userId
            ]
        );

        return res.redirect('/events');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error creating event");
    }
};

// GET EVENTS FOR LOGGED-IN USER
exports.getUserEvents = async (req, res) => {
    function formatDate(date) {
        return new Date(date).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    const userId = req.user.id;

    try {
        const [events] = await pool.query(
            `SELECT * FROM events where user_id = ? ORDER BY start_time ASC`,
            [userId]
        );
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
        await pool.query("DELETE FROM events WHERE id = ?", [eventId]);
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
        const [rows] = await pool.query(
            "SELECT * FROM events WHERE id = ?",
            [eventId]
        );

        if (rows.length === 0) return res.status(404).send("Event not found");

        res.render('editEvent.html', {
            title: "Edit Event",
            user: req.user,
            event: rows[0]
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

        await pool.query(
            `UPDATE events
            SET title = ?, description = ?, start_time = ?, end_time = ?, is_public = ?
            WHERE id = ?`,
            [
                title,
                description,
                start_time,
                end_time,
                is_public ? 1 : 0,
                eventId
            ]
        );

        return res.redirect('/events');

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error updating event");
    }
};