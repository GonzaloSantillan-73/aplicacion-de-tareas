import React, { useState } from "react";
import "../styles/InputTareas.css";
import { IoAddOutline } from "react-icons/io5";

function InputTareas({ agregarTarea, categorias }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(0)
  const [categoria, setCategoria] = useState(categorias[0]);

  const manejarCambio=(e) => {
    setInput(e.target.value);
    setError(e.target.value.length)
  };

  const manejarEnvio=(e) => {
    e.preventDefault();
    if (input.trim().length < 3) {
      return;
    }
    const ahora = Date.now();
    const tareaNueva = {
      texto: input.trim(),
      id: crypto.randomUUID(),
      completado: false,
      categoria: categoria,
      creada: ahora,
      actualizada: ahora,
    };
    agregarTarea(tareaNueva);
    setInput("");
    setError(0);
  };

  return (
    <>
      <form className="formulario" onSubmit={manejarEnvio}>
        <input
          className="input-tarea"
          type="text"
          placeholder="Escriba la tarea..."
          name="tarea"
          value={input}
          onChange={(e)=>{manejarCambio(e)}}
          autoComplete="off"
        />
        <button className="agregar-tarea" type="submit">
          <IoAddOutline size={40}/>
        </button>
      </form>
      <select
        className="select-categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <p className="mensaje-error">{error<3?`Ingresa al menos 3 caracteres (llevas ${error}).`:``}</p>
    </>
  );
}

export default InputTareas;
