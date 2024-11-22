import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SolicitarCita = () => {
  const [psicologos, setPsicologos] = useState([]);
  const [cita, setCita] = useState({
    psicologoId: '',
    fecha: '',
    hora: '',
    motivo: '',
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Cargar la lista de psicólogos al montar el componente
    const fetchPsicologos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/psicologos');
        setPsicologos(response.data);
      } catch (err) {
        console.error('Error al obtener los psicólogos:', err);
      }
    };

    fetchPsicologos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCita({ ...cita, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/citas', cita);
      setMensaje('Cita reservada exitosamente.');
      setCita({ psicologoId: '', fecha: '', hora: '', motivo: '' });
    } catch (err) {
      console.error('Error al reservar la cita:', err);
      setMensaje('Error al reservar la cita.');
    }
  };

  return (
    <div>
      <h2>Solicitar Cita</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Psicólogo:</label>
          <select
            name="psicologoId"
            value={cita.psicologoId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un psicólogo</option>
            {psicologos.map((psicologo) => (
              <option key={psicologo.id} value={psicologo.id}>
                {psicologo.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={cita.fecha}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Hora:</label>
          <input
            type="time"
            name="hora"
            value={cita.hora}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Motivo:</label>
          <textarea
            name="motivo"
            value={cita.motivo}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Reservar Cita</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default SolicitarCita;
