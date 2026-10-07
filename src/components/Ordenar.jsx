import React from "react"
import "../styles/Herramientas.css"

function Ordenar({
  categorias,
  filtroCategoria,
  setFiltroCategoria,
  criterio,
  setCriterio,
  direccion,
  setDireccion,
}) {
  return (
    <div className="ordenar">
      <select
        value={filtroCategoria}
        onChange={(e) => setFiltroCategoria(e.target.value)}
      >
        <option value="Todas">Todas las categorias</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select value={criterio} onChange={(e) => setCriterio(e.target.value)}>
        <option value="creada">Fecha de creacion</option>
        <option value="actualizada">Ultima actualizacion</option>
        <option value="alfabetico">A - Z</option>
      </select>

      <select value={direccion} onChange={(e) => setDireccion(e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
}

export default Ordenar
