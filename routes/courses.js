const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const Course = require('../models/Course');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const courses = await Course.getCoursesByUserId(req.user.id);
        res.render('courses.html', { courses, user: req.user });
    } catch (err) {
        console.error(err);
        res.render('courses.html', { courses: [], user: req.user });
    }
});

router.post('/', isLoggedIn, async (req, res) => {
    const { name, professor, day_of_week, start_time, end_time } = req.body;

    if (!name) {
        return res.redirect('/courses');
    }

    try {
        const parsedDay = Number(day_of_week);
        if (parsedDay < 0 || parsedDay > 6) {
            return res.redirect('/courses');
        }

        if (start_time && end_time && start_time > end_time) {
            return res.redirect('/courses');
        }

        await Course.createCourse(req.user.id, {
            name,
            professor,
            day_of_week: parsedDay,
            start_time: start_time || null,
            end_time: end_time || null
        });

        res.redirect('/courses');

    } catch (err) {
        console.error(err);
        res.redirect('/courses');
    }
});

module.exports = router;
