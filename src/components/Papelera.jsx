import React from "react"
import "../styles/Papelera.css"
import { formatearFecha } from "../utils/fechas";
import { MdRestore, MdDeleteForever } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

const TREINTA_DIAS = 30 * 24 * 60 * 60 * 1000;

function Papelera({ papelera, restaurar, eliminarDefinitivo, vaciarPapelera, volver }) {
  return (
    <div>
      <header className="encabezado">
        <button className="boton-secundario" onClick={volver}>
          <IoArrowBack size={18} /> Volver
        </button>
        <h1>Papelera</h1>
        <button
          className="boton-vaciar"
          onClick={vaciarPapelera}
          disabled={papelera.length === 0}
        >
          Vaciar papelera
        </button>
      </header>
      <p className="aviso">Las tareas se borran solas despues de 30 dias.</p>

      {papelera.length === 0 && <p className="sin-tareas">La papelera esta vacia</p>}

      <div className="grilla-tareas">
        {papelera.map((tarea) => (
          <div key={tarea.id} className="tarjeta tarjeta-papelera">
            <span className="etiqueta-categoria">{tarea.categoria}</span>
            <p className="contenedor-texto">{tarea.texto}</p>
            <div className="pie-tarjeta">
              <div>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Papelera
