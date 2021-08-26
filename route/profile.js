const { Router } = require('express')
const router = Router()
const color = require('colors')

//Models
const User = require('../models/user')
const Remembr = require('../models/remembers')

//Middleware
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
  try {
    res.render('profile', {
      title: `Your profile`,
      user: req.user.toObject()
    })
  } catch (err) {
    console.log(color.bgRed.black(err))
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const toChange = {
      name: req.body.name
    }

    if (req.file) {
      toChange.avatarUrl = req.file.path
    }

    Object.assign(user, toChange)
    await user.save()
    res.redirect('/profile')
  } catch (err) {
    console.log(color.bgRed.black(err))
  }
})

module.exports = router;