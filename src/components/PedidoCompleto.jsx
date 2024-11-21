import React from "react";
import Pie from "./Pie";
import Cabecera from "./Cabecera";
import { Link } from "react-router-dom";

function PedidoCompleto() {
  return (
    <>
      <Cabecera />
      <div className="App">
        <div className="container">
          <div className="header">
            <h1>¡Muchas gracias por tu pedido!</h1>
          </div>
          <div className="body">
            <p>
              Puedes ver el detalle y estado de tu pedido ingresando a tu cuenta
            </p>
            <a href="#" className="button">
              <Link to="/carrito">Ir a mi cuenta</Link>
            </a>
          </div>
          <div className="footer">
            <p>También de podría interesar...</p>
            <div className="products">
              <div className="product">
                <img src="https://placehold.co/200x200" alt="Producto 1" />
                <h3>LeM</h3>
              </div>
              <div className="product">
                <img src="https://placehold.co/200x200" alt="Producto 2" />
                <h3>La Mure</h3>
              </div>
              <div className="product">
                <img src="https://placehold.co/200x200" alt="Producto 3" />
                <h3>La Nue</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pie />
    </>
  );
}

export default PedidoCompleto;
