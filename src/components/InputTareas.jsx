import React, { useState } from "react";
import "../styles/InputTareas.css";
import { IoAddOutline } from "react-icons/io5";

function InputTareas({ agregarTarea }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(0)

  const manejarCambio=(e) => {
    setInput(e.target.value);
    setError(e.target.value.length)
  };

  const manejarEnvio=(e) => {
    e.preventDefault();
    const tareaNueva = {
      texto: input,
      id: crypto.randomUUID(),
      completado: false,
    };
    agregarTarea(tareaNueva);
  };

  return (
    <>
      <form className="formulario" onSubmit={manejarEnvio}>
        <input
          className="input-tarea"
          type="text"
          placeholder="Escriba la tarea..."
          name="tarea"
          onChange={(e)=>{manejarCambio(e)}}
          autoComplete="off"
        />
        <button className="agregar-tarea" type="submit">
          <IoAddOutline size={40}/>
        </button>
      </form>
      <p className="mensaje-error">{error<3?`Ingresa al menos 3 caracteres (llevas ${error}).`:``}</p>
    </>
  );
}

export default InputTareas;
