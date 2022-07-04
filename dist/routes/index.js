"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _express = require("express");

var _auth = require("../middlewares/auth");

var _user = require("../models/user");

var _arguments = require("../arguments");

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

var _index = require("../console/index");

var router = (0, _express.Router)();
var passportOptions = {
  badRequestMessage: "Falta el email o la contrasenia"
};
router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.render("login");

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/", _passport["default"].authenticate("login", passportOptions), function (req, res, user) {
  if (!user) return res.status(401).render("login-error");else res.redirect("/api/datos");
});
router.get("/datos", _auth.isLoggedIn, function (req, res) {
  res.render("datos", {
    datos: req.user
  });
});
router.get("/signup", function (req, res) {
  res.render("signup");
});
router.post("/signup", function (req, res, next) {
  _passport["default"].authenticate("signup", passportOptions, function (err, user, info) {
    _index.logger.info("Info Signup");

    _index.logger.info(err, user, info);

    if (err) {
      _index.logger.error(err);

      return next(err);
    }

    if (!user) {
      _index.logger.warn("Signup error");

      return res.status(401).render("signup-error");
    } else res.json({
      msg: "Signup ok"
    });
  })(req, res, next);
});
router.get("/logout", _auth.isLoggedIn, function (req, res) {
  req.logOut(function (err) {
    if (err) {
      _index.logger.error(err);

      return next(err);
    }
  });
  res.render("login");
});
router.get("/hello", function (req, res) {
  res.json({
    msg: "Hola",
    session: req.session
  });
});
router.get("/info", function (req, res) {
  res.json({
    objectProcess: _arguments.objectProcess
  });
});

var scriptPath = _path["default"].resolve(__dirname, "../randoms/index.js");

router.post("/randoms", function (req, res) {
  var cantidad = req.query.cantidad;
  var randoms = (0, _child_process.fork)(scriptPath);

  if (cantidad) {
    randoms.send(cantidad);
  } else {
    randoms.send(10000);
  }

  randoms.on("message", function (cantidad) {
    res.json({
      valor: cantidad
    });
  });
});
var _default = router;
exports["default"] = _default;