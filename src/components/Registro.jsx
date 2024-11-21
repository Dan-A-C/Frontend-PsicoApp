import React, { useState } from 'react';
import Pie from './Pie';
import Cabecera from './Cabecera';
import './Parte1.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    usuario: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3080/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          usuario: formData.usuario,
          correo: formData.email,
          contra: formData.password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        window.location.href = './Formulario';
      } else {
        console.error(data.msg);
      }
    } catch (err) {
      console.error('Error del servidor:', err);
    }
  };

  const handleCancel = () => {
    window.location.href = './Formulario';
  };

  return (
    <>
      <Cabecera />
      <div className="contenedor-todo">
        <div className="caja-trasera">
          <div className="caja-trasera-login">
            <p>Iniciar sesión para</p>
            <a href="./Formulario">Iniciar Sesión</a>
            <br />
            <a href="/Recuperar">¿Olvido su contraseña?</a>
          </div>
          <div className="caja-trasera-registro">
            <h3>¿ya tiene una cuenta?</h3>
            <a href="./Formulario">Ingrese aquí</a>
            <p>¿Olvido su contraseña?</p>
            <a href="./Recuperar">Recupérala Aquí.</a>
            <p>¿Desea volver al inicio?</p>
            <a href="./">Regrese Aquí</a>
          </div>
        </div>

        <div className="contenedor-login-registro">
          <form onSubmit={handleSubmit} className="formulario-login">
            <h2>Registrarse</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo:"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="usuario"
              placeholder="Usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" id="enviar">Enviar</button>
            <button type="button" id="cancelar" onClick={handleCancel}>Cancelar</button>
          </form>
        </div>
      </div>
      <Pie />
    </>
  );
};

export default Registro;
