const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');
const Task = require('../models/Task');

// HOME
router.get('/', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    return res.redirect('/login');
});

// LOGIN PAGE
router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login.html', { title: "Login" });
});

// REGISTER PAGE
router.get('/register', isNotLoggedIn, (req, res) => {
    res.render('register.html', { title: "Register" });
});

// DASHBOARD PAGE
router.get('/dashboard', isLoggedIn, async (req, res) => {
    function formatDate(date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    const todayStr = formatDate(new Date());

    try {
        const todayTasks = await Task.getTasksByUserIdAndDate(req.user.id, todayStr);

        res.render('dashboard.html', {
            title: "Dashboard",
            user: req.user,
            todayTasks
        });

    } catch (err) {
        console.error(err);
        res.render('dashboard.html', {
            title: "Dashboard",
            user: req.user,
            todayTasks: []
        });
    }
});

module.exports = router;
