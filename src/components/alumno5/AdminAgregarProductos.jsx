import React from 'react'
import Pie from '../Pie'
import Cabecera from '../Cabecera'
import "../Parte1.css"

function AdminAgregarProductos() {
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
                    <h2>Agregar Producto</h2>
                </div>
                <div class="form-container">
                    <div class="left-column">
                        <div class="image-placeholder">
                            <span>Imagen del Producto</span>
                        </div>
                        <button class="button">Agregar Imagen</button>
                    </div>
                    <div class="right-column">
                        <input type="text" placeholder="Nombre" name="nombre"></input>
                        <textarea placeholder="Descripción" name="descripcion"></textarea>
                        <textarea placeholder="Características" name="caracteristicas"></textarea>
                        <div class="inputs">
                            <input type="text" class="small-input" placeholder="Marca" name="marca"></input>
                            <input type="text" class="small-input" placeholder="Serie" name="serie"></input>
                            <input type="text" class="small-input" placeholder="Precio" name="precio"></input>
                        </div>
                        <div class="inputs">
                            <input type="text" class="small-input" placeholder="Tipo" name="tipo"></input>
                            <input type="text" class="small-input" placeholder="Stock" name="stock"></input>
                        </div>
                        <button class="submit-button">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <Pie/>
        </>
    )
}

export default AdminAgregarProductos