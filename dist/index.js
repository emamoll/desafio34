"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _server = _interopRequireDefault(require("./services/server"));

var _cluster = _interopRequireDefault(require("cluster"));

var _os = _interopRequireDefault(require("os"));

var _minimist = _interopRequireDefault(require("minimist"));

// import { connectDb } from "./services/db";
// import { logger } from "./console";
var argumentos = (0, _minimist["default"])(process.argv.slice(2));
var PORT = process.env.PORT || 8080;
var clusterMode = argumentos.cluster; //Obtengo el numero de nucleos disponibles en mi PC

var numCPUs = _os["default"].cpus().length;
/* --------------------------------------------------------------------------- */

/* MASTER */

/**
 * isMaster vs isPrimary
 * https://stackoverflow.com/questions/68978929/why-is-nodejs-cluster-module-not-working
 */


if (clusterMode && _cluster["default"].isMaster) {
  console.log('Ejecutando modo cluster');
  console.log("PID MASTER ".concat(process.pid));

  for (var i = 0; i < numCPUs; i++) {
    _cluster["default"].fork();
  }

  _cluster["default"].on('exit', function (worker) {
    console.log("Worker ".concat(worker.process.pid, " died at ").concat(Date()));

    _cluster["default"].fork();
  });
} else {
  /* --------------------------------------------------------------------------- */

  /* WORKERS */
  _server["default"].listen(PORT, function () {
    return console.log("Servidor express escuchando en el puerto ".concat(PORT, " - PID WORKER ").concat(process.pid));
  });
}