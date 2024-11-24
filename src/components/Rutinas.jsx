import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rutina = () => {
  const [rutinas, setRutinas] = useState([]);
  const [nuevaRutina, setNuevaRutina] = useState({
    descripcion: '',
    pacienteId: '',
  });

  useEffect(() => {
    fetchRutinas();
  }, []);

  const fetchRutinas = async () => {
    try {
      const response = await axios.get('/api/rutina');
      setRutinas(response.data);
    } catch (error) {
      console.error('Error al obtener las rutinas:', error);
    }
  };

  const handleChange = (e) => {
    setNuevaRutina({ ...nuevaRutina, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/rutina', nuevaRutina);
      fetchRutinas();
      setNuevaRutina({ descripcion: '', pacienteId: '' });
    } catch (error) {
      console.error('Error al crear la rutina:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Rutinas</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="descripcion"
          value={nuevaRutina.descripcion}
          placeholder="Descripción de la Rutina"
          onChange={handleChange}
        />
        <input
          type="number"
          name="pacienteId"
          value={nuevaRutina.pacienteId}
          placeholder="ID del Paciente"
          onChange={handleChange}
        />
        <button type="submit">Crear Rutina</button>
      </form>

      <h3>Lista de Rutinas</h3>
      <ul>
        {rutinas.map((rutina) => (
          <li key={rutina.id}>
            {rutina.descripcion} - Paciente ID: {rutina.pacienteId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rutina;
