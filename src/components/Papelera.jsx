import React from "react"
import "../styles/Papelera.css"
import { formatearFecha } from "../utils/fechas";
import { MdRestore, MdDeleteForever } from "react-icons/md";

const TREINTA_DIAS = 30 * 24 * 60 * 60 * 1000;

function Papelera({ papelera, restaurar, eliminarDefinitivo, vaciarPapelera, volver }) {
  return (
    <div>
      <div className="papelera-cabecera">
        <button onClick={volver}>Volver</button>
        <h2>Papelera</h2>
        <button
          className="boton-vaciar"
          onClick={vaciarPapelera}
          disabled={papelera.length === 0}
        >
          Vaciar
        </button>
      </div>
      <p className="aviso">Las tareas se borran solas despues de 30 dias.</p>

      {papelera.length === 0 && <p className="sin-tareas">La papelera esta vacia</p>}

      {papelera.map((tarea) => (
        <div key={tarea.id} className="tarea-papelera">
          <div>
            <p className="texto-papelera">{tarea.texto}</p>
            <p className="fechas">Eliminada: {formatearFecha(tarea.fechaEliminada)}</p>
            <p className="fechas">Se borra el: {formatearFecha(tarea.fechaEliminada + TREINTA_DIAS)}</p>
          </div>
          <div className="contenedor-iconos">
            <MdRestore className="icono" title="Restaurar" onClick={() => restaurar(tarea.id)} />
            <MdDeleteForever
              className="icono"
              title="Eliminar definitivamente"
              onClick={() => eliminarDefinitivo(tarea.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Papelera
