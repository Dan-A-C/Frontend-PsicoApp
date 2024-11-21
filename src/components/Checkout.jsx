import React, { useState, useEffect } from 'react';
import Pie from './Pie';
import Cabecera from './Cabecera';
import { Link } from "react-router-dom";
const Checkout = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [direccionEnvio, setDireccionEnvio] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [metodoEnvio, setMetodoEnvio] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('checkoutProductosCarrito')) || [];
    setProductosCarrito(productosGuardados);
    const totalCarrito = productosGuardados.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    setTotal(totalCarrito);
  }, []);

  const handleCrearPedido = async () => {
    const nuevoPedido = {
      productos: productosCarrito,
      direccionEnvio,
      metodoPago,
      metodoEnvio,
      total,
    };

    await fetch('http://localhost:3080/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPedido)
    });

    alert('Pedido creado exitosamente');
    setProductosCarrito([]);
    setDireccionEnvio('');
    setMetodoPago('');
    setMetodoEnvio('');
    setTotal(0);
  };

  return (
    <>
      <Cabecera />
      <div className="checkout">
        <h2>Checkout</h2>
        <div className="informacion-compra">
          <h3>Información de la compra</h3>
          {productosCarrito.length === 0 ? (
            <p>No hay productos en el carrito de compras.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {productosCarrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>S/{producto.precio.toFixed(2)}</td>
                    <td>{producto.cantidad}</td>
                    <td>S/{(producto.precio * producto.cantidad).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"></td>
                  <td>Total:</td>
                  <td>S/{total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
        <div className="informacion-envio">
          <h3>Información de Envío</h3>
          <label htmlFor="direccionEnvio">Dirección de Envío:</label>
          <input
            type="text"
            id="direccionEnvio"
            value={direccionEnvio}
            onChange={(e) => setDireccionEnvio(e.target.value)}
          />
        </div>
        <div className="informacion-pago">
          <h3>Información de Pago</h3>
          <label htmlFor="metodoPago">Método de Pago:</label>
          <select
            id="metodoPago"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="">Selecciona un método de pago</option>
            <option value="tarjeta">Tarjeta de Crédito/Débito</option>
            <option value="paypal">PayPal</option>
            <option value="transferencia">Transferencia Bancaria</option>
          </select>
        </div>
        <div className="informacion-envio">
          <h3>Método de Envío</h3>
          <label htmlFor="metodoEnvio">Método de Envío:</label>
          <select
            id="metodoEnvio"
            value={metodoEnvio}
            onChange={(e) => setMetodoEnvio(e.target.value)}
          >
            <option value="">Selecciona un método de envío</option>
            <option value="estandar">Envío Estándar</option>
            <option value="express">Envío Express</option>
          </select>
        </div>
        <div className="crear-pedido">
          <button onClick={handleCrearPedido} disabled={productosCarrito.length === 0}>
            Crear Pedido
          </button>
          <button><Link to="/pedido_completo">Completar Orden</Link> </button>
        </div>
      </div>
      <Pie />
    </>
  );
};

export default Checkout;
