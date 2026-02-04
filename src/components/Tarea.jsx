import "../styles/Tarea.css"
import { TiDeleteOutline } from "react-icons/ti";

function Tarea ({id,texto,completado,completar}){
  return(
    <>
      <div
        className={completado?"contenedor-tarea completado":"contenedor-tarea"}
        onClick={()=>{completar(id)}}  >
        <div
          className="contenedor-texto">
          {texto}
        </div>
        <div className="contenedor-eliminar"><TiDeleteOutline /></div>
      </div>
    </>
  )
}

export default Tarea