import React from 'react'
import Pie from '../Pie'
import Cabecera from '../Cabecera'
import "../Parte1.css"

function AdminListaProductos() {
        // const [productos, setProductos] = useState([]);
        // const [busqueda, setBusqueda] = useState("");
      
        // useEffect(() => {
        //   fetch("/api/alumno4/producto")
        //     .then(response => response.json())
        //     .then(data => setProductos(data))
        //     .catch(error => console.error('Error al cargar los productos:', error));
        // }, []);
      
        // const manejarBusqueda = (e) => {
        //   setBusqueda(e.target.value);
        // };
      
        // const productosFiltrados = productos.filter(producto =>
        //   producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        //   producto.description.toLowerCase().includes(busqueda.toLowerCase())
        // );
    return (
        <>
        <Cabecera/>
        <div class="container">
            <div class="sidebar">
                <ul>
                    <li><a href="./admin_dashboard">Dashboard</a></li>
                    <li><a href="./ListaUsuarios">Usuarios registrados</a></li>
                    <li><a href="./admin_lista_productos">Productos</a></li>
                    <li><a href="./ListadoOrdenesAdmin">Órdenes</a></li>
                    <li><a href="#">Productos más vendidos</a></li>
                    <li><a href="./ListadoSeries">Series</a></li>
                </ul>
            </div>
            <div class="main-content">
                <div class="header">
                    <h2>Productos</h2>
                    <a href="./admin_agregar_productos" class="button">+ Agregar Producto</a>
                </div>
                <div class="search-bar">
                    <input type="text" placeholder="Buscar por Id, serie o detalle..."></input>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Detalle</th>
                            <th>Serie</th>
                            <th>Precio</th>
                            <th>Fecha de Registro</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Manga Dragon Ball Vol 1</td>
                            <td>Dragon Ball</td>
                            <td>S/ 30.99</td>
                            <td>11/02/2022</td>
                            <td>12</td>
                            <td>Activo</td>
                            <td><a href="#">Ver</a> | <a href="#">Desactivar</a></td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>Manga Sailor Moon Vol 9</td>
                            <td>Sailor Moon</td>
                            <td>S/ 30.99</td>
                            <td>11/02/2022</td>
                            <td>10</td>
                            <td>Activo</td>
                            <td><a href="#">Ver</a> | <a href="#">Desactivar</a></td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>Lost BluRay Complete</td>
                            <td></td>
                            <td>S/ 30.99</td>
                            <td>11/02/2022</td>
                            <td>100</td>
                            <td>Activo</td>
                            <td><a href="#">Ver</a> | <a href="#">Desactivar</a></td>
                        </tr>
                        <tr>
                            <td>14</td>
                            <td>Manga Dragon Ball Vol 2</td>
                            <td>Dragon Ball</td>
                            <td>S/ 30.99</td>
                            <td>11/02/2022</td>
                            <td>12</td>
                            <td>Activo</td>
                            <td><a href="#">Ver</a> | <a href="#">Desactivar</a></td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination">
                    <a href="#">Anterior</a>
                    <a href="#" class="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">...</a>
                    <a href="#">11</a>
                    <a href="#">Siguiente</a>
                </div>
            </div>
        </div>
        <Pie/>
        </>
    )
}

export default AdminListaProductos