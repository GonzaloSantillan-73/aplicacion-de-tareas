// pasa los milisegundos a algo como 07/10/2026 14:35
export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
