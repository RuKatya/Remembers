//Express
const { Router } = require('express')
const router = Router()

//User
const User = require('../models/user')

//Colors
const color = require('colors')

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            const areSame = password === candidate.password

            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticates = true

                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    console.log(`git in ${email}`)
                    res.redirect('/remembers')

                })
            } else {
                res.redirect('/')
            }
        } else {
            res.redirect('/')
        }
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

router.post('/regist', async (req, res) => {
    try {
        const { email, password, repeat, name } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            res.redirect('/')
        } else {
            const user = new User({
                email, name, password, tasks: { items: [] }
            })
            await user.save()
            console.log('reg')
            res.redirect('/')

        }
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy(() => {
            console.log('out')
            res.redirect('/')
        })
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

module.exports = router;