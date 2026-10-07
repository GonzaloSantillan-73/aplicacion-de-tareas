import React, { useState } from "react"
import "../styles/Herramientas.css"

function Categorias({ crearCategoria }) {
  const [nombre, setNombre] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      return;
    }
    crearCategoria(nombre.trim());
    setNombre("");
  };

  return (
    <form className="form-categoria" onSubmit={manejarEnvio}>
      <input
        type="text"
        placeholder="Nueva categoria..."
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button type="submit">Crear categoria</button>
    </form>
  );
}

export default Categorias
