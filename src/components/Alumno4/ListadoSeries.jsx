import React, { useEffect, useState } from 'react';
import Pie from "../Pie";
import Cabecera from '../Cabecera';
import "../Parte1.css";
import '../styles/alumno4/ListadoSeries.css';

function ListadoSeries() {
  const [series, setSeries] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("/api/alumno4/series")
      .then(response => response.json())
      .then(data => setSeries(data))
      .catch(error => console.error('Error al cargar las series:', error));
  }, []);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const seriesFiltradas = series.filter(serie =>
    serie.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    serie.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Cabecera />
      <div className="listado-series-container">
        <h1>Listado de Series</h1>
        <input
          type="text"
          placeholder="Buscar series..."
          value={busqueda}
          onChange={manejarBusqueda}
          className="buscar-series-input"
        />
        <div className="series-grid">
          {seriesFiltradas.map((serie, index) => (
            <div key={index} className="serie-card">
              <img src={serie.imagen} alt={serie.nombre} className="serie-imagen" />
              <h2>{serie.nombre}</h2>
              <p>{serie.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
      <Pie />
    </>
  );
}

export default ListadoSeries;
