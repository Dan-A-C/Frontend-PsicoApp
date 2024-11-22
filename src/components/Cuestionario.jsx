import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Cargar las preguntas del cuestionario al montar el componente
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cuestionarios');
        setPreguntas(response.data);
        setRespuestas(Array(response.data.length).fill(null));
      } catch (err) {
        console.error('Error al obtener las preguntas:', err);
      }
    };

    fetchPreguntas();
  }, []);

  const handleChange = (index, value) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = value;
    setRespuestas(nuevasRespuestas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (respuestas.includes(null)) {
      setMensaje('Por favor, responda todas las preguntas.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/cuestionarios/respuestas', {
        respuestas,
      });
      setMensaje('Cuestionario enviado exitosamente.');
    } catch (err) {
      console.error('Error al enviar el cuestionario:', err);
      setMensaje('Error al enviar el cuestionario.');
    }
  };

  return (
    <div>
      <h2>Cuestionario</h2>
      <form onSubmit={handleSubmit}>
        {preguntas.map((pregunta, index) => (
          <div key={index}>
            <p>{pregunta.pregunta}</p>
            {[0, 1, 2, 3].map((opcion) => (
              <label key={opcion}>
                <input
                  type="radio"
                  name={`pregunta-${index}`}
                  value={opcion}
                  onChange={() => handleChange(index, opcion)}
                  required
                />
                {opcion}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Enviar Cuestionario</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Cuestionario;
