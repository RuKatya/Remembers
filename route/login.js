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

const tranporter = nodemailer.createTransport(sendgrid({
    auth: { api_key: keys.SENDGRIP_API_KEY }
}))

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email })

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

router.post('/regist', async (req, res) => {
    try {
        const { email, password, repeat, name } = req.body
        const candidate = await User.findOne({ email })

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