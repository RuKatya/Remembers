//EXPRESS
const express = require('express');
//BODYPARSER
var bodyParser = require('body-parser')
//PATH
const path = require('path')
//PORT
const PORT = process.env.PORT ?? 6565; //connect to port 6565
//MONGOOSE
const mongoose = require('mongoose')
//COLORS
const color = require('colors')
//SESSION
const session = require('express-session')
//MONGO-SESSION
const MongoStore = require('connect-mongodb-session')(session)
//MIDDLEWARE
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user')

const app = express(); //express
app.use(bodyParser.urlencoded({ extended: false })) //bodyParser
app.use(express.static(path.resolve(__dirname, 'public'))) //static

const dataPass = 'WO3sm2Hl7eXTMN0Y'; //mongoose
const MONGODB_URI = `mongodb+srv://KaKa:${dataPass}@cluster0.mfqlq.mongodb.net/house`;

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.use(session({ //session
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))

//Middleware
app.use(varMiddleware)
app.use(userMiddleware)

//EJS
app.set('view engine', 'ejs') //connecting ejs
console.log(app.get('view engine'))
app.set('views', path.resolve(__dirname, 'pages'))

//Connecting to data
start();

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useFindAndModify: false
        }, () => {
            console.log(color.bgGreen.black(`DATA CONNECTED`))
        })
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
}

//ROUTER
const index = require('./route/index')
const login = require('./route/login')
const remembers = require('./route/remembers')

app.use('/', index)
app.use('/auth', login)
app.use('/remembers', remembers)



try {
    app.listen(PORT, () => {
        console.log(color.bgBlue.black(`Server listen on`, color.bgBlue.white(`http://localhost:${PORT}`)))
    })
} catch (err) {
    console.log(color.bgRed.black(err))
}