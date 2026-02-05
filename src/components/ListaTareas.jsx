import React,{useState} from "react"
import Tarea from "./Tarea"

function listaTareas() {
  const listaDeTareas = [
    {
      texto: "BANANA",
      completado: false,
      id: 1,
    },
    {
      texto: "MANZANA",
      completado: false,
      id: 2,
    },
    {
      texto: "ANANA",
      completado: true,
      id: 3,
    },
  ];

  const [tareas, setTareas] = useState(listaDeTareas);

  const completar = (id) => {
    tareas.find((tarea) => {
      if (tarea.id === id) {
        tarea.completado = !tarea.completado;
      }
    });
    setTareas([...tareas]);
  };

  const eliminar = (id) => {
    const tareasActualizadas = tareas.filter((tarea) => {
      if (tarea.id !== id) {
        return tarea;
      }
    });
    setTareas(tareasActualizadas);
  };

  return (
    <div className="">
      {tareas.map((tarea) => (
        <Tarea
          key={tarea.id}
          id={tarea.id}
          texto={tarea.texto}
          completado={tarea.completado}
          completar={completar}
          eliminar={eliminar}
        />
      ))}
    </div>
  );
}

export default listaTareas