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
exports.handleDeleteUser = exports.handleSureDeleteUser = exports.handleDeletePhoto = exports.handleChangeNameAndPhoto = exports.handleGetProfileInfo = void 0;
var colors_1 = require("colors");
var user_1 = require("../models/user");
exports.handleGetProfileInfo = function (req, res) {
    try {
        res.render('profile', {
            title: "Your profile",
            user: req.user.toObject()
        });
    }
    catch (err) {
        console.log(colors_1["default"].bgRed.black(err));
    }
};
exports.handleChangeNameAndPhoto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, toChange, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_1["default"].findById(req.user._id)];
            case 1:
                user = _a.sent();
                toChange = {
                    name: req.body.name
                };
                if (req.file) {
                    toChange.avatarUrl = req.file.path;
                }
                Object.assign(user, toChange);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.redirect('/profile');
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(colors_1["default"].bgRed.black(err_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleDeletePhoto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.params.id);
                return [4 /*yield*/, user_1["default"].findOne(req.user._id)];
            case 1:
                user = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 7]);
                if (!user) return [3 /*break*/, 4];
                user.avatarUrl = undefined;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                console.log('deleted');
                res.redirect('/profile');
                return [3 /*break*/, 5];
            case 4:
                console.log('nahui');
                res.redirect('/profile');
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                console.log(colors_1["default"].bgRed.black(err_2));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.handleSureDeleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1["default"].findOne(req.user._id)];
            case 1:
                user = _a.sent();
                res.render('aresure', {
                    title: "Delete user",
                    user: user
                });
                return [2 /*return*/];
        }
    });
}); };
exports.handleDeleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('bye', {
            title: "Deleted"
        });
        return [2 /*return*/];
    });
}); };
