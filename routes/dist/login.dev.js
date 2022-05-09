"use strict";

//Express
var _require = require('express'),
    Router = _require.Router;

var router = Router(); //User

var User = require('../models/user'); //Bcrypt


var bcrypt = require('bcryptjs'); //Colors


var color = require('colors'); //keys


var keys = require('../keys'); //crypto


var crypto = require('crypto'); //express-validator


var _require2 = require('express-validator'),
    validationResult = _require2.validationResult;

var _require3 = require('../utils/validators'),
    registerValidators = _require3.registerValidators,
    loginValidators = _require3.loginValidators;

router.post('/login', loginValidators);
router.post('/regist', registerValidators, function _callee(req, res) {
  var _req$body, email, password, repeat, name, candidate, errors, hashpassword, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password, repeat = _req$body.repeat, name = _req$body.name;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          candidate = _context.sent;
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 9;
            break;
          }

          req.flash('registError', errors.array()[0].msg);
          return _context.abrupt("return", res.status(422).redirect('/'));

        case 9:
          if (!candidate) {
            _context.next = 14;
            break;
          }

          req.flash('registError', 'User exist');
          res.redirect('/');
          _context.next = 22;
          break;

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 16:
          hashpassword = _context.sent;
          user = new User({
            email: email,
            name: name,
            password: hashpassword,
            tasks: {
              items: []
            }
          });
          _context.next = 20;
          return regeneratorRuntime.awrap(user.save());

        case 20:
          console.log('reg user');
          res.render('regsucsses', {
            title: "Success",
            user: user
          });

        case 22:
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          console.log(color.bgRed.black(_context.t0));

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 24]]);
});
router.get('/logout', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            req.session.destroy(function () {
              console.log('out');
              res.redirect('/');
            });
          } catch (err) {
            console.log(color.bgRed.black(err));
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/reset', function (req, res) {
  try {
    res.render('reset', {
      title: "Forgot password",
      error: req.flash('error')
    });
  } catch (err) {
    console.log(color.bgRed.black(err));
  }
});
router.get('/resetinfo', function (req, res) {
  try {
    res.render('resetInfo', {
      title: "Reset progress"
    });
  } catch (err) {
    console.log(color.bgRed.black(err));
  }
});
router.post('/reset', function (req, res) {
  try {
    crypto.randomBytes(32, function _callee3(err, buffer) {
      var token, candidate;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!err) {
                _context3.next = 3;
                break;
              }

              req.flash('error', 'Something get wrong, try again letter please');
              return _context3.abrupt("return", res.redirect('/auth/reset'));

            case 3:
              token = buffer.toString('hex');
              _context3.next = 6;
              return regeneratorRuntime.awrap(User.findOne({
                email: req.body.email
              }));

            case 6:
              candidate = _context3.sent;

              if (!candidate) {
                _context3.next = 15;
                break;
              }

              candidate.resetToken = token;
              candidate.resetTokenExp = Date.now() + 60 * 10 * 1000;
              _context3.next = 12;
              return regeneratorRuntime.awrap(candidate.save());

            case 12:
              res.redirect('/auth/resetinfo');
              _context3.next = 17;
              break;

            case 15:
              req.flash('error', 'Email not exist');
              res.redirect('/auth/reset');

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
  } catch (err) {
    console.log(color.bgRed.black(err));
  }
});
router.get('/password/:token', function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (req.params.token) {
            _context4.next = 2;
            break;
          }

          return _context4.abrupt("return", res.redirect('/'));

        case 2:
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            resetToken: req.params.token,
            resetTokenExp: {
              $gt: Date.now()
            }
          }));

        case 5:
          user = _context4.sent;

          if (user) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.redirect('/'));

        case 10:
          res.render('password', {
            title: 'Create password',
            error: req.flash('error'),
            userId: user._id.toString(),
            token: req.params.token
          });

        case 11:
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](2);
          console.log(color.bgRed.black(_context4.t0));

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 13]]);
});
router.post('/password', function _callee5(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: {
              $gt: Date.now()
            }
          }));

        case 3:
          user = _context5.sent;
          console.log(user);

          if (!user) {
            _context5.next = 16;
            break;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 8:
          user.password = _context5.sent;
          user.resetToken = undefined;
          user.resetTokenExp = undefined;
          _context5.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          res.redirect('/');
          _context5.next = 18;
          break;

        case 16:
          req.flash('loginError', 'Something get wrong, try again letter please');
          res.redirect('/');

        case 18:
          _context5.next = 23;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](0);
          console.log(color.bgRed.black(_context5.t0));

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 20]]);
});
module.exports = router;