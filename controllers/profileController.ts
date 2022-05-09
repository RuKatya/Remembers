import color from 'colors';
import User from '../models/user';
import Remembr from '../models/remembers';

export const handleGetProfileInfo = (req, res) => {
    try {
        res.render('profile', {
            title: `Your profile`,
            user: req.user.toObject()
        })
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
}

export const handleChangeNameAndPhoto = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        const toChange: any = {
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
}

export const handleDeletePhoto = async (req, res) => {
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
}

export const handleSureDeleteUser = async (req, res) => {
    const user = await User.findOne(req.user._id)

    res.render('aresure', {
        title: "Delete user",
        user
    })
}

export const handleDeleteUser = async (req, res) => {
    res.render('bye', {
        title: "Deleted"
    })
    // try {
    //     console.log(req.body)
    //     if (req.user._id) {
    //         const deleteTaskId = []
    //         try {

    //             const user = await User.findById(req.user._id)

    //             if (user) {
    //                 const tasks = user.tasks.items

    //                 for (let i = 0; i < tasks.length; i++) {
    //                     console.log(user.tasks.items[i].remembrId._id)
    //                     deleteTaskId.push(user.tasks.items[i].remembrId._id)
    //                 }

    //                 console.log(deleteTaskId)

    //                 const deletedTasks = await Remembr.deleteMany({ "_id": { $in: deleteTaskId } })

    //                 console.log(deletedTasks)

    //                 if (deletedTasks.acknowledged == true) {
    //                     console.log('delelted')
    //                     await User.findByIdAndDelete(req.user._id)

    //                     res.render('bye', {
    //                         title: "Deleted"
    //                     })
    //                 }
    //             }

    //         } catch (err) {
    //             console.log(color.bgRed.black(err))
    //         }
    //     } else {
    //         res.redirect('profile')
    //     }
    // } catch (err) {
    //     console.log(color.bgRed.black(err))
    // }
}