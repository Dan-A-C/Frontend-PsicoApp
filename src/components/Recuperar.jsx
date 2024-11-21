import React, { useState } from 'react';
import Pie from './Pie';
import Cabecera from './Cabecera';
import './Parte1.css';

const Recuperar = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3080/api/recuperar', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        window.location.href = '/CambiarContrasena';
      } else {
        const data = await res.json();
        console.error(data.error);
      }
    } catch (err) {
      console.error('Error del servidor:', err);
    }
  };

  const handleCancel = () => {
    window.location.href = '/Formulario';
  };

  return (
    <>
      <Cabecera />
      <div className="contenedor-todo">
        <div className="caja-trasera">
          <div className="caja-trasera-login">
            <h3>¿Ya tiene una cuenta?</h3>
            <p>Iniciar sesión para ingresar</p>
            <a href="./Formulario">Iniciar Sesión</a>
            <br />
            <a href="./Recuperar">¿Olvidó su contraseña?</a>
          </div>
          <div className="caja-trasera-registro">
            <h3>¿Aún no tiene cuenta?</h3>
            <p>Regístrese para ingresar.</p>
            <a href="./Registro">Registro</a>
            <h3>¿Desea iniciar Sesión?</h3>
            <a href="./Formulario">Haga click aquí.</a>
          </div>
        </div>

        <div className="contenedor-login-registro">
          <form onSubmit={handleSubmit} className="formulario-login">
            <h2>Recupere su contraseña</h2>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
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

export default Recuperar;
