import React, { useState } from 'react';
import Pie from './Pie';
import Cabecera from './Cabecera';
import './Parte1.css';

const Formulario = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3080/api/formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: formData.email,
          contra: formData.password
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data.msg);
      } else {
        window.location.href = '/DatosRegistroUsuario'; 
      }
    } catch (err) {
      console.error('Error del servidor:', err);
    }
  };

  const handleCancel = () => {
    window.location.href = './';
  };

  return (
    <>
      <Cabecera />
      <div className="contenedor-todo">
        <div className="caja-trasera">
          <div className="caja-trasera-login">
            <h3>¿Ya tiene una cuenta?</h3>
            <p>Iniciar sesión para ingresar</p>
            <button id="btn-iniciar-sesion">Iniciar Sesión</button>
            <a href="./Recuperar">¿Olvidó su contraseña?</a>
          </div>
          <div className="caja-trasera-registro">
            <h3>¿Aún no tiene cuenta?</h3>
            <p>Regístrese para ingresar.</p>
            <a href="./Registro">Registro</a>
            <br />
            <a href="./Recuperar">¿Olvidó su contraseña?</a>
          </div>
        </div>

        <div className="contenedor-login-registro">
          <form onSubmit={handleSubmit} className="formulario-login">
            <h2>¡Bienvenido!</h2>
            <h2>Ingrese sus datos para iniciar sesión</h2>
            <input 
              type="email" 
              name="email" 
              placeholder="Correo electrónico" 
              value={formData.email} 
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
            <button type="submit" id="enviar" onClick={handleSubmit}>Enviar</button>
            <button type="reset" id="cancelar" onClick={handleCancel}>Cancelar</button>
          </form>
        </div>
      </div>
      <Pie />
    </>
  );
};

export default Formulario;
