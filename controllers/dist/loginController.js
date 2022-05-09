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
exports.handleCreateNewPass = exports.handleGetToken = exports.handleResetCrypto = exports.handleResetInfo = exports.handleResetPass = exports.handleLogOut = exports.handleRegistration = exports.handleLoginUser = void 0;
var user_1 = require("../models/user");
var bcryptjs_1 = require("bcryptjs");
var colors_1 = require("colors");
var crypto_1 = require("crypto");
var express_validator_1 = require("express-validator");
//LOGIN USER
exports.handleLoginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email_1, password, candidate, errors, areSame, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email_1 = _a.email, password = _a.password;
                console.log(email_1, password);
                return [4 /*yield*/, user_1["default"].findOne({ email: email_1 })];
            case 1:
                candidate = _b.sent();
                console.log(candidate);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    req.flash('loginError', errors.array()[0].msg);
                    return [2 /*return*/, res.status(422).redirect('/')];
                }
                if (!candidate) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, candidate.password)];
            case 2:
                areSame = _b.sent();
                if (areSame) {
                    req.session.user = candidate;
                    req.session.isAuthenticates = true;
                    req.session.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        console.log("get in " + email_1);
                        res.redirect('/remembers');
                    });
                }
                else {
                    req.flash('loginError', 'Wrong password');
                    res.redirect('/');
                }
                return [3 /*break*/, 4];
            case 3:
                req.flash('loginError', 'User not exist');
                res.redirect('/');
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log(colors_1["default"].bgRed.black(err_1));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
//REGIDTRATION USER
exports.handleRegistration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, repeat, name, candidate, errors, hashpassword, user, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, email = _a.email, password = _a.password, repeat = _a.repeat, name = _a.name;
                return [4 /*yield*/, user_1["default"].findOne({ email: email })];
            case 1:
                candidate = _b.sent();
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    req.flash('registError', errors.array()[0].msg);
                    return [2 /*return*/, res.status(422).redirect('/')];
                }
                if (!candidate) return [3 /*break*/, 2];
                req.flash('registError', 'User exist');
                res.redirect('/');
                return [3 /*break*/, 5];
            case 2:
                if (!(password == repeat)) return [3 /*break*/, 5];
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
            case 3:
                hashpassword = _b.sent();
                user = new user_1["default"]({
                    email: email, name: name,
                    password: hashpassword, tasks: { items: [] }
                });
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                console.log('reg user');
                res.render('regsucsses', {
                    title: "Success",
                    user: user
                });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _b.sent();
                console.log(colors_1["default"].bgRed.black(err_2));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
//LOGOUT USER
exports.handleLogOut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            req.session.destroy(function () {
                console.log('out');
                res.redirect('/');
            });
        }
        catch (err) {
            console.log(colors_1["default"].bgRed.black(err));
        }
        return [2 /*return*/];
    });
}); };
//RESET PASSWORD
exports.handleResetPass = function (req, res) {
    try {
        res.render('reset', {
            title: "Forgot password",
            error: req.flash('error')
        });
    }
    catch (err) {
        console.log(colors_1["default"].bgRed.black(err));
    }
};
exports.handleResetInfo = function (req, res) {
    try {
        res.render('resetInfo', {
            title: "Reset password"
        });
    }
    catch (err) {
        console.log(colors_1["default"].bgRed.black(err));
    }
};
exports.handleResetCrypto = function (req, res) {
    try {
        crypto_1["default"].randomBytes(32, function (err, buffer) { return __awaiter(void 0, void 0, void 0, function () {
            var token, candidate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err) {
                            req.flash('error', 'Something get wrong, try again letter please');
                            return [2 /*return*/, res.redirect('/auth/reset')];
                        }
                        token = buffer.toString('hex');
                        return [4 /*yield*/, user_1["default"].findOne({ email: req.body.email })];
                    case 1:
                        candidate = _a.sent();
                        if (!candidate) return [3 /*break*/, 3];
                        candidate.resetToken = token;
                        candidate.resetTokenExp = Date.now() + 60 * 10 * 1000;
                        return [4 /*yield*/, candidate.save()];
                    case 2:
                        _a.sent();
                        res.redirect('/auth/resetinfo');
                        return [3 /*break*/, 4];
                    case 3:
                        req.flash('error', 'Email not exist');
                        res.redirect('/auth/reset');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }
    catch (err) {
        console.log(colors_1["default"].bgRed.black(err));
    }
};
exports.handleGetToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.params.token) {
                    return [2 /*return*/, res.redirect('/')];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1["default"].findOne({
                        resetToken: req.params.token,
                        resetTokenExp: { $gt: Date.now() }
                    })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.redirect('/')];
                }
                else {
                    res.render('password', {
                        title: 'Create password',
                        error: req.flash('error'),
                        userId: user._id.toString(),
                        token: req.params.token
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log(colors_1["default"].bgRed.black(err_3));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleCreateNewPass = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                return [4 /*yield*/, user_1["default"].findOne({
                        _id: req.body.userId,
                        resetToken: req.body.token,
                        resetTokenExp: { $gt: Date.now() }
                    })];
            case 1:
                user = _b.sent();
                console.log(user);
                if (!user) return [3 /*break*/, 4];
                _a = user;
                return [4 /*yield*/, bcryptjs_1["default"].hash(req.body.password, 10)];
            case 2:
                _a.password = _b.sent();
                user.resetToken = undefined;
                user.resetTokenExp = undefined;
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                res.redirect('/');
                return [3 /*break*/, 5];
            case 4:
                req.flash('loginError', 'Something get wrong, try again letter please');
                res.redirect('/');
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_4 = _b.sent();
                console.log(colors_1["default"].bgRed.black(err_4));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
