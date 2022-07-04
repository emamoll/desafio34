"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupFunc = exports.loginFunc = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _user = require("../models/user");

var _index = require("../console/index");

var StrategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
};

var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, email, password, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _index.logger.info("Login!!!");

            _context.next = 3;
            return _user.UserModel.findOne({
              email: email
            });

          case 3:
            user = _context.sent;

            if (!(!user || !user.isValidPassword(password))) {
              _context.next = 9;
              break;
            }

            _index.logger.warn("Email o contrasenia incorrectos");

            return _context.abrupt("return", done(null, false, {
              message: "Email o contrasenia incorrectos"
            }));

          case 9:
            _index.logger.info("Todo ok");

            return _context.abrupt("return", done(null, user));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var signup = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, email, password, done) {
    var _req$body, _email, _password, query, user, userData, newUser;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            _index.logger.info("Signup!!!");

            _req$body = req.body, _email = _req$body.email, _password = _req$body.password;

            _index.logger.info(req.body);

            if (_email) {
              _context2.next = 7;
              break;
            }

            _index.logger.warn("Campos invalidos");

            return _context2.abrupt("return", done(null, false, {
              message: "Campos invalidos"
            }));

          case 7:
            query = {
              $or: [{
                email: _email
              }]
            };
            _context2.next = 10;
            return _user.UserModel.findOne(query);

          case 10:
            user = _context2.sent;

            if (!user) {
              _context2.next = 17;
              break;
            }

            _index.logger.warn("El usuario ya existe");

            _index.logger.warn(user);

            return _context2.abrupt("return", done(null, false, {
              message: "El usuario ya existe"
            }));

          case 17:
            userData = {
              email: _email,
              password: _password
            };
            _context2.next = 20;
            return _user.UserModel.create(userData);

          case 20:
            newUser = _context2.sent;
            return _context2.abrupt("return", done(null, newUser));

          case 22:
            _context2.next = 27;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](0);
            done(_context2.t0);

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 24]]);
  }));

  return function signup(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var loginFunc = new _passportLocal.Strategy(StrategyOptions, login);
exports.loginFunc = loginFunc;
var signupFunc = new _passportLocal.Strategy(StrategyOptions, signup);
exports.signupFunc = signupFunc;

_passport["default"].serializeUser(function (user, done) {
  _index.logger.info("Se ejecuta el serializeUser");

  done(null, user._id);
});

_passport["default"].deserializeUser(function (userId, done) {
  _index.logger.info("Se ejecuta el deserializeUser");

  _user.UserModel.findById(userId).then(function (user) {
    return done(null, user);
  });
});