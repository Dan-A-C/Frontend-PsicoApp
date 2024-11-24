import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sesion = () => {
  const [sesiones, setSesiones] = useState([]);
  const [nuevaSesion, setNuevaSesion] = useState({
    fecha: '',
    hora: '',
    psicologoId: '',
    pacienteId: '',
    horarioId: '',
    reporteProgreso: '',
    reporteEmociones: '',
    diagnosticoId: '',
  });

  useEffect(() => {
    fetchSesiones();
  }, []);

  const fetchSesiones = async () => {
    try {
      const response = await axios.get('/api/sesion');
      setSesiones(response.data);
    } catch (error) {
      console.error('Error al obtener las sesiones:', error);
    }
  };

  const handleChange = (e) => {
    setNuevaSesion({ ...nuevaSesion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/sesion', nuevaSesion);
      fetchSesiones();
      setNuevaSesion({
        fecha: '',
        hora: '',
        psicologoId: '',
        pacienteId: '',
        horarioId: '',
        reporteProgreso: '',
        reporteEmociones: '',
        diagnosticoId: '',
      });
    } catch (error) {
      console.error('Error al crear la sesión:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Sesiones</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="fecha"
          value={nuevaSesion.fecha}
          onChange={handleChange}
        />
        <input
          type="time"
          name="hora"
          value={nuevaSesion.hora}
          onChange={handleChange}
        />
        <input
          type="number"
          name="psicologoId"
          value={nuevaSesion.psicologoId}
          placeholder="ID del Psicólogo"
          onChange={handleChange}
        />
        <input
          type="number"
          name="pacienteId"
          value={nuevaSesion.pacienteId}
          placeholder="ID del Paciente"
          onChange={handleChange}
        />
        <input
          type="number"
          name="horarioId"
          value={nuevaSesion.horarioId}
          placeholder="ID del Horario"
          onChange={handleChange}
        />
        <textarea
          name="reporteProgreso"
          value={nuevaSesion.reporteProgreso}
          placeholder="Reporte de Progreso"
          onChange={handleChange}
        />
        <textarea
          name="reporteEmociones"
          value={nuevaSesion.reporteEmociones}
          placeholder="Reporte de Emociones"
          onChange={handleChange}
        />
        <input
          type="number"
          name="diagnosticoId"
          value={nuevaSesion.diagnosticoId}
          placeholder="ID del Diagnóstico"
          onChange={handleChange}
        />
        <button type="submit">Crear Sesión</button>
      </form>

      <h3>Lista de Sesiones</h3>
      <ul>
        {sesiones.map((sesion) => (
          <li key={sesion.id}>
            {sesion.fecha} - {sesion.hora} - Psicólogo: {sesion.psicologoId} - Paciente: {sesion.pacienteId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sesion;
