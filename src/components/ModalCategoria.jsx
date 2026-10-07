import React, { useState } from "react";
import "../styles/Modal.css";

function ModalCategoria({ categorias, crearCategoria, cerrar }) {
  const [nombre, setNombre] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      return;
    }
    if (categorias.includes(nombre.trim())) {
      alert("Esa categoria ya existe");
      return;
    }
    crearCategoria(nombre.trim());
    cerrar();
  };

  return (
    <div className="fondo-modal" onClick={cerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Nueva categoria</h2>
        <form onSubmit={manejarEnvio}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Ej: Facultad, Trabajo..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="off"
            autoFocus
          />

          <p className="categorias-existentes">
            Ya tenes: {categorias.join(", ")}
          </p>

          <div className="botones-modal">
            <button type="button" className="boton-cancelar" onClick={cerrar}>
              Cancelar
            </button>
            <button type="submit" className="boton-guardar">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCategoria;
