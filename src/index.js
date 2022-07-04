import Config from "./config";
import { connectDb } from "./services/db";
import Server from "./services/server";
import { args } from "./arguments";
import { logger } from "./console";
import cluster from "cluster";

const puerto = process.env.PORT || 8080;

const init = () => {
  connectDb();

  const server = Server.listen(puerto, () =>
    logger.info(`Escuchando en puerto ${puerto} - PID Worker ${process.pid}`)
  );

  server.on("error", (err) => logger.error(`Error en el servidor: ${err}`));
};

init();
