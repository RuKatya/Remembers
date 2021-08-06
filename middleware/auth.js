module.exports = function (req, res, next) {
    if (!req.session.isAuthenticates) {
        return res.redirect('/auth/login')
    }

    next()
}