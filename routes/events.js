const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const {
    createEvent,
    getUserEvents,
    deleteEvent,
    getEventById,
    updateEvent
} = require('../controllers/eventController');

// Show all events
router.get('/', isLoggedIn, getUserEvents);

// Create event (form)
router.get('/new', isLoggedIn, (req, res) => {
    res.render('newEvent.html', { title: "Create Event", user: req.user });
});

// Create event (POST)
router.post('/create', isLoggedIn, createEvent);
// Delete event
router.post('/delete/:id', isLoggedIn, deleteEvent);

// Edit event page
router.get('/edit/:id', isLoggedIn, getEventById);

// Update event
router.post('/update/:id', isLoggedIn, updateEvent);

module.exports = router;