import React, { useEffect, useState } from 'react';
import Pie from './Pie';
import Cabecera from './Cabecera';
import { Link } from "react-router-dom";

function Carrito() {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [productosGuardados, setProductosGuardados] = useState([]);

  useEffect(() => {
    const fetchProductosCarrito = async () => {
      const response = await fetch('http://localhost:3080/api/carrito');
      const data = await response.json();
      setProductosCarrito(data);
    };
    const cargarProductosDesdeLocalStorage = () => {
      const productosGuardados = JSON.parse(localStorage.getItem('productosCarrito')) || [];
      setProductosCarrito(prevProductos => [...prevProductos, ...productosGuardados]);
      localStorage.removeItem('productosCarrito');
    };
    fetchProductosCarrito();
    cargarProductosDesdeLocalStorage();
  }, []);

  const handleEliminarProductoCarrito = async (idProducto) => {
    await fetch(`http://localhost:3080/api/carrito/${idProducto}`, { method: 'DELETE' });
    setProductosCarrito(productosCarrito.filter((producto) => producto.id !== idProducto));
  };

  const handleGuardarParaDespues = (idProducto) => {
    const producto = productosCarrito.find((producto) => producto.id === idProducto);
    if (producto) {
      setProductosCarrito(productosCarrito.filter((producto) => producto.id !== idProducto));
      setProductosGuardados([...productosGuardados, producto]);
    }
  };

  const handleMoverAlCarrito = (idProducto) => {
    const producto = productosGuardados.find((producto) => producto.id === idProducto);
    if (producto) {
      setProductosGuardados(productosGuardados.filter((producto) => producto.id !== idProducto));
      setProductosCarrito([...productosCarrito, producto]);
    }
  };

  const handleCambiarCantidad = async (idProducto, nuevaCantidad) => {
    const response = await fetch(`http://localhost:3080/api/carrito/${idProducto}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: nuevaCantidad })
    });
    const data = await response.json();
    setProductosCarrito(
      productosCarrito.map((producto) => (producto.id === idProducto ? data : producto))
    );
  };

  const calcularTotalCarrito = () => {
    return productosCarrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  const handleEliminarProductoGuardado = (idProducto) => {
    setProductosGuardados(productosGuardados.filter((producto) => producto.id !== idProducto));
  };

  return (
    <>
      <Cabecera />
      <div className="carrito-compras">
        <h2>Carrito de Compras</h2>
        <div className="productos-carrito">
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosCarrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>S/{producto.precio.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        value={producto.cantidad}
                        onChange={(event) => handleCambiarCantidad(producto.id, parseInt(event.target.value))}
                      />
                    </td>
                    <td>S/{(producto.precio * producto.cantidad).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleEliminarProductoCarrito(producto.id)}>Eliminar</button>
                      <button onClick={() => handleGuardarParaDespues(producto.id)}>Guardar para después</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"></td>
                  <td>Total:</td>
                  <td>S/{calcularTotalCarrito().toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
        <div className="productos-guardados">
          <h3>Guardados para después</h3>
          {productosGuardados.length === 0 ? (
            <p>No hay productos guardados para después.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosGuardados.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>S/{producto.precio.toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleMoverAlCarrito(producto.id)}>Mover al carrito</button>
                      <button onClick={() => handleEliminarProductoGuardado(producto.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="continuar-compra">
          <Link to="/checkout">
            <button disabled={productosCarrito.length === 0}>Continuar con la compra</button>
          </Link>
        </div>
      </div>
      <Pie />
    </>
  );
}

export default Carrito;