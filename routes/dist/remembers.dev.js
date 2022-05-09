"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var color = require('colors'); //Models


var User = require('../models/user');

var Remembr = require('../models/remembers'); //Middleware


var auth = require('../middleware/auth');

function mapTasksItems(tasks) {
  return tasks.items.map(function (c) {
    return _objectSpread({}, c.remembrId._doc, {
      id: c.remembrId.id
    });
  });
}

function isOwner(task, req) {
  return task.userId.toString() === req.user._id.toString();
} //GET ALL TASKS


router.get('/', auth, function _callee(req, res) {
  var user, usertask, tasks;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 3:
          user = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(req.user.populate('tasks.items.remembrId'));

        case 6:
          usertask = _context.sent;
          tasks = mapTasksItems(usertask.tasks);
          res.render('remembers', {
            title: 'Tasks',
            user: user,
            tasks: tasks
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(color.bgRed.white(_context.t0));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); //ADD TASK

router.post('/addremembr', auth, function _callee2(req, res) {
  var remembr;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body);
          console.log(req.user);
          remembr = new Remembr({
            text: req.body.remembr,
            userId: req.user
          });
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(remembr.save());

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(req.user.addTask(remembr));

        case 8:
          res.redirect('/remembers');
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](3);
          console.log(color.bgRed.white(_context2.t0));
          res.redirect('/remembers');

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 11]]);
}); //EDIT TASK

router.get('/:id/edit', auth, function _callee3(req, res) {
  var remembr;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (req.query.allow) {
            _context3.next = 2;
            break;
          }

          return _context3.abrupt("return", res.redirect('/'));

        case 2:
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Remembr.findById(req.params.id));

        case 5:
          remembr = _context3.sent;

          if (!isOwner(remembr, req)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.render('edit-remembers', {
            title: "Edit task",
            remembr: remembr
          }));

        case 8:
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](2);
          console.log(color.bgRed.white(_context3.t0));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
router.post('/edit', auth, function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // if(req.body.done===false){
          // }
          id = req.body.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Remembr.findByIdAndUpdate(id, req.body));

        case 4:
          //id of remember & where update
          res.redirect('/remembers');
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(color.bgRed.white(_context4.t0));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //DELETE TASK

router["delete"]('/remove/:id', auth, function _callee5(req, res) {
  var usertask, tasks;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log('remove?');
          _context5.next = 3;
          return regeneratorRuntime.awrap(req.user.removeTask(req.params.id));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(Remembr.findByIdAndDelete(req.params.id));

        case 5:
          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap(req.user.populate('tasks.items.remembrId').execPopulate());

        case 8:
          usertask = _context5.sent;
          tasks = mapTasksItems(usertask.tasks);
          res.status(200).json(tasks);
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](5);
          console.log(color.bgRed.white(_context5.t0));

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 13]]);
});
module.exports = router;