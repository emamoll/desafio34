"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectProcess = exports.args = void 0;

var _minimist = _interopRequireDefault(require("minimist"));

var optionalArgsObject = {
  alias: {
    p: "puerto"
  },
  "default": {
    puerto: "8080"
  }
};
var args = (0, _minimist["default"])(process.argv.slice(2), optionalArgsObject);
exports.args = args;
var objectProcess = {
  "Directorio actual de trabajo": process.cwd(),
  "ID Del proceso actual": process.pid,
  "Version de NodeJs corriendo": process.version,
  "Titulo del proceso": process.title,
  "Sistema Operativo": process.platform,
  "Uso de memoria": JSON.stringify(process.memoryUsage())
};
exports.objectProcess = objectProcess;