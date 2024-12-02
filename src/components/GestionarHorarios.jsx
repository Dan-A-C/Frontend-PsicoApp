import React, { useState, useEffect } from 'react';

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
      const response = await fetch('/api/horario'); // GET request
      if (!response.ok) {
        throw new Error('Error al obtener los horarios');
      }
      const data = await response.json();
      setHorarios(data);
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
      const response = await fetch('/api/horario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoHorario),
      });

      if (!response.ok) {
        throw new Error('Error al crear el horario');
      }

      fetchHorarios(); // Actualiza la lista de horarios
      setNuevoHorario({ fecha: '', hora: '' }); // Reinicia el formulario
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
