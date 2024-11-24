import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cita = () => {
  const [citas, setCitas] = useState([]);
  const [nuevaCita, setNuevaCita] = useState({
    fecha: '',
    hora: '',
    motivo: '',
  });

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await axios.get('/api/cita');
      setCitas(response.data);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  const handleChange = (e) => {
    setNuevaCita({ ...nuevaCita, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/cita', nuevaCita);
      fetchCitas();
      setNuevaCita({ fecha: '', hora: '', motivo: '' });
    } catch (error) {
      console.error('Error al crear la cita:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Citas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="fecha"
          value={nuevaCita.fecha}
          onChange={handleChange}
        />
        <input
          type="time"
          name="hora"
          value={nuevaCita.hora}
          onChange={handleChange}
        />
        <textarea
          name="motivo"
          value={nuevaCita.motivo}
          placeholder="Motivo"
          onChange={handleChange}
        />
        <button type="submit">Crear Cita</button>
      </form>

      <h3>Lista de Citas</h3>
      <ul>
        {citas.map((cita) => (
          <li key={cita.id}>
            {cita.fecha} - {cita.hora}: {cita.motivo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cita;
