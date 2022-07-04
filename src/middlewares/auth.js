import { logger } from "../console/index";

export const isLoggedIn = (req, res, done) => {
  logger.warn("Is authenticated");
  logger.warn(req.isAuthenticated());

  if (!req.isAuthenticated()) {
    logger.error("No estas autorizado");
    return res.status(401).json({ message: "No estas autorizado" });
  } else done();
};
