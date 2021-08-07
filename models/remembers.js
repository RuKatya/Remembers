const { Schema, model } = require('mongoose')

const Remembr = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Remembr', Remembr)