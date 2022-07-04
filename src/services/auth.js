import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user";
import { logger } from "../console/index";

const StrategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const login = async (req, email, password, done) => {
  logger.info("Login!!!");

  const user = await UserModel.findOne({ email });

  if (!user || !user.isValidPassword(password)) {
    logger.warn("Email o contrasenia incorrectos");

    return done(null, false, { message: "Email o contrasenia incorrectos" });
  } else {
    logger.info("Todo ok");

    return done(null, user);
  }
};

const signup = async (req, email, password, done) => {
  try {
    logger.info("Signup!!!");

    const { email, password } = req.body;

    logger.info(req.body);

    if (!email) {
      logger.warn("Campos invalidos");
      return done(null, false, { message: "Campos invalidos" });
    }

    const query = {
      $or: [{ email: email }],
    };

    const user = await UserModel.findOne(query);

    if (user) {
      logger.warn("El usuario ya existe");
      logger.warn(user);
      return done(null, false, { message: "El usuario ya existe" });
    } else {
      const userData = {
        email,
        password,
      };

      const newUser = await UserModel.create(userData);

      return done(null, newUser);
    }
  } catch (err) {
    done(err);
  }
};

export const loginFunc = new LocalStrategy(StrategyOptions, login);
export const signupFunc = new LocalStrategy(StrategyOptions, signup);

passport.serializeUser((user, done) => {
  logger.info("Se ejecuta el serializeUser");

  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  logger.info("Se ejecuta el deserializeUser");

  UserModel.findById(userId).then((user) => {
    return done(null, user);
  });
});
