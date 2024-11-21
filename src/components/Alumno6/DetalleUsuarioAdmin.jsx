import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import '../styles/Alumno6/DetalleUsuarioAdmin.css';
import Pie from "../Pie";
import Cabecera from '../Cabecera';
import "../Parte1.css";

function DetalleUsuarioAdmin() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch(`/api/alumno6/usuario/${id}`)
      .then(response => response.json())
      .then(data => setUsuario(data))
      .catch(error => console.error('Error al cargar los detalles del usuario:', error));
  }, [id]);

  if (!usuario) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <Cabecera />
      <div className="detalle-usuario-container">
        <h1>Detalle de Usuario Registrado</h1>
        <div className="detalle-usuario-info">
          <p>ID: {usuario.id}</p>
          <p>Nombre: {usuario.nombre}</p>
          <p>Correo: {usuario.correo}</p>
          <p>Fecha de Registro: {usuario.fechaRegistro}</p>
        </div>
        <h2>Órdenes recientes (máximo 10)</h2>
        <table className="ordenes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha de Orden</th>
              <th>Total</th>
              <th>Productos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuario.ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.fecha}</td>
                <td>S/ {orden.total}</td>
                <td>{orden.productos}</td>
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

export default DetalleUsuarioAdmin;