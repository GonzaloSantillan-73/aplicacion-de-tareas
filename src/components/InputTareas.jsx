import React,{useState} from "react";

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
      <form onSubmit={manejarEnvio}>
        <input type="text" placeholder="Escriba la tarea..." name="tarea" onChange={manejarCambio} />
        <button type="submit">Agregar</button>
      </form>
    </>
  )
}

export default InputTareas