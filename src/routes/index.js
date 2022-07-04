import passport from "passport";
import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import { UserModel } from "../models/user";
import { objectProcess } from "../arguments";
import { fork } from "child_process";
import path from "path";
import { logger } from "../console/index";

const router = Router();

const passportOptions = {
  badRequestMessage: "Falta el email o la contrasenia",
};

router.get("/", async (req, res) => {
  res.render("login");
});

router.post(
  "/",
  passport.authenticate("login", passportOptions),
  (req, res, user) => {
    if (!user) return res.status(401).render("login-error");
    else res.redirect("/api/datos");
  }
);

router.get("/datos", isLoggedIn, (req, res) => {
  res.render("datos", {
    datos: req.user,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", passportOptions, (err, user, info) => {
    logger.info("Info Signup");
    logger.info(err, user, info);

    if (err) {
      logger.error(err);
      return next(err);
    }
    if (!user) {
      logger.warn("Signup error");
      return res.status(401).render("signup-error");
    } else res.json({ msg: "Signup ok" });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logOut((err) => {
    if (err) {
      logger.error(err);
      return next(err);
    }
  });

  res.render("login");
});

router.get("/hello", (req, res) => {
  res.json({
    msg: "Hola",
    session: req.session,
  });
});

router.get("/info", (req, res) => {
  res.json({
    objectProcess,
  });
});

const scriptPath = path.resolve(__dirname, "../randoms/index.js");

router.post("/randoms", (req, res) => {
  const { cantidad } = req.query;

  const randoms = fork(scriptPath);
  if (cantidad) {
    randoms.send(cantidad);
  } else {
    randoms.send(10000);
  }

  randoms.on("message", (cantidad) => {
    res.json({
      valor: cantidad,
    });
  });
});

export default router;
