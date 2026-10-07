import React from "react"
import "../styles/Tarea.css"
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import { formatearFecha } from "../utils/fechas";

function Tarea ({tarea,completar,eliminar,abrirEditar}){
  return(
    <div
      className={tarea.completado?"tarjeta completado":"tarjeta"}>
      <span className="etiqueta-categoria">{tarea.categoria}</span>
      <p
        className="contenedor-texto"
        onClick={()=>{completar(tarea.id)}} >
        {tarea.texto}
      </p>
      <div className="pie-tarjeta">
        <div>
          <p className="fechas">Creada: {formatearFecha(tarea.creada)}</p>
          <p className="fechas">Actualizada: {formatearFecha(tarea.actualizada)}</p>
        </div>
        <div className="contenedor-iconos">
          <FiEdit2 className="icono" title="Editar" onClick={()=>{abrirEditar(tarea)}} />
          <TiDeleteOutline className="icono" title="Eliminar" onClick={()=>{eliminar(tarea.id)}} />
        </div>
      </div>
    </div>
  )
}

export default Tarea
