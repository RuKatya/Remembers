"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handleDeleteTask = exports.handleEdit = exports.handleEditTaskByID = exports.handleAddTask = exports.handleGetAllTasks = void 0;
var colors_1 = require("colors");
var user_1 = require("../models/user");
var remembers_1 = require("../models/remembers");
function mapTasksItems(tasks) {
    return tasks.items.map(function (c) { return (__assign(__assign({}, c.remembrId._doc), { id: c.remembrId.id })); });
}
function isOwner(task, req) {
    return task.userId.toString() === req.user._id.toString();
}
exports.handleGetAllTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, usertask, tasks, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_1["default"].findById(req.user._id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, req.user
                        .populate('tasks.items.remembrId')];
            case 2:
                usertask = _a.sent();
                tasks = mapTasksItems(usertask.tasks);
                res.render('remembers', {
                    title: 'Tasks',
                    user: user,
                    tasks: tasks
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(colors_1["default"].bgRed.white(err_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleAddTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var remembr, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                console.log(req.user);
                remembr = new remembers_1["default"]({
                    text: req.body.remembr,
                    title: req.body.title,
                    date: req.body.date,
                    userId: req.user
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, remembr.save()];
            case 2:
                _a.sent();
                return [4 /*yield*/, req.user.addTask(remembr)];
            case 3:
                _a.sent();
                res.redirect('/remembers');
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                console.log(colors_1["default"].bgRed.white(err_2));
                res.redirect('/remembers');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.handleEditTaskByID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var remembr, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.query.allow) {
                    return [2 /*return*/, res.redirect('/')];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, remembers_1["default"].findById(req.params.id)];
            case 2:
                remembr = _a.sent();
                if (isOwner(remembr, req)) {
                    return [2 /*return*/, res.render('edit-remembers', {
                            title: "Edit task",
                            remembr: remembr
                        })];
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log(colors_1["default"].bgRed.white(err_3));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleEdit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task, userTitle, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                console.log(req.body);
                id = req.body.id;
                if (!(Object.keys(req.body.title).length == 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, remembers_1["default"].findById(id)];
            case 1:
                task = _a.sent();
                console.log(task);
                if (!(Object.keys(req.body.title).length == 0)) return [3 /*break*/, 3];
                console.log("title empty");
                userTitle = task.title;
                return [4 /*yield*/, remembers_1["default"].findByIdAndUpdate(id, { title: userTitle, text: req.body.text, date: req.body.date })];
            case 2:
                _a.sent();
                res.redirect('/remembers');
                _a.label = 3;
            case 3: return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, remembers_1["default"].findByIdAndUpdate(id, req.body)]; //id of remember & where update
            case 5:
                _a.sent(); //id of remember & where update
                res.redirect('/remembers');
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_4 = _a.sent();
                console.log(colors_1["default"].bgRed.white(err_4));
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.handleDeleteTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usertask, tasks, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('remove?');
                return [4 /*yield*/, req.user.removeTask(req.params.id)]; //remove task from user
            case 1:
                _a.sent(); //remove task from user
                return [4 /*yield*/, remembers_1["default"].findByIdAndDelete(req.params.id)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, req.user
                        .populate('tasks.items.remembrId')];
            case 4:
                usertask = _a.sent();
                tasks = mapTasksItems(usertask.tasks);
                res.status(200).json(tasks);
                return [3 /*break*/, 6];
            case 5:
                err_5 = _a.sent();
                console.log(colors_1["default"].bgRed.white(err_5));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
