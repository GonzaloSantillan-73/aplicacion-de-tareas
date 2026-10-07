import React from "react";
import "../styles/Modal.css";
import { formatearFecha } from "../utils/fechas";

// muestra la tarea con todo el texto
function ModalVerTarea({ tarea, cerrar }) {
  return (
    <div className="fondo-modal" onClick={cerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <span className="etiqueta-modal">{tarea.categoria}</span>
        <div className="texto-completo">{tarea.texto}</div>
        <p className="fechas-modal">
          Creada: {formatearFecha(tarea.creada)} | Actualizada: {formatearFecha(tarea.actualizada)}
        </p>
        <div className="botones-modal">
          <button type="button" className="boton-cancelar" onClick={cerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalVerTarea;
