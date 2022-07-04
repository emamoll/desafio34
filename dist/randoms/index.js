"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randoms = void 0;

var randoms = function randoms(cantidad) {
  var salida = [];

  for (var i = 0; i < cantidad; i++) {
    salida.push(Math.random());
  }

  return salida;
};

exports.randoms = randoms;
process.on("message", function (cantidad) {
  if (cantidad) {
    var aleatorio = randoms(cantidad);
    process.send(aleatorio);
  }
});