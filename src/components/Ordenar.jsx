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
      <label>
        Categoria:
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="Todas">Todas</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <label>
        Ordenar por:
        <select value={criterio} onChange={(e) => setCriterio(e.target.value)}>
          <option value="creada">Fecha de creacion</option>
          <option value="actualizada">Ultima actualizacion</option>
          <option value="alfabetico">A - Z</option>
        </select>
      </label>

      <select value={direccion} onChange={(e) => setDireccion(e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
}

export default Ordenar
