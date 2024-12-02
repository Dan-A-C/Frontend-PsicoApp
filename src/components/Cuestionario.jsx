import React, { useState } from 'react';

const Cuestionario = () => {
  const [respuestas, setRespuestas] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const preguntas = [
    "Tener poco interés o placer en hacer las cosas.",
    "Sentirse desanimado/a, deprimido/a o sin esperanza.",
    "Con problemas en dormirse o en mantenerse dormido/a, o en dormir demasiado.",
    "Sentirse cansado/a o tener poca energía.",
    "Tener poco apetito o comer en exceso.",
    "Sentir falta de amor propio o sentir que ha decepcionado a otros.",
    "Tener dificultad para concentrarse en cosas tales como leer el periódico o mirar televisión."
  ];

  // Manejar cambios en las respuestas
  const handleChange = (e, preguntaIndex) => {
    const { value } = e.target;
    setRespuestas((prev) => ({ ...prev, [preguntaIndex]: parseInt(value, 10) }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      const response = await fetch('http://localhost:5000/cuestionario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          respuestas, 
          pacienteId: 1, // Cambiar por el ID dinámico del paciente autenticado si es necesario.
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje('Cuestionario enviado exitosamente.');
      } else {
        setMensaje('Error al enviar el cuestionario.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al enviar el cuestionario.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <h2>Test de Síntomas de Depresión</h2>
      <form onSubmit={handleSubmit}>
        {preguntas.map((pregunta, index) => (
          <div key={index}>
            <p>{index + 1}. {pregunta}</p>
            {[0, 1, 2, 3].map((opcion) => (
              <label key={opcion} style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name={`pregunta-${index}`}
                  value={opcion}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
                {opcion}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" disabled={cargando}>
          {cargando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Cuestionario;
