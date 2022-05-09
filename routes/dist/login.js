"use strict";
exports.__esModule = true;
//Express
var express_1 = require("express");
var router = express_1.Router();
var _a = require('../utils/validators'), registerValidators = _a.registerValidators, loginValidators = _a.loginValidators, resetValidators = _a.resetValidators;
var loginController_1 = require("../controllers/loginController");
router
    .post('/login', loginValidators, loginController_1.handleLoginUser)
    .post('/regist', registerValidators, loginController_1.handleRegistration)
    // .get('/regist', handleRegistration)
    .get('/logout', loginController_1.handleLogOut)
    .get('/reset', loginController_1.handleResetPass)
    .get('/resetinfo', loginController_1.handleResetInfo)
    .post('/reset', resetValidators, loginController_1.handleResetCrypto)
    .get('/password/:token', loginController_1.handleGetToken)
    .post('/password', loginController_1.handleCreateNewPass);
module.exports = router;
