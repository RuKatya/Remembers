const { Router } = require('express')
const router = Router()
const color = require('colors')

//Models
const User = require('../models/user')
const Remembr = require('../models/remembers')

//Middleware
const auth = require('../middleware/auth')

function mapTasksItems(tasks) {
    return tasks.items.map(c => ({
        ...c.remembrId._doc,
        id: c.remembrId.id,
    }))
}

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id)

    const usertask = await req.user
        .populate('tasks.items.remembrId')
        .execPopulate()

    const tasks = mapTasksItems(usertask.tasks)

    res.render('remembers', {
        user,
        tasks
    })
})

router.post('/addremembr', auth, async (req, res) => {
    console.log(req.body)
    console.log(req.user)

    const remembr = new Remembr({
        text: req.body.remembr,
        userId: req.user
    });

    try {
        await remembr.save();
        await req.user.addTask(remembr)
        res.redirect('/remembers')
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
})

router.delete('/remove/:id', auth, async (req, res) => {
    console.log('remove?')
    await req.user.removeTask(req.params.id)

    const usertask = await req.user
        .populate('tasks.items.remembrId')
        .execPopulate()

    const tasks = mapTasksItems(usertask.tasks)

    res.status(200).json(tasks)
})


module.exports = router;