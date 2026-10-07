import React, { useState } from "react";
import "../styles/Modal.css";

// sirve para crear una tarea nueva o para editar una que ya existe
function ModalTarea({ tareaEditando, categorias, guardarTarea, cerrar }) {
  const [input, setInput] = useState(tareaEditando ? tareaEditando.texto : "");
  const [categoria, setCategoria] = useState(
    tareaEditando ? tareaEditando.categoria : categorias[0]
  );
  const [error, setError] = useState(input.length);

  const manejarCambio = (e) => {
    setInput(e.target.value);
    setError(e.target.value.trim().length);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (input.trim().length < 3) {
      return;
    }
    guardarTarea(input.trim(), categoria);
    cerrar();
  };

  return (
    <div className="fondo-modal" onClick={cerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{tareaEditando ? "Editar tarea" : "Nueva tarea"}</h2>
        <form onSubmit={manejarEnvio}>
          <label>Tarea</label>
          <textarea
            className="textarea-tarea"
            placeholder="Escriba la tarea..."
            rows={8}
            value={input}
            onChange={(e) => { manejarCambio(e) }}
            autoFocus
          />
          <p className="mensaje-error">
            {error < 3 ? `Ingresa al menos 3 caracteres (llevas ${error}).` : ``}
          </p>

          <label>Categoria</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="botones-modal">
            <button type="button" className="boton-cancelar" onClick={cerrar}>
              Cancelar
            </button>
            <button type="submit" className="boton-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalTarea;
