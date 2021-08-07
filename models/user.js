const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: String,
    password: {
        type: String,
        require: true
    },
    tasks: {
        items: [
            {
                remembrId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Remembr',
                    require: true
                }
            }
        ]
    }
})

UserSchema.methods.addTask = function (remembr) {
    const items = [...this.tasks.items]
    // const idx = items.findIndex(c => {
    //     return c.remembrId
    // })

    try {
        items.push({
            remembrId: remembr._id
        })
    } catch (err) {
        console.log(err)
    }

    this.tasks = { items }

    return this.save();
}

UserSchema.methods.removeTask = function (id) {
    console.log('remove?')
    let items = [...this.tasks.items]

    items = items.filter(c => c.remembrId.toString() !== id.toString())

    this.tasks = { items }

    return this.save();
}

module.exports = model('User', UserSchema)