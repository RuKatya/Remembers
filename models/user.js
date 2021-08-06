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
                todo: {
                    type: Number,
                    require: true,
                    // default: 1
                },
                // done: {
                //     type: Schema.Types.ObjectId,
                //     ref: 'Cars',
                //     require: true
                // }
            }
        ]
    }
})

// UsersSchema.methods.addToCart = function (car) {
//     const items = [...this.cart.items]
//     const idx = items.findIndex(c => {
//         return c.carId.toString() === car._id.toString() //to compare same type
//     })

//     if (idx >= 0) {
//         items[idx].count = items[idx].count + 1
//     } else {
//         items.push({
//             carId: car._id,
//             count: 1
//         })
//     }

//     // const newCart = { items: items }
//     // this.cart = newCart;

//     this.cart = { items }

//     return this.save();
// }

// UsersSchema.methods.removeFromCart = function (id) {
//     console.log('remove?')
//     let items = [...this.cart.items]
//     const idx = items.findIndex(c => {
//         return c.carId.toString() === id.toString()
//     })

//     if (items[idx].count === 1) {
//         items = items.filter(c => c.carId.toString() !== id.toString())
//     } else {
//         items[idx].count--
//     }

//     this.cart = { items }
//     return this.save()
// }

// UsersSchema.methods.clearCart = function () {
//     this.cart = { items: [] }
//     return this.save()
// }

module.exports = model('User', UserSchema)