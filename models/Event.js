const db = require('../config/db');

// Get all event for a user
async function getEventsByUserId(userId) {
    const [rows] = await db.query(
        'SELECT * FROM events WHERE user_id = ? ORDER BY start_time ASC',
        [userId]
    );
    return rows;
}

// Create a new event
async function createEvent(userId, data) {
    const { title, description, start_time, end_time } = data;
    const [result] = await db.query(
        `INSERT INTO events (user_id, title, description, start_time, end_time)
     VALUES (?, ?, ?, ?, ?)`,
        [userId, title, description, start_time, end_time]
    );
    return result.insertId;
}

// Update event
async function updateEvent(eventId, userId, data) {
    const { title, description, start_time, end_time } = data;
    const [result] = await db.query(
        `UPDATE events
     SET title=?, description=?, start_time=?, end_time=?
     WHERE id = ? AND user_id = ?`,
        [title, description, start_time, end_time, eventId, userId]
    );
    return result.affectedRows;
}

// Delete event
async function deleteEvent(eventId, userId) {
    const [result] = await db.query(
        `DELETE FROM events WHERE id = ? AND user_id = ?`,
        [eventId, userId]
    );
    return result.affectedRows;
}

module.exports = {
    getEventsByUserId,
    createEvent,
    updateEvent,
    deleteEvent
};
