import "../styles/Tarea.css"
import { TiDeleteOutline } from "react-icons/ti";

function Tarea ({id,texto,completado,completar,eliminar}){
  return(
    <>
      <div
        className={completado?"contenedor-tarea completado":"contenedor-tarea"}>
        <p
          className="contenedor-texto"
          onClick={()=>{completar(id)}} >
          {texto}
        </p>
        <div
          className="contenedor-eliminar"
          onClick={()=>{eliminar(id)}}>
          <TiDeleteOutline />
        </div>
      </div>
    </>
  )
}

export default Tarea