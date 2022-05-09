"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const csurf_1 = __importDefault(require("csurf"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const colors_1 = __importDefault(require("colors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const compression_1 = __importDefault(require("compression"));
const keys_1 = __importDefault(require("./keys"));
const MongoStore = connect_mongodb_session_1.default(express_session_1.default);
const app = express_1.default(); //express
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 6565; //connect to port 6565
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const errorMiddleware = require('./middleware/error');
const fileMiddleware = require('./middleware/file');
//EJS
app.set('view engine', 'ejs'); //connecting ejs
console.log(app.get('view engine'));
app.set('views', path_1.default.resolve(__dirname, 'pages'));
app.use(body_parser_1.default.urlencoded({ extended: false })); //bodyParser
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public'))); //static
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images'))); //static
const store = new MongoStore({
    collection: 'sessions',
    uri: keys_1.default.MONGODB_URI
});
app.use(express_session_1.default({
    secret: keys_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(fileMiddleware.single('avatar')); //files - imgs - multer
//Middleware
app.use(csurf_1.default());
app.use(connect_flash_1.default());
app.use(compression_1.default());
app.use(varMiddleware);
app.use(userMiddleware);
//Connecting to data
start();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(keys_1.default.MONGODB_URI, () => {
                console.log(colors_1.default.bgGreen.black(`DATA CONNECTED`));
            });
        }
        catch (err) {
            console.log(colors_1.default.bgRed.white(err));
        }
    });
}
//ROUTER
const index = require('./routes/index');
const login = require('./routes/login');
const tasks = require('./routes/tasks');
const profile = require('./routes/profile');
app.use('/', index);
app.use('/auth', login);
app.use('/remembers', tasks);
app.use('/profile', profile);
app.use(errorMiddleware); //page 404
try {
    app.listen(PORT, () => {
        console.log(colors_1.default.bgBlue.black(`Server listen on http://localhost:${PORT}`));
    });
}
catch (err) {
    console.log(colors_1.default.bgRed.black(err));
}
