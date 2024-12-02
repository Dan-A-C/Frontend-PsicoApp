import React, { useState, useEffect } from 'react';

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetchReportes();
  }, []);

  const fetchReportes = async () => {
    try {
      const response = await fetch('/api/reporte'); // GET request
      if (!response.ok) {
        throw new Error('Error al obtener los reportes');
      }
      const data = await response.json();
      setReportes(data);
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
      setMensaje('No se pudieron cargar los reportes.');
    }
  };

  return (
    <div>
      <h2>Lista de Reportes</h2>
      {mensaje && <p>{mensaje}</p>}
      <ul>
        {reportes.map((reporte) => (
          <li key={reporte.id}>
            <strong>Tipo:</strong> {reporte.tipo} <br />
            <strong>Descripción:</strong> {reporte.descripcion} <br />
            <strong>Sugerencia:</strong> {reporte.sugerencia || 'Ninguna'} <br />
            <strong>Paciente ID:</strong> {reporte.pacienteId} <br />
            <strong>Sesión ID:</strong> {reporte.sesionId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reportes;
