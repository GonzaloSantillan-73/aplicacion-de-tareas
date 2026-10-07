import React, { useState } from "react";
import "../styles/Modal.css";
import { TiDeleteOutline } from "react-icons/ti";

function ModalCategoria({ categorias, crearCategoria, eliminarCategoria, cerrar }) {
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
    setNombre("");
  };

  return (
    <div className="fondo-modal" onClick={cerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Categorias</h2>
        <form onSubmit={manejarEnvio}>
          <label>Nueva categoria</label>
          <div className="fila-categoria">
            <input
              type="text"
              placeholder="Ej: Facultad, Trabajo..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="off"
              autoFocus
            />
            <button type="submit" className="boton-guardar">
              Crear
            </button>
          </div>
        </form>

        <label>Tus categorias</label>
        <ul className="lista-categorias">
          {categorias.map((cat) => (
            <li key={cat}>
              {cat}
              {/* General no se puede borrar porque es la que queda por defecto */}
              {cat !== "General" && (
                <TiDeleteOutline
                  className="icono"
                  title="Eliminar categoria"
                  onClick={() => eliminarCategoria(cat)}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="botones-modal">
          <button type="button" className="boton-cancelar" onClick={cerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCategoria;
