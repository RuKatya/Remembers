"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1.Router();
var indexController_1 = require("../controllers/indexController");
router
    .get('/', indexController_1.hendleIndexPage);
module.exports = router;
