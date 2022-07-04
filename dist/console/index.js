"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _winston = _interopRequireDefault(require("winston"));

var createLogger = _winston["default"].createLogger,
    format = _winston["default"].format,
    trasnports = _winston["default"].trasnports;
var combine = format.combine,
    printf = format.printf,
    timestamp = format.timestamp,
    colorize = format.colorize;
var logConfiguration = {
  level: "info",
  format: combine(timestamp({
    format: "DD-MMM-YYYY HH:mm:ss"
  }), colorize(), printf(function (info) {
    return "".concat(info.level, " | ").concat([info.timestamp], " | ").concat(info.message);
  })),
  trasnports: [new _winston["default"].transports.Console(), new _winston["default"].transports.File({
    filename: "./logs/warn.log",
    level: "warn"
  }), new _winston["default"].transports.File({
    filename: "logs/error.log",
    level: "error"
  })]
};

var logger = _winston["default"].createLogger(logConfiguration);

exports.logger = logger;