export const randoms = (cantidad) => {
  const salida = [];

  for (let i = 0; i < cantidad; i++) {
    salida.push(Math.random());
  }

  return salida;
};

process.on("message", (cantidad) => {
  if (cantidad) {
    const aleatorio = randoms(cantidad);
    process.send(aleatorio);
  }
});
