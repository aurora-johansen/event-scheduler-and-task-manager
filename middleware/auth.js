exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        // Passport legger til req.isAuthenticated()
        return next();
    }
    return res.status(401).json({ message: "You must be logged in to access this resource." });

};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.status(403).json({ message: "You are already logged in." });
};