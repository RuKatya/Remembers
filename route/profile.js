const { Router } = require('express')
const router = Router()
const color = require('colors')

//Models
const User = require('../models/user')
const Remembr = require('../models/remembers')

//Middleware
const auth = require('../middleware/auth')

router.get('/', auth, (req, res)=> {
    res.render('profile', {
        title: `Youre profile`, 
        user: req.user.toObject()
    })
})

router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        
        console.log(req.body.name)
        
        const toChange = {
          name: req.body.name
        }
        
        console.log(req.file)

        if (req.file) {
          toChange.avatarUrl = req.file.path
        }
    
        Object.assign(user, toChange)
        await user.save()
        res.redirect('/profile')
      } catch (e) {
        console.log(e)
      }
})

module.exports = router;