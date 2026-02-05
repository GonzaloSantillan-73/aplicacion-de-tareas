import React,{useState} from "react"
import ListaTareas from "./components/ListaTareas"
import "./app.css"

function App() {
  return (
    <div className="contenedor-todo">
      <ListaTareas/>
    </div>
  )
}

export default App
