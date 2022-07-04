"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

var connectDb = function connectDb() {
  return _mongoose["default"].connect(_config["default"].MONGO_ATLAS_SRV, {
    useNewUrlParser: true
  });
};

exports.connectDb = connectDb;