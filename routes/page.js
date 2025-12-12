const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');

router.get('/', (req, res) => {
    if (!req.user) {
        return res.render('home.html', {
            title: "Welcome"
        });
    }

    // If logged in:
    res.render('dashboard.html', {
        title: "Dashboard",
        user: req.user
    });
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login.html', { title: "Login" });
});

router.get('/register', isNotLoggedIn, (req, res) => {
    res.render('register.html', { title: "Register" });
});

module.exports = router;