import React, { useState } from 'react';

const CrearRutina = () => {
  const [rutina, setRutina] = useState({
    descripcion: '',
    pacienteId: '',
    psicologoId: '',
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRutina({ ...rutina, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/rutina', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rutina),
      });

      if (!response.ok) {
        throw new Error('Error al crear la rutina');
      }

      setMensaje('Rutina creada exitosamente.');
      setRutina({ descripcion: '', pacienteId: '', psicologoId: '' });
    } catch (error) {
      console.error('Error al crear la rutina:', error);
      setMensaje('Error al crear la rutina.');
    }
  };

  return (
    <div>
      <h2>Crear Nueva Rutina</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={rutina.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ID del Paciente:</label>
          <input
            type="number"
            name="pacienteId"
            value={rutina.pacienteId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ID del Psicólogo:</label>
          <input
            type="number"
            name="psicologoId"
            value={rutina.psicologoId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Rutina</button>
      </form>
    </div>
  );
};

export default CrearRutina;
