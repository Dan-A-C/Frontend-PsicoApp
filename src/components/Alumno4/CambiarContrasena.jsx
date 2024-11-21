import React, { useState } from 'react';
import Pie from "../Pie";
import Cabecera from '../Cabecera';
import "../Parte1.css";
import '../styles/alumno4/CambiarContrasena.css';

function CambiarContrasena() {
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (nuevaContrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const payload = {
      contrasenaActual,
      nuevaContrasena,
    };

    try {
      const response = await fetch("/api/alumno4/cambiar-contrasena", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error al cambiar la contraseña");
      }
      alert("Contraseña cambiada exitosamente");
      // Resetear el formulario
      setContrasenaActual("");
      setNuevaContrasena("");
      setConfirmarContrasena("");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cambiar la contraseña");
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
          <h1>Cambiar Password</h1>
          <form onSubmit={manejarSubmit} className="cambiar-contrasena-form">
            <div className="form-group">
              <input
                type="password"
                placeholder="Actual"
                value={contrasenaActual}
                onChange={(e) => setContrasenaActual(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Nuevo"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Repetir"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Cambiar</button>
          </form>
        </div>
      </div>
      <Pie />
    </>
  );
}

export default CambiarContrasena;
