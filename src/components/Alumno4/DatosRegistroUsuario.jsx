import React, { useState, useEffect } from 'react';
import Pie from "../Pie";
import Cabecera from '../Cabecera';
import "../Parte1.css";
import '../styles/alumno4/DatosRegistroUsuario.css';

function DatosRegistroUsuario() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    // Aquí deberías obtener el ID del usuario de alguna manera, por ejemplo del contexto de autenticación
    const userId = 1; // Cambia esto según sea necesario

    fetch(`/api/alumno4/usuario/${userId}`)
      .then(response => response.json())
      .then(data => {
        setNombre(data.nombre);
        setApellido(data.apellido);
        setCorreo(data.correo);
      })
      .catch(error => console.error('Error al cargar los datos del usuario:', error));
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const payload = { nombre, apellido, correo };

    try {
      const response = await fetch(`/api/alumno4/usuario/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar los datos del usuario");
      }
      alert("Datos actualizados exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar los datos del usuario");
    }
  };

  return (
    <>
      <Cabecera />
      <div className="admin-container">
        <div className="sidebar">
          <h2>Mi Cuenta</h2>
          <ul>
            <li><a href="/ordenes-recientes">Órdenes Recientes</a></li>
            <li><a href="/datos-registro">Datos de Registro</a></li>
            <li><a href="/cambiar-password">Cambiar Password</a></li>
          </ul>
        </div>
        <div className="content">
          <h1>Datos de Registro</h1>
          <form onSubmit={manejarSubmit} className="datos-registro-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Actualizar</button>
          </form>
        </div>
      </div>
      <Pie />
    </>
  );
}

export default DatosRegistroUsuario;
