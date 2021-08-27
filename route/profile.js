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

router.post('/deletephoto', async (req, res) => {
  console.log(req.params.id)
  const user = await User.findOne(req.user._id)

  try {
    if (user) {
      user.avatarUrl = undefined
      await user.save()
      console.log('deleted')
      res.redirect('/profile')
    } else {
      console.log('nahui')
      res.redirect('/profile')
    }
  } catch (err) {
    console.log(color.bgRed.black(err))

  }
})

router.post('/deleteuser', async (req, res) => {
  try {
    if (req.user._id) {
      await User.findByIdAndDelete(req.user._id)
      res.redirect('/')
    } else {
      res.redirect('profile')
    }
  } catch (err) {
    console.log(color.bgRed.black(err))
  }
})

module.exports = router;