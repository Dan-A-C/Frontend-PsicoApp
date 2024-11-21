import React, {useEffect, useState} from 'react'
import Pie from '../Pie'
import Cabecera from '../Cabecera'
import "../Parte1.css"
import {Link} from 'react-router-dom'

function AdminDashboard() {

    const [pedidosData, setPedidosData] = useState([]);
    const [uniqueBrandItems, setUniqueBrandItems] = useState([]);
    const [latestItems, setLatestItems] = useState([]);
    const [recentItems, setRecentItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   const fetchPedidos = async () => {
    //     try {
    //       const response = await fetch('http://localhost:3080/api/alumno5/dashboard');
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       const data = await response.json();
    //       setPedidosData(data.orders);
  
    //       const uniqueBrands = Array.from(new Set(data.products.map(product => product.brand)));
    //       const brandItems = uniqueBrands.slice(0, 3).map(brand => {
    //         const product = data.products.find(item => item.brand === brand);
    //         return product;
    //       });
    //       setUniqueBrandItems(brandItems);
  
    //       const latest = data.products.slice(-10).reverse();
    //       setLatestItems(latest);
  
    //       const recent = data.products.slice(0, 5);
    //       setRecentItems(recent);
  
    //       setLoading(false);
    //     } catch (error) {
    //       setError(error.message);
    //       setLoading(false);
    //     }
    //   };
  
    //   fetchProducts();
    // }, []);
  
    // const handleLearnMore = (id) => {
    //   window.location.href = `./detalle?id=${encodeURIComponent(id)}`;
    // };
    
    
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
                <h2>Dashboard</h2>
                <a href="#">Cambiar Fecha o Periodo</a>
            </div>
            <div class="dashboard-cards">
                <div class="card">
                    <h1>68</h1>
                    <p>Órdenes del día de hoy</p>
                </div>
                <div class="card">
                    <h1>12</h1>
                    <p>Usuarios nuevos</p>
                </div>
                <div class="card">
                    <h1>S/13,500.00</h1>
                    <p>Ingresos de hoy</p>
                </div>
            </div>
        </div>
    </div>
        

        <Pie/>
        </>
    )
}

export default AdminDashboard