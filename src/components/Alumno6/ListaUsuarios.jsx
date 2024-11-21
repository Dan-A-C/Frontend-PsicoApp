import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/Alumno6/ListaUsuarios.css';
import Pie from "../Pie";
import Cabecera from '../Cabecera';
import "../Parte1.css";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("/api/alumno6/usuarios")
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al cargar los usuarios:', error));
  }, []);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Cabecera />
      <div className="listado-usuarios-container">
        <h1>Usuarios registrados</h1>
        <input
          type="text"
          placeholder="Buscar por correo, nombre o apellidos..."
          value={busqueda}
          onChange={manejarBusqueda}
          className="buscar-usuarios-input"
        />
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Fecha de Registro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.fechaRegistro}</td>
                <td>{usuario.estado}</td>
                <td>
                  <a href={`/detalle-usuario-admin/${usuario.id}`}>Ver</a>
                  <button className="activar-desactivar-btn">
                    {usuario.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pie />
    </>
  );
}

export default ListaUsuarios;