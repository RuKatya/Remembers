module.exports = function (req, res, next) {
    res.locals.isAuth = req.session.isAuthenticates
    res.locals.csrf = req.csrfToken();

    next();
}