//Express
import { Router } from 'express';
const router = Router()
const {
    registerValidators,
    loginValidators,
    resetValidators
} = require('../utils/validators')

import {
    handleLoginUser,
    handleRegistration,
    handleLogOut,
    handleResetPass,
    handleResetInfo,
    handleResetCrypto,
    handleGetToken,
    handleCreateNewPass
} from '../controllers/loginController'

router
    .post('/login', loginValidators, handleLoginUser)
    .post('/regist', registerValidators, handleRegistration)
    // .get('/regist', handleRegistration)
    .get('/logout', handleLogOut)
    .get('/reset', handleResetPass)
    .get('/resetinfo', handleResetInfo)
    .post('/reset', resetValidators, handleResetCrypto)
    .get('/password/:token', handleGetToken)
    .post('/password', handleCreateNewPass)

module.exports = router;