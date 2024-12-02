import React, { useState, useEffect } from 'react';

const Rutinas = ({ pacienteId }) => {
  const [rutinas, setRutinas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetchRutinas();
  }, []);

  const fetchRutinas = async () => {
    try {
      const response = await fetch(`/api/rutina/paciente/${pacienteId}`);
      if (!response.ok) {
        throw new Error('Error al obtener las rutinas');
      }
      const data = await response.json();
      setRutinas(data);
    } catch (error) {
      console.error('Error al obtener las rutinas:', error);
      setMensaje('No se pudieron cargar las rutinas.');
    }
  };

  return (
    <div>
      <h2>Rutinas del Paciente</h2>
      {mensaje && <p>{mensaje}</p>}
      <ul>
        {rutinas.map((rutina) => (
          <li key={rutina.id}>
            {rutina.descripcion} - Psicólogo: {rutina.Psicologo?.nombre} {rutina.Psicologo?.apellido}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rutinas;
