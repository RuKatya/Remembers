//Express
const { Router } = require('express')
const router = Router()

//User
const User = require('../models/user')

//Colors
const color = require('colors')

// function mapCartItems(tasks) {
//     return tasks.items.map(c => ({
//         ...c.carId._doc,
//         // id: c.carId.id,
//         // count: c.count
//     }))
// }

router.get('/', async (req, res) => {
    // const user = await User.find()
    res.render('remembers', {
        // user
    })
})

module.exports = router;