"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _config = _interopRequireDefault(require("./config"));

var _db = require("./services/db");

var _server = _interopRequireDefault(require("./services/server"));

var _arguments = require("./arguments");

var _console = require("./console");

var _cluster = _interopRequireDefault(require("cluster"));

var puerto = process.env.PORT || 8080;

var init = function init() {
  (0, _db.connectDb)();

  var server = _server["default"].listen(puerto, function () {
    return _console.logger.info("Escuchando en puerto ".concat(puerto, " - PID Worker ").concat(process.pid));
  });

  server.on("error", function (err) {
    return _console.logger.error("Error en el servidor: ".concat(err));
  });
};

init();