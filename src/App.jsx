import React, { useState, useEffect } from "react"
import ListaTareas from "./components/ListaTareas"
import "./App.css"

function App() {
  const [modoOscuro, setModoOscuro] = useState(
    () => localStorage.getItem("modoOscuro") === "true"
  );

  // le pongo la clase al body asi cambia el fondo de toda la pagina
  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add("oscuro");
    } else {
      document.body.classList.remove("oscuro");
    }
    localStorage.setItem("modoOscuro", modoOscuro);
  }, [modoOscuro]);

  return (
    <div className="contenedor-todo">
      <ListaTareas
        modoOscuro={modoOscuro}
        cambiarModo={() => setModoOscuro(!modoOscuro)}
      />
    </div>
  )
}

export default App
