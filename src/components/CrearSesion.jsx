import React, { useState } from 'react';
import axios from 'axios';

const CrearSesion = () => {
  const [sesion, setSesion] = useState({
    fecha: '',
    hora: '',
    pacienteId: '',
    psicologoId: '',
    linkVideollamada: '',
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSesion({ ...sesion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/sesiones', sesion);
      setMensaje('Sesión creada exitosamente.');
      setSesion({ fecha: '', hora: '', pacienteId: '', psicologoId: '', linkVideollamada: '' });
    } catch (err) {
      console.error('Error al crear la sesión:', err);
      setMensaje('Error al crear la sesión.');
    }
  };

  return (
    <div>
      <h2>Crear Nueva Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha:</label>
          <input type="date" name="fecha" value={sesion.fecha} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora:</label>
          <input type="time" name="hora" value={sesion.hora} onChange={handleChange} required />
        </div>
        <div>
          <label>ID del Paciente:</label>
          <input type="text" name="pacienteId" value={sesion.pacienteId} onChange={handleChange} required />
        </div>
        <div>
          <label>ID del Psicólogo:</label>
          <input type="text" name="psicologoId" value={sesion.psicologoId} onChange={handleChange} required />
        </div>
        <div>
          <label>Enlace de Videollamada:</label>
          <input type="url" name="linkVideollamada" value={sesion.linkVideollamada} onChange={handleChange} />
        </div>
        <button type="submit">Crear Sesión</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearSesion;
