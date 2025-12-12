const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');

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
    try {
        // Hvis du senere kobler til Task-model her:
        // const todayTasks = ...
        // const weekTasks = ...

        res.render('dashboard.html', {
            title: "Dashboard",
            user: req.user,
            todayTasks: [],
            weekTasks: []
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading dashboard");
    }
});

module.exports = router;
