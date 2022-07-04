"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = void 0;

var _index = require("../console/index");

var isLoggedIn = function isLoggedIn(req, res, done) {
  _index.logger.warn("Is authenticated");

  _index.logger.warn(req.isAuthenticated());

  if (!req.isAuthenticated()) {
    _index.logger.error("No estas autorizado");

    return res.status(401).json({
      message: "No estas autorizado"
    });
  } else done();
};

exports.isLoggedIn = isLoggedIn;