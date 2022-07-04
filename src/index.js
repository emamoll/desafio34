import { connectDb } from "./services/db";
import Server from "./services/server";
import { logger } from "./console";

const PORT = process.env.PORT || 8080;

const init = () => {
  connectDb();

  const server = Server.listen(PORT, () =>
    logger.info(`Escuchando en puerto ${PORT} - PID Worker ${process.pid}`)
  );

  server.on("error", (err) => logger.error(`Error en el servidor: ${err}`));
};

init();
