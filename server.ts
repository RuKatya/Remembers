import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import csrf from 'csurf';
import flash from 'connect-flash';
import color from 'colors';
import session from 'express-session'
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import compression from 'compression'
import keys from './keys';
const MongoStore = connectMongoDBSession(session);
const app = express(); //express
const PORT = process.env.PORT ?? 6565; //connect to port 6565
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user')
const errorMiddleware = require('./middleware/error')
const fileMiddleware = require('./middleware/file')

//EJS
app.set('view engine', 'ejs') //connecting ejs
console.log(app.get('view engine'))
app.set('views', path.resolve(__dirname, 'pages'))

app.use(bodyParser.urlencoded({ extended: false })) //bodyParser
app.use(express.static(path.resolve(__dirname, 'public'))) //static
app.use('/images', express.static(path.join(__dirname, 'images')))//static

const store = new MongoStore({ //mongoose session
    collection: 'sessions',
    uri: keys.MONGODB_URI
})

app.use(session({ //express-session
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(fileMiddleware.single('avatar')) //files - imgs - multer

//Middleware
app.use(csrf())
app.use(flash())
app.use(compression())
app.use(varMiddleware)
app.use(userMiddleware)

//Connecting to data
start();

async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, () => {
            console.log(color.bgGreen.black(`DATA CONNECTED`))
        })
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
}

//ROUTER
const index = require('./routes/index')
const login = require('./routes/login')
const tasks = require('./routes/tasks')
const profile = require('./routes/profile')

app.use('/', index)
app.use('/auth', login)
app.use('/remembers', tasks)
app.use('/profile', profile)

app.use(errorMiddleware) //page 404

try {
    app.listen(PORT, () => {
        console.log(color.bgBlue.black(`Server listen on http://localhost:${PORT}`))
    })
} catch (err) {
    console.log(color.bgRed.black(err))
}