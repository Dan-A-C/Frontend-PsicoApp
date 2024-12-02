import React, { useState } from 'react';

const CrearReporte = () => {
  const [reporte, setReporte] = useState({
    sesionId: '',
    tipo: '',
    descripcion: '',
    sugerencia: '',
    pacienteId: '',
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReporte({ ...reporte, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reporte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reporte),
      });

      if (!response.ok) {
        throw new Error('Error al crear el reporte');
      }

      setMensaje('Reporte creado exitosamente.');
      setReporte({ sesionId: '', tipo: '', descripcion: '', sugerencia: '', pacienteId: '' });
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      setMensaje('Error al crear el reporte.');
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Reporte</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID de la Sesión:</label>
          <input
            type="number"
            name="sesionId"
            value={reporte.sesionId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo:</label>
          <input
            type="text"
            name="tipo"
            value={reporte.tipo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={reporte.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sugerencia:</label>
          <textarea
            name="sugerencia"
            value={reporte.sugerencia}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ID del Paciente:</label>
          <input
            type="number"
            name="pacienteId"
            value={reporte.pacienteId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Reporte</button>
      </form>
    </div>
  );
};

export default CrearReporte;
