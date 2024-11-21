import React, { useEffect, useState } from 'react';
import Pie from './Pie';
import Cabecera from './Cabecera';
import './Parte1.css';

function Detalle() {
    const [cantidad, setCantidad] = useState(1);
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
    
            try {
                const response = await fetch(`http://localhost:3080/api/detalle/${productId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducto(data.product);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
    
        fetchProducto();
    }, []);
    

    const añadirAlCarrito = () => {
        if (producto) {
            const nuevoProducto = {
                id: producto.id,
                nombre: producto.name,
                precio: producto.price,
                cantidad: cantidad,
                imagen: producto.image
            };

            const carritoActual = JSON.parse(localStorage.getItem('productosCarrito')) || [];
            carritoActual.push(nuevoProducto);
            localStorage.setItem('productosCarrito', JSON.stringify(carritoActual));
            
            // Redirigir a la página del carrito
            window.location.href = './carrito';
        }
    };

    const aumentarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const disminuirCantidad = () => {
        setCantidad(cantidad > 1 ? cantidad - 1 : 1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Cabecera />
            {producto && (
                <>
                    <div className="titulo" id="detalleProducto">
                        <p className="titulo-largo">{producto.name}</p>
                        <p className="titulo-largo2">Por: <strong>{producto.brand}</strong></p>
                    </div>
                    <hr className="linea" />
                    <div className="detalle-imagen">
                        <div className="imagen-producto">
                            <img id="imagenProducto" src={producto.image} alt={producto.name} />
                        </div>
                        <div className="detalle-prod">
                            <div className="dispdet">
                                <span>DISPONIBLE</span>
                            </div>
                            <div className="precdet">
                                <p id="precioProducto" className="preciodeta">S/ {producto.price.toFixed(2)}</p>
                                <button onClick={añadirAlCarrito}>AÑADIR AL CARRITO</button>
                                <p className="cantideta">Cantidad:</p>
                                <div className="cantidad-control">
                                    <span className="osas" onClick={disminuirCantidad}>-</span>
                                    <span className="uno">{cantidad}</span>
                                    <span className="osas" onClick={aumentarCantidad}>+</span>
                                </div>
                                <a href="">Ver métodos de envío disponibles</a>
                            </div>
                        </div>
                    </div>
                    <div className="destex">
                        <p className="textodes">Descripción</p>
                        <p id="descripcionProducto" className="texto">{producto.description}</p>
                    </div>
                    <div className="lista">
                        <p>Características del Producto:</p>
                        <ul id="caracteristicasProducto">
                            {producto.features.split(', ').map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
            <Pie />
        </>
    );
}

export default Detalle;
