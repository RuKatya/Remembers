"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1.Router();
//Middleware
var auth = require('../middleware/auth');
var tasksController_1 = require("../controllers/tasksController");
//GET ALL TASKS
router
    .get('/', auth, tasksController_1.handleGetAllTasks)
    .post('/addremembr', auth, tasksController_1.handleAddTask)
    .get('/:id/edit', auth, tasksController_1.handleEditTaskByID)
    .post('/edit', auth, tasksController_1.handleEdit)["delete"]('/remove/:id', auth, tasksController_1.handleDeleteTask);
module.exports = router;
