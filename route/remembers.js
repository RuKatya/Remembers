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

function isOwner(task, req) {
    return task.userId.toString() === req.user._id.toString();
}

//GET ALL TASKS
router.get('/', auth, async (req, res) => {
    try{ 
        const user = await User.findById(req.user._id)

        const usertask = await req.user
            .populate('tasks.items.remembrId')
            .execPopulate()
    
        const tasks = mapTasksItems(usertask.tasks)
    
        res.render('remembers', {
            title: 'Tasks',
            user,
            tasks
        })
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
})

//ADD TASK
router.post('/addremembr', auth, async (req, res) => {
    console.log(req.body)
    console.log(req.user)

    const remembr = new Remembr({
        text: req.body.remembr,
        userId: req.user, 
    });

    try {
        await remembr.save();
        await req.user.addTask(remembr)
        res.redirect('/remembers')
    } catch (err) {
        console.log(color.bgRed.white(err))
        res.redirect('/remembers')
    }
})

//EDIT TASK
router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    try {
        const remembr = await Remembr.findById(req.params.id)
        if (isOwner(remembr, req)) {
            return res.render('edit-remembers', {
                title: `Edit ${remembr.text}`,
                remembr
            })
        }
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
})

router.post('/edit', auth, async (req, res) => {
    try {
        if(req.body.done===false){

        }
        const { id } = req.body
        await Remembr.findByIdAndUpdate(id, req.body) //id of remember & where update
        res.redirect('/remembers')
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
})

//DELETE TASK
router.delete('/remove/:id', auth, async (req, res) => {
    console.log('remove?')

    await req.user.removeTask(req.params.id) //remove task from user
    await Remembr.findByIdAndDelete(req.params.id)

    try {
        const usertask = await req.user
        .populate('tasks.items.remembrId')
        .execPopulate()

    const tasks = mapTasksItems(usertask.tasks)

    res.status(200).json(tasks)
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
})

module.exports = router;