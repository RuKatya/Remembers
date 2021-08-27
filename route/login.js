//Express
const { Router } = require('express')
const router = Router()

//User
const User = require('../models/user')

//Bcrypt
const bcrypt = require('bcryptjs')

//Colors
const color = require('colors')

//keys
const keys = require('../keys')

//nodemailer
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const regEmail = require('../emails/registration')
const resetEmail = require('../emails/reset')

//crypto
const crypto = require('crypto')

//express-validator
const { validationResult } = require('express-validator')
const { registerValidators, loginValidators } = require('../utils/validators')


const tranporter = nodemailer.createTransport(sendgrid({
    auth: { api_key: keys.SENDGRIP_API_KEY }
}))

router.get('/regsucsses', async (req, res) => {
    res.render('bye', {
        title: "Deleted"
    }
    )
})

router.post('/login', loginValidators, async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email })

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('loginError', errors.array()[0].msg)
            return res.status(422).redirect('/')
        }

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)

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
                req.flash('loginError', 'Wrong password')
                res.redirect('/')
            }
        } else {
            req.flash('loginError', 'User not exist')
            res.redirect('/')
        }
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

router.post('/regist', registerValidators, async (req, res) => {
    try {
        const { email, password, repeat, name } = req.body
        const candidate = await User.findOne({ email })

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('registError', errors.array()[0].msg)
            return res.status(422).redirect('/')
        }

        if (candidate) {
            req.flash('registError', 'User exist')
            res.redirect('/')
        } else {
            const hashpassword = await bcrypt.hash(password, 10)
            const user = new User({
                email, name, password: hashpassword, tasks: { items: [] }
            })
            await user.save()
            await tranporter.sendMail(regEmail(email, name, password))
            console.log('reg')
            res.render('regsucsses', {
                title: "Success",
                user
            })

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

router.get('/reset', (req, res) => {
    try {
        res.render('reset', {
            title: "Forgot password",
            error: req.flash('error')
        })
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

router.get('/resetinfo', (req, res) => {
    try {
        res.render('resetInfo', {
            title: "Reset progress"
        })
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                req.flash('error', 'Something get wrong, try again letter please')
                return res.redirect('/auth/reset')
            }

            const token = buffer.toString('hex')
            const candidate = await User.findOne({ email: req.body.email })

            if (candidate) {
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() + 60 * 10 * 1000
                await candidate.save()
                await tranporter.sendMail(resetEmail(candidate.email, token))
                res.redirect('/auth/resetinfo')
            } else {
                req.flash('error', 'Email not exist')
                res.redirect('/auth/reset')
            }
        })
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

router.get('/password/:token', async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/')
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: { $gt: Date.now() }
        })

        if (!user) {
            return res.redirect('/')
        } else {
            res.render('password', {
                title: 'Create password',
                error: req.flash('error'),
                userId: user._id.toString(),
                token: req.params.token
            })
        }
    } catch (err) {
        console.log(color.bgRed.black(err))
    }

})

router.post('/password', async (req, res) => {

    try {
        const user = await User.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: { $gt: Date.now() }
        })
        console.log(user)

        if (user) {
            user.password = await bcrypt.hash(req.body.password, 10)
            user.resetToken = undefined
            user.resetTokenExp = undefined
            await user.save()
            res.redirect('/')
        } else {
            req.flash('loginError', 'Something get wrong, try again letter please')
            res.redirect('/')
        }
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

module.exports = router;