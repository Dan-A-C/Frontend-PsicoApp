import React, { useState, useEffect } from 'react';

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
      const response = await fetch('/api/cita'); // GET request
      if (!response.ok) {
        throw new Error('Error al obtener las citas');
      }
      const data = await response.json();
      setCitas(data);
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
      const response = await fetch('/api/cita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaCita),
      });

      if (!response.ok) {
        throw new Error('Error al crear la cita');
      }

      fetchCitas(); // Actualiza la lista de citas
      setNuevaCita({ fecha: '', hora: '', motivo: '' }); // Reinicia el formulario
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
