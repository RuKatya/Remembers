//Express
const { Router } = require('express')
const router = Router()
const login = require('./login')

//Colors
const color = require('colors')

router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Authorization',
        isLogin: true,
        registError: req.flash('registError'),
        loginError: req.flash('loginError')
    })
})

module.exports = router;