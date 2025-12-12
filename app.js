require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const session = require('express-session');
const passport = require('passport');

const authRouter = require('./routes/auth');
const pageRouter = require('./routes/page');
const eventsRouter = require('./routes/events');

const app = express();
const nunjucks = require('nunjucks');

app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});

const pool = require('./config/db');

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'yourSecretKey',
        resave: false,
        saveUninitialized: false
    })
);

require('./passport/localStrategy')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/', pageRouter);
app.use('/events', eventsRouter);

app.get('/', (req, res) => {
    res.send('Event Scheduler: server is running');
});

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

pool.getConnection()
    .then(() => console.log("Connected to MySQL database!"))
    .catch((err => console.error("Database connection failed:", err)));

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`);
});