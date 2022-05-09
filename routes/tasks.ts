import { Router } from 'express';
const router = Router()

//Middleware
const auth = require('../middleware/auth')

import {
    handleGetAllTasks,
    handleAddTask,
    handleEditTaskByID,
    handleEdit,
    handleDeleteTask
} from '../controllers/tasksController'

//GET ALL TASKS
router
    .get('/', auth, handleGetAllTasks)
    .post('/addremembr', auth, handleAddTask)
    .get('/:id/edit', auth, handleEditTaskByID)
    .post('/edit', auth, handleEdit)
    .delete('/remove/:id', auth, handleDeleteTask)

module.exports = router;