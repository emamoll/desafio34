// import { connectDb } from "./services/db";
import Server from "./services/server";
import cluster from 'cluster';
import os from 'os';
import minimist from "minimist";
// import { logger } from "./console";

const argumentos = minimist(process.argv.slice(2));
const PORT = process.env.PORT || 8080;

const clusterMode = argumentos.cluster;
//Obtengo el numero de nucleos disponibles en mi PC
const numCPUs = os.cpus().length;

if (clusterMode && cluster.isPrimary) {
  console.log('Ejecutando modo cluster');
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  Server.listen(PORT, () =>
    console.log(
      `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
    )
  );
}
