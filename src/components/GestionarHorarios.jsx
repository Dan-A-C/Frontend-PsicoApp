import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Horario = () => {
  const [horarios, setHorarios] = useState([]);
  const [nuevoHorario, setNuevoHorario] = useState({
    fecha: '',
    hora: '',
  });

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    try {
      const response = await axios.get('/api/horario');
      setHorarios(response.data);
    } catch (error) {
      console.error('Error al obtener los horarios:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoHorario({ ...nuevoHorario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/horario', nuevoHorario);
      fetchHorarios();
      setNuevoHorario({ fecha: '', hora: '' });
    } catch (error) {
      console.error('Error al crear el horario:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Horarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="fecha"
          value={nuevoHorario.fecha}
          onChange={handleChange}
        />
        <input
          type="time"
          name="hora"
          value={nuevoHorario.hora}
          onChange={handleChange}
        />
        <button type="submit">Crear Horario</button>
      </form>

      <h3>Lista de Horarios</h3>
      <ul>
        {horarios.map((horario) => (
          <li key={horario.id}>
            {horario.fecha} - {horario.hora}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Horario;
