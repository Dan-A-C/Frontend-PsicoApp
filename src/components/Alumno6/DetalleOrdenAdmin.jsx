import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Alumno6/DetalleOrdenAdmin.css';
import Pie from "../Pie";
import Cabecera from '../Cabecera';
import "../Parte1.css";

function DetalleOrdenAdmin() {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    fetch(`/api/alumno6/pedido/${id}`)
      .then(response => response.json())
      .then(data => setOrden(data))
      .catch(error => console.error('Error al cargar los detalles del pedido:', error));
  }, [id]);

  if (!orden) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <Cabecera />
      <div className="detalle-orden-container">
        <h1>Detalles de Orden Nro {orden.id}</h1>
        <div className="detalle-orden-seccion">
          <h2>Datos de compra</h2>
          <div className="detalle-orden-info">
            <div>
              <h3>Dirección de Envío</h3>
              <p>{orden.direccionEnvio}</p>
            </div>
            <div>
              <h3>Pago</h3>
              <p>{orden.metodoPago}</p>
              <p>Tarjeta de Crédito que termina en: {orden.terminaEn}</p>
            </div>
          </div>
        </div>
        <div className="detalle-orden-seccion">
          <h2>Método de Envío</h2>
          <p>{orden.metodoEnvio}</p>
        </div>
        <div className="detalle-orden-seccion">
          <h2>Items en Pedido:</h2>
          <ul>
            {orden.productos.map((producto, index) => (
              <li key={index}>{producto.cantidad} x {producto.nombre} - S/ {producto.precio}</li>
            ))}
          </ul>
        </div>
        <div className="detalle-orden-seccion">
          <h2>Resumen de Orden</h2>
          <p>Subtotal: S/ {orden.subtotal}</p>
          <p>Envío: S/ {orden.envio}</p>
          <p>Impuestos: S/ {orden.impuestos}</p>
          <h3>Total: S/ {orden.total}</h3>
        </div>
        <button className="cancelar-btn">Cancelar Pedido</button>
      </div>
      <Pie />
    </>
  );
}

export default DetalleOrdenAdmin;