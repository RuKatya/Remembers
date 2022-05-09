const { Router } = require('express')
const router = Router()

import {
  handleGetProfileInfo,
  handleChangeNameAndPhoto,
  handleDeletePhoto,
  handleSureDeleteUser,
  handleDeleteUser
} from '../controllers/profileController'

const auth = require('../middleware/auth')

router
  .get('/', auth, handleGetProfileInfo)
  .post('/', handleChangeNameAndPhoto)
  .post('/deletephoto', handleDeletePhoto)
  .get('/aresure', handleSureDeleteUser)
  // .post('/deleteuser', handleDeleteUser)
  .get('/deleteuser', handleDeleteUser)

module.exports = router;