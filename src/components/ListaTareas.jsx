import React, { useState, useEffect } from "react"
import Tarea from "./Tarea"
import InputTareas from "./InputTareas"
import Buscador from "./Buscador"
import Ordenar from "./Ordenar"
import Categorias from "./Categorias"
import Papelera from "./Papelera"

const TREINTA_DIAS = 30 * 24 * 60 * 60 * 1000;

// trae lo guardado en localStorage, si no hay nada devuelve el valor por defecto
const leerLocal = (clave, valorPorDefecto) => {
  const guardado = localStorage.getItem(clave);
  if (guardado) {
    return JSON.parse(guardado);
  }
  return valorPorDefecto;
};

function ListaTareas() {
  const [tareas, setTareas] = useState(() => leerLocal("tareas", []));
  const [categorias, setCategorias] = useState(() =>
    leerLocal("categorias", ["General"])
  );
  // al cargar la papelera saco las tareas que tienen mas de 30 dias
  const [papelera, setPapelera] = useState(() => {
    const ahora = Date.now();
    return leerLocal("papelera", []).filter(
      (tarea) => ahora - tarea.fechaEliminada < TREINTA_DIAS
    );
  });

  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [criterio, setCriterio] = useState("creada");
  const [direccion, setDireccion] = useState("desc");
  const [verPapelera, setVerPapelera] = useState(false);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  useEffect(() => {
    localStorage.setItem("papelera", JSON.stringify(papelera));
  }, [papelera]);

  const agregarTarea = (tareaNueva) => {
    setTareas([tareaNueva, ...tareas]);
  };

  const completar = (id) => {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completado: !tarea.completado, actualizada: Date.now() };
      }
      return tarea;
    });
    setTareas(tareasActualizadas);
  };

  const editar = (id, textoNuevo, categoriaNueva) => {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return {
          ...tarea,
          texto: textoNuevo,
          categoria: categoriaNueva,
          actualizada: Date.now(),
        };
      }
      return tarea;
    });
    setTareas(tareasActualizadas);
  };

  // no se borra de una, se manda a la papelera
  const eliminar = (id) => {
    const tareaEliminada = tareas.find((tarea) => tarea.id === id);
    setTareas(tareas.filter((tarea) => tarea.id !== id));
    setPapelera([{ ...tareaEliminada, fechaEliminada: Date.now() }, ...papelera]);
  };

  const restaurar = (id) => {
    const tareaRestaurada = { ...papelera.find((tarea) => tarea.id === id) };
    delete tareaRestaurada.fechaEliminada;
    setPapelera(papelera.filter((tarea) => tarea.id !== id));
    setTareas([tareaRestaurada, ...tareas]);
  };

  const eliminarDefinitivo = (id) => {
    setPapelera(papelera.filter((tarea) => tarea.id !== id));
  };

  const vaciarPapelera = () => {
    if (window.confirm("¿Seguro que queres vaciar la papelera?")) {
      setPapelera([]);
    }
  };

  const crearCategoria = (nombre) => {
    if (categorias.includes(nombre)) {
      alert("Esa categoria ya existe");
      return;
    }
    setCategorias([...categorias, nombre]);
  };

  // primero filtro por busqueda y categoria, despues ordeno
  let tareasMostradas = tareas.filter((tarea) =>
    tarea.texto.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (filtroCategoria !== "Todas") {
    tareasMostradas = tareasMostradas.filter(
      (tarea) => tarea.categoria === filtroCategoria
    );
  }

  tareasMostradas = [...tareasMostradas].sort((a, b) => {
    let resultado = 0;
    if (criterio === "alfabetico") {
      resultado = a.texto.localeCompare(b.texto);
    } else if (criterio === "actualizada") {
      resultado = a.actualizada - b.actualizada;
    } else {
      resultado = a.creada - b.creada;
    }
    return direccion === "asc" ? resultado : -resultado;
  });

  if (verPapelera) {
    return (
      <Papelera
        papelera={papelera}
        restaurar={restaurar}
        eliminarDefinitivo={eliminarDefinitivo}
        vaciarPapelera={vaciarPapelera}
        volver={() => setVerPapelera(false)}
      />
    );
  }

  return (
    <div>
      <InputTareas agregarTarea={agregarTarea} categorias={categorias} />
      <Categorias crearCategoria={crearCategoria} />
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
      <Ordenar
        categorias={categorias}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        criterio={criterio}
        setCriterio={setCriterio}
        direccion={direccion}
        setDireccion={setDireccion}
      />

      <button className="boton-papelera" onClick={() => setVerPapelera(true)}>
        Ver papelera ({papelera.length})
      </button>

      {tareasMostradas.length === 0 && (
        <p className="sin-tareas">No hay tareas para mostrar</p>
      )}

      {tareasMostradas.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          categorias={categorias}
          completar={completar}
          eliminar={eliminar}
          editar={editar}
        />
      ))}
    </div>
  );
}

export default ListaTareas
