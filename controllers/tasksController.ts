import color from 'colors';
import User from '../models/user';
import Remembr from '../models/remembers';

function mapTasksItems(tasks) {
    return tasks.items.map(c => ({
        ...c.remembrId._doc,
        id: c.remembrId.id,
    }))
}

function isOwner(task, req) {
    return task.userId.toString() === req.user._id.toString();
}

export const handleGetAllTasks = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        const usertask = await req.user
            .populate('tasks.items.remembrId')

        const tasks = mapTasksItems(usertask.tasks)

        res.render('remembers', {
            title: 'Tasks',
            user,
            tasks
        })
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
}

export const handleAddTask = async (req, res) => {
    console.log(req.body)
    console.log(req.user)

    const remembr = new Remembr({
        text: req.body.remembr,
        title: req.body.title,
        date: req.body.date,
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
}

export const handleEditTaskByID = async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    try {
        const remembr = await Remembr.findById(req.params.id)
        if (isOwner(remembr, req)) {
            return res.render('edit-remembers', {
                title: `Edit task`,
                remembr
            })
        }
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
}

export const handleEdit = async (req, res) => {
    try {
        console.log(req.body)
        const { id } = req.body

        // if (Object.keys(req.body.title).length == 0 && Object.keys(req.body.text).length == 0) { //if title or text is empty, try to get it from DB
        //     const task = await Remembr.findById(id)
        //     console.log(task)
        //     if (task) {
        //         const userTitle = task.title
        //         const userText = task.text
        //         await Remembr.findByIdAndUpdate(id, { title: userTitle, text: userText, date: req.body.date })
        //         res.redirect('/remembers')
        //     }
        // } else || Object.keys(req.body.text).length == 0
        if (Object.keys(req.body.title).length == 0) {
            const task = await Remembr.findById(id)
            console.log(task)
            if (Object.keys(req.body.title).length == 0) {
                console.log(`title empty`)
                const userTitle = task.title
                await Remembr.findByIdAndUpdate(id, { title: userTitle, text: req.body.text, date: req.body.date })
                res.redirect('/remembers')
            }
            // else if (Object.keys(req.body.text).length == 0) {
            //     console.log(`text empty`)
            //     const userText = task.text
            //     await Remembr.findByIdAndUpdate(id, { title: req.body.title, text: userText, date: req.body.date })
            //     res.redirect('/remembers')
            // }
        } else {
            await Remembr.findByIdAndUpdate(id, req.body) //id of remember & where update
            res.redirect('/remembers')
        }
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
}

export const handleDeleteTask = async (req, res) => {
    console.log('remove?')

    await req.user.removeTask(req.params.id) //remove task from user
    await Remembr.findByIdAndDelete(req.params.id)

    try {
        const usertask = await req.user
            .populate('tasks.items.remembrId')

        const tasks = mapTasksItems(usertask.tasks)

        res.status(200).json(tasks)
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
}