import React, { useEffect, useState } from 'react';
import Pie from './Pie';
import Cabecera from './Cabecera';
import './Parte1.css';

function Busqueda() {
    const [productosData, setProductosData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState('Ninguno');
    const [sortDirection, setSortDirection] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productsPerPage = 6;

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:3080/api/busqueda');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProductosData(data.products);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const sortProductos = (productos, criteria, direction) => {
        if (criteria === 'Ninguno') return productos;

        const sortedProductos = [...productos];
        sortedProductos.sort((a, b) => {
            if (a[criteria] < b[criteria]) return direction === 'asc' ? -1 : 1;
            if (a[criteria] > b[criteria]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sortedProductos;
    };

    const generarProductos = (page, sortedProductos) => {
        const productosContainer = document.getElementById('productos');
        productosContainer.innerHTML = ''; // Limpiar contenedor

        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = sortedProductos.slice(startIndex, endIndex);

        currentProducts.forEach(producto => {
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('productos-container2');

            const imagenElement = document.createElement('img');
            imagenElement.src = producto.image;
            imagenElement.alt = producto.name;
            containerDiv.appendChild(imagenElement);

            const productoDetalleDiv = document.createElement('div');
            productoDetalleDiv.classList.add('producto-detalle');

            const tituloP = document.createElement('p');
            tituloP.classList.add('producto-titulo');
            tituloP.textContent = producto.name;

            const fabricanteP = document.createElement('p');
            fabricanteP.classList.add('producto-fabri');
            fabricanteP.textContent = `Por: ${producto.brand}`;

            const precioP = document.createElement('p');
            precioP.classList.add('producto-precio');
            precioP.textContent = `S/ ${producto.price.toFixed(2)}`;

            productoDetalleDiv.appendChild(tituloP);
            productoDetalleDiv.appendChild(fabricanteP);
            productoDetalleDiv.appendChild(precioP);

            containerDiv.appendChild(productoDetalleDiv);

            containerDiv.addEventListener('click', () => {
                const url = `./Detalle?id=${encodeURIComponent(producto.id)}`;
                window.location.href = url;
            });

            productosContainer.appendChild(containerDiv);
        });
    };

    useEffect(() => {
        if (productosData.length > 0) {
            const sortedProductos = sortProductos(productosData, sortCriteria === 'Ninguno' ? null : sortCriteria.toLowerCase(), sortDirection);
            generarProductos(currentPage, sortedProductos);
        }
    }, [productosData, currentPage, sortCriteria, sortDirection]);

    const handleSortChange = (e) => {
        const newSortCriteria = e.target.value;
        if (sortCriteria === newSortCriteria) {
            setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCriteria(newSortCriteria);
            setSortDirection('asc');
        }
        setCurrentPage(1); // Reset to first page on sort change
    };

    const totalPages = Math.ceil(productosData.length / productsPerPage);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Cabecera />
            <div>
                <div className="ordenar-container">
                    <div className="ordenar">
                        <span>Ordenar Por: </span>
                        <select name="sort" onChange={handleSortChange} value={sortCriteria}>
                            <option value="Ninguno">Ninguno</option>
                            <option value="price">Precio</option>
                            <option value="name">Nombre</option>
                            <option value="brand">Fabricante</option>
                        </select>
                    </div>
                </div>
                <div className="resultados">
                    <div className="tituresul">
                        <span>Resultados de Búsqueda</span>
                    </div>
                    <div id="productos"></div>
                </div>
                <div id="paginacion" className="paginacion">
                    <ul className="navega">
                        <li className={`anterior ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>« Anterior</li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`pagina ${currentPage === i + 1 ? 'active' : ''}`}>
                                <a href="#" onClick={() => setCurrentPage(i + 1)}>{i + 1}</a>
                            </li>
                        ))}
                        <li className={`siguiente ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Siguiente »</li>
                    </ul>
                </div>
            </div>
            <Pie />
        </>
    );
}

export default Busqueda;
