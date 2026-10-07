import React, { useState, useRef, useEffect } from "react"
import "../styles/Tarea.css"
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import { formatearFecha } from "../utils/fechas";
import ModalVerTarea from "./ModalVerTarea";

function Tarea ({tarea,completar,eliminar,abrirEditar}){
  const [hayMasTexto, setHayMasTexto] = useState(false);
  const [verCompleta, setVerCompleta] = useState(false);
  const textoRef = useRef(null);

  // me fijo si el texto ocupa mas de las 3 lineas que se ven
  useEffect(() => {
    const revisarTexto = () => {
      const parrafo = textoRef.current;
      setHayMasTexto(parrafo.scrollHeight > parrafo.clientHeight);
    };
    revisarTexto();
    // si cambia el tamaño de la pantalla tambien cambia el ancho de la tarjeta
    window.addEventListener("resize", revisarTexto);
    return () => window.removeEventListener("resize", revisarTexto);
  }, [tarea.texto]);

  return(
    <div
      className={tarea.completado?"tarjeta completado":"tarjeta"}>
      <span className="etiqueta-categoria">{tarea.categoria}</span>
      <div className="cuerpo-tarjeta">
        <p
          ref={textoRef}
          className="contenedor-texto"
          onClick={()=>{completar(tarea.id)}} >
          {tarea.texto}
        </p>
        {hayMasTexto && (
          <button className="boton-ver-mas" onClick={()=>{setVerCompleta(true)}}>
            Ver más...
          </button>
        )}
      </div>
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

      {verCompleta && (
        <ModalVerTarea tarea={tarea} cerrar={()=>{setVerCompleta(false)}} />
      )}
    </div>
  )
}

export default Tarea
