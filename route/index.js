//Express
const { Router } = require('express')
const router = Router()

//User
const User = require('../models/user')

router.get('/', async (req, res) => {
    res.render('index')
})

module.exports = router;