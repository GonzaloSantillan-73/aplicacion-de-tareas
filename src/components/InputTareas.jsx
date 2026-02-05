import React,{useState} from "react";
import "../styles/InputTareas.css"

function InputTareas({agregarTarea}){

  const [input,setInput] = useState("")

  const manejarCambio=(e)=>{
    setInput(e.target.value)
  }

  const manejarEnvio=(e)=>{
    e.preventDefault()
    const tareaNueva={
      texto:input,
      id:crypto.randomUUID(),
      completado:false
    }
    agregarTarea(tareaNueva)
  }

  return(
    <>
      <form className="formulario" onSubmit={manejarEnvio}>
        <input className="input-tarea" type="text" placeholder="Escriba la tarea..." name="tarea" onChange={manejarCambio} />
        <button className="agregar-tarea" type="submit">Agregar</button>
      </form>
    </>
  )
}

export default InputTareas