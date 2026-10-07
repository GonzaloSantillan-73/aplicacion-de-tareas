import React from "react"
import "../styles/Herramientas.css"
import { IoSearchOutline } from "react-icons/io5";

function Buscador({ busqueda, setBusqueda }) {
  return (
    <div className="buscador">
      <IoSearchOutline size={22} />
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}

export default Buscador
