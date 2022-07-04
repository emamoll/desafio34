import minimist from "minimist";

const optionalArgsObject = {
  alias: {
    p: "puerto",
  },
  default: {
    puerto: "8080",
  },
};

export const args = minimist(process.argv.slice(2), optionalArgsObject);

export const objectProcess = {
  "Directorio actual de trabajo": process.cwd(),
  "ID Del proceso actual": process.pid,
  "Version de NodeJs corriendo": process.version,
  "Titulo del proceso": process.title,
  "Sistema Operativo": process.platform,
  "Uso de memoria": JSON.stringify(process.memoryUsage()),
};
