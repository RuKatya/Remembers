import { Router } from 'express';
import color from 'colors'
const router = Router();

import { hendleIndexPage } from '../controllers/indexController'

router
    .get('/', hendleIndexPage)

module.exports = router;