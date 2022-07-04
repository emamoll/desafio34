"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _auth = require("./auth");

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("../routes"));

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _expressSession["default"])({
  secret: "mySecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
}));
app.set("view engine", "pug");

var viewsPath = _path["default"].resolve(__dirname, "../../views");

app.set("views", viewsPath);
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

_passport["default"].use("login", _auth.loginFunc);

_passport["default"].use("signup", _auth.signupFunc);

app.use("/api", _routes["default"]);
var _default = app;
exports["default"] = _default;