const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const Task = require('../models/Task');
const Course = require('../models/Course');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const [tasks, courses] = await Promise.all([
            Task.getTasksByUserId(req.user.id),
            Course.getCoursesByUserId(req.user.id)
        ]);
        res.render('tasks.html', { tasks, courses, user: req.user });
    } catch (err) {
        console.error(err);
        res.render('tasks.html', { tasks: [], courses: [], user: req.user });
    }
});

router.post('/', isLoggedIn, async (req, res) => {
    const { title, description, due_date, priority, course_id } = req.body;

    if (!title) {
        return res.redirect('/tasks');
    }

    try {
        const parsedPriority = Number(priority);
        const normalizedPriority =
            !parsedPriority || parsedPriority < 1 || parsedPriority > 3
                ? 2
                : parsedPriority;

        let normalizedCourseId = null;
        if (course_id) {
            const parsedCourseId = Number(course_id);
            const isOwned = await Course.isCourseOwnedByUser(parsedCourseId, req.user.id);
            if (isOwned) normalizedCourseId = parsedCourseId;
        }

        await Task.createTask(req.user.id, {
            title,
            description,
            due_date: due_date || null,
            priority: normalizedPriority,
            course_id: normalizedCourseId
        });

        res.redirect('/tasks');

    } catch (err) {
        console.error(err);
        res.redirect('/tasks');
    }
});

router.post('/:id/complete', isLoggedIn, async (req, res) => {
    const { id } = req.params;

    try {
        await Task.updateTaskStatus(id, req.user.id, 'done');
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.redirect('/tasks');
    }
});

module.exports = router;
