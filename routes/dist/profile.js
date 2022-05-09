"use strict";
exports.__esModule = true;
var Router = require('express').Router;
var router = Router();
var profileController_1 = require("../controllers/profileController");
var auth = require('../middleware/auth');
router
    .get('/', auth, profileController_1.handleGetProfileInfo)
    .post('/', profileController_1.handleChangeNameAndPhoto)
    .post('/deletephoto', profileController_1.handleDeletePhoto)
    .get('/aresure', profileController_1.handleSureDeleteUser)
    // .post('/deleteuser', handleDeleteUser)
    .get('/deleteuser', profileController_1.handleDeleteUser);
module.exports = router;
