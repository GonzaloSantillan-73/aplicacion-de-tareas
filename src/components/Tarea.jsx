import React, { useState } from "react"
import "../styles/Tarea.css"
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { formatearFecha } from "../utils/fechas";

function Tarea ({tarea,categorias,completar,eliminar,editar}){
  const [editando, setEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(tarea.texto);
  const [categoriaEditada, setCategoriaEditada] = useState(tarea.categoria);

  const guardar = () => {
    if (textoEditado.trim().length < 3) {
      alert("La tarea tiene que tener al menos 3 caracteres");
      return;
    }
    editar(tarea.id, textoEditado.trim(), categoriaEditada);
    setEditando(false);
  };

  const cancelar = () => {
    setTextoEditado(tarea.texto);
    setCategoriaEditada(tarea.categoria);
    setEditando(false);
  };

  if (editando) {
    return (
      <div className="contenedor-tarea editando">
        <div className="contenedor-edicion">
          <input
            className="input-editar"
            type="text"
            value={textoEditado}
            onChange={(e) => setTextoEditado(e.target.value)}
          />
          <select
            className="select-editar"
            value={categoriaEditada}
            onChange={(e) => setCategoriaEditada(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="contenedor-iconos">
          <FiCheck className="icono" onClick={guardar} />
          <FiX className="icono" onClick={cancelar} />
        </div>
      </div>
    );
  }

  return(
    <>
      <div
        className={tarea.completado?"contenedor-tarea completado":"contenedor-tarea"}>
        <div className="contenedor-info">
          <p
            className="contenedor-texto"
            onClick={()=>{completar(tarea.id)}} >
            {tarea.texto}
          </p>
          <span className="etiqueta-categoria">{tarea.categoria}</span>
          <p className="fechas">Creada: {formatearFecha(tarea.creada)}</p>
          <p className="fechas">Actualizada: {formatearFecha(tarea.actualizada)}</p>
        </div>
        <div className="contenedor-iconos">
          <FiEdit2 className="icono" onClick={()=>{setEditando(true)}} />
          <TiDeleteOutline className="icono" onClick={()=>{eliminar(tarea.id)}} />
        </div>
      </div>
    </>
  )
}

export default Tarea
