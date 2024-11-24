import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reporte = () => {
  const [reportes, setReportes] = useState([]);
  const [nuevoReporte, setNuevoReporte] = useState({
    sesionId: '',
    tipo: '',
    descripcion: '',
    sugerencia: '',
    pacienteId: '',
  });

  useEffect(() => {
    fetchReportes();
  }, []);

  const fetchReportes = async () => {
    try {
      const response = await axios.get('/api/reporte');
      setReportes(response.data);
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoReporte({ ...nuevoReporte, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reporte', nuevoReporte);
      fetchReportes();
      setNuevoReporte({
        sesionId: '',
        tipo: '',
        descripcion: '',
        sugerencia: '',
        pacienteId: '',
      });
    } catch (error) {
      console.error('Error al crear el reporte:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Reportes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="sesionId"
          value={nuevoReporte.sesionId}
          placeholder="ID de la Sesión"
          onChange={handleChange}
        />
        <input
          type="text"
          name="tipo"
          value={nuevoReporte.tipo}
          placeholder="Tipo de reporte"
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          value={nuevoReporte.descripcion}
          placeholder="Descripción"
          onChange={handleChange}
        />
        <textarea
          name="sugerencia"
          value={nuevoReporte.sugerencia}
          placeholder="Sugerencia"
          onChange={handleChange}
        />
        <input
          type="number"
          name="pacienteId"
          value={nuevoReporte.pacienteId}
          placeholder="ID del Paciente"
          onChange={handleChange}
        />
        <button type="submit">Crear Reporte</button>
      </form>

      <h3>Lista de Reportes</h3>
      <ul>
        {reportes.map((reporte) => (
          <li key={reporte.id}>
            Sesión: {reporte.sesionId} - Tipo: {reporte.tipo} - Descripción: {reporte.descripcion} - Sugerencia: {reporte.sugerencia} - Paciente: {reporte.pacienteId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reporte;
