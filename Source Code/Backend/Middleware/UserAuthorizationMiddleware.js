// Middleware/UserAuthorizationMiddleware.js

const userAuthorizationHandler = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(createError(401, "Unauthorized"));
        }
        next();
    };
};

module.exports = {
    userAuthorizationHandler,
};
