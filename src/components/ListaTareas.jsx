import React, { useState, useEffect } from "react"
import Tarea from "./Tarea"
import Buscador from "./Buscador"
import Ordenar from "./Ordenar"
import Papelera from "./Papelera"
import ModalTarea from "./ModalTarea"
import ModalCategoria from "./ModalCategoria"
import { FaRegTrashAlt } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";

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

  // para los modales
  const [mostrarModalTarea, setMostrarModalTarea] = useState(false);
  const [tareaEditando, setTareaEditando] = useState(null);
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  useEffect(() => {
    localStorage.setItem("papelera", JSON.stringify(papelera));
  }, [papelera]);

  const abrirNueva = () => {
    setTareaEditando(null);
    setMostrarModalTarea(true);
  };

  const abrirEditar = (tarea) => {
    setTareaEditando(tarea);
    setMostrarModalTarea(true);
  };

  const cerrarModalTarea = () => {
    setMostrarModalTarea(false);
    setTareaEditando(null);
  };

  // si hay una tarea editandose la actualizo, si no creo una nueva
  const guardarTarea = (texto, categoria) => {
    const ahora = Date.now();
    if (tareaEditando) {
      const tareasActualizadas = tareas.map((tarea) => {
        if (tarea.id === tareaEditando.id) {
          return { ...tarea, texto: texto, categoria: categoria, actualizada: ahora };
        }
        return tarea;
      });
      setTareas(tareasActualizadas);
    } else {
      const tareaNueva = {
        texto: texto,
        id: crypto.randomUUID(),
        completado: false,
        categoria: categoria,
        creada: ahora,
        actualizada: ahora,
      };
      setTareas([tareaNueva, ...tareas]);
    }
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

  // no se borra de una, se manda a la papelera
  const eliminar = (id) => {
    const tareaEliminada = tareas.find((tarea) => tarea.id === id);
    setTareas(tareas.filter((tarea) => tarea.id !== id));
    setPapelera([{ ...tareaEliminada, fechaEliminada: Date.now() }, ...papelera]);
  };

  const restaurar = (id) => {
    const tareaRestaurada = { ...papelera.find((tarea) => tarea.id === id) };
    delete tareaRestaurada.fechaEliminada;
    // por si mientras estaba en la papelera borraron su categoria
    if (!categorias.includes(tareaRestaurada.categoria)) {
      tareaRestaurada.categoria = "General";
    }
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
    setCategorias([...categorias, nombre]);
  };

  // las tareas que tenian esa categoria pasan a General
  const eliminarCategoria = (nombre) => {
    if (!window.confirm(`¿Eliminar la categoria "${nombre}"? Sus tareas pasan a General.`)) {
      return;
    }
    setCategorias(categorias.filter((cat) => cat !== nombre));
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.categoria === nombre) {
        return { ...tarea, categoria: "General" };
      }
      return tarea;
    });
    setTareas(tareasActualizadas);
    if (filtroCategoria === nombre) {
      setFiltroCategoria("Todas");
    }
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
      <header className="encabezado">
        <h1>Mis tareas</h1>
        <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
        <button
          className="boton-icono-papelera"
          title="Papelera"
          onClick={() => setVerPapelera(true)}
        >
          <FaRegTrashAlt size={22} />
          {papelera.length > 0 && (
            <span className="contador">{papelera.length}</span>
          )}
        </button>
      </header>

      <div className="barra-acciones">
        <div className="botones-crear">
          <button className="boton-principal" onClick={abrirNueva}>
            <IoAddOutline size={20} /> Agregar tarea
          </button>
          <button
            className="boton-secundario"
            onClick={() => setMostrarModalCategoria(true)}
          >
            <IoAddOutline size={20} /> Categorias
          </button>
        </div>
        <Ordenar
          categorias={categorias}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          criterio={criterio}
          setCriterio={setCriterio}
          direccion={direccion}
          setDireccion={setDireccion}
        />
      </div>

      {tareasMostradas.length === 0 && (
        <p className="sin-tareas">No hay tareas para mostrar</p>
      )}

      <div className="grilla-tareas">
        {tareasMostradas.map((tarea) => (
          <Tarea
            key={tarea.id}
            tarea={tarea}
            completar={completar}
            eliminar={eliminar}
            abrirEditar={abrirEditar}
          />
        ))}
      </div>

      {mostrarModalTarea && (
        <ModalTarea
          tareaEditando={tareaEditando}
          categorias={categorias}
          guardarTarea={guardarTarea}
          cerrar={cerrarModalTarea}
        />
      )}

      {mostrarModalCategoria && (
        <ModalCategoria
          categorias={categorias}
          crearCategoria={crearCategoria}
          eliminarCategoria={eliminarCategoria}
          cerrar={() => setMostrarModalCategoria(false)}
        />
      )}
    </div>
  );
}

export default ListaTareas
