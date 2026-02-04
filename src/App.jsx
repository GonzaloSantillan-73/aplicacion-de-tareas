import React,{useState} from "react"
import Tarea from "./components/Tarea"

function App() {

  const listaDeTareas=[
    {
      texto:"banana",
      completado:false,
      id:1
    },
        {
      texto:"manzana",
      completado:false,
      id:2
    },
        {
      texto:"anana",
      completado:true,
      id:3
    }
  ]

  const [tareas,setTareas] = useState(listaDeTareas)

  const completar = (id) => {
    tareas.find((tarea)=>{
      if (tarea.id===id){
        tarea.completado=!tarea.completado
      }
    })
    setTareas([...tareas])
  }

  return (
    <>
      {
        tareas.map(tarea=>
          <Tarea
            key={tarea.id}
            id={tarea.id}
            texto={tarea.texto}
            completado={tarea.completado}
            completar={completar}
          />
        )
      }
    </>
  )
}

export default App
