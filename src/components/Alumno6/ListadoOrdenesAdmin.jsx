import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/Alumno6/ListadoOrdenesAdmin.css';
import Pie from "../Pie";
import Cabecera from '../Cabecera';
import "../Parte1.css";

function ListadoOrdenesAdmin() {
  const [ordenes, setOrdenes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("/api/alumno6/ordenes")
      .then(response => response.json())
      .then(data => setOrdenes(data))
      .catch(error => console.error('Error al cargar las órdenes:', error));
  }, []);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const ordenesFiltradas = ordenes.filter(orden =>
    orden.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
    orden.id.toString().includes(busqueda)
  );

  return (
    <>
      <Cabecera />
      <div className="listado-ordenes-container">
        <h1>Órdenes</h1>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido de usuario o nro de orden..."
          value={busqueda}
          onChange={manejarBusqueda}
          className="buscar-ordenes-input"
        />
        <table className="ordenes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Fecha de Orden</th>
              <th>Total</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenesFiltradas.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.usuario}</td>
                <td>{orden.fecha}</td>
                <td>S/ {orden.total}</td>
                <td>{orden.correo}</td>
                <td>{orden.estado}</td>
                <td><a href={`/detalle-orden-admin/${orden.id}`}>Ver</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pie />
    </>
  );
}

export default ListadoOrdenesAdmin;