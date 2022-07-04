"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default = {
  MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV
};
exports["default"] = _default;