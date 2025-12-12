const bcrypt = require('bcrypt');
const passport = require('passport');
const pool = require('../config/db');

// REGISTER
exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const [existing] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashed = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
            [email, hashed, name]
        );

        return res.json({ message: "User registered successfully!" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.status(400).json({ message: info.message }); }

        req.login(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/');
        });

    })(req, res, next);
};

// LOGOUT
exports.logout = async (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });

};