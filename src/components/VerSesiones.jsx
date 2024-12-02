import React, { useState, useEffect } from 'react';

const Sesiones = () => {
  const [sesiones, setSesiones] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetchSesiones();
  }, []);

  const fetchSesiones = async () => {
    try {
      const response = await fetch('/api/sesion');
      if (!response.ok) {
        throw new Error('Error al obtener las sesiones');
      }
      const data = await response.json();
      setSesiones(data);
    } catch (error) {
      console.error('Error al obtener las sesiones:', error);
      setMensaje('No se pudieron cargar las sesiones.');
    }
  };

  return (
    <div>
      <h2>Sesiones Programadas</h2>
      {mensaje && <p>{mensaje}</p>}
      <ul>
        {sesiones.map((sesion) => (
          <li key={sesion.id}>
            Fecha: {sesion.fecha}, Hora: {sesion.hora}, 
            Paciente: {sesion.Paciente?.nombre} {sesion.Paciente?.apellido}, 
            Psicólogo: {sesion.Psicologo?.nombre} {sesion.Psicologo?.apellido}, 
            Enlace: <a href={sesion.linkVideollamada} target="_blank" rel="noopener noreferrer">Videollamada</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sesiones;
