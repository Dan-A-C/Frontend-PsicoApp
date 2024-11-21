import React, { useEffect, useState } from "react";
import Pie from "./Pie";
import Cabecera from "./Cabecera";
import "./Parte1.css";

function Inicio() {
  const [productsData, setProductsData] = useState([]);
  const [uniqueBrandItems, setUniqueBrandItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3080/api/inicio');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductsData(data.products);

        const uniqueBrands = Array.from(new Set(data.products.map(product => product.brand)));
        const brandItems = uniqueBrands.slice(0, 3).map(brand => {
          const product = data.products.find(item => item.brand === brand);
          return product;
        });
        setUniqueBrandItems(brandItems);

        const latest = data.products.slice(-10).reverse();
        setLatestItems(latest);

        const recent = data.products.slice(0, 5);
        setRecentItems(recent);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLearnMore = (id) => {
    window.location.href = `./detalle?id=${encodeURIComponent(id)}`;
  };

  return (
    <>
      <Cabecera />
      <div className="container">
        <div className="search-input-box">
          <input type="text" placeholder="Busca productos por nombre..." />
        </div>
        <div className="search-button">
          <button>
            <a href="./Busqueda">Buscar</a>
          </button>
        </div>
      </div>
      <div className="imagenes">
        {loading ? (
          <p>Cargando colecciones...</p>
        ) : error ? (
          <p>Error al cargar los datos: {error}</p>
        ) : (
          uniqueBrandItems.map((item, index) => (
            <div key={index} className={index === 0 ? "container-cuadrado" : "container-cuadrado2"}>
              <div className="cuadrado">
                <img src={item.image} alt={item.name} className="image-cuadrado" />
              </div>
              <div className="info-cuadrado">
                <p>{`Colección de ${item.brand}`}</p>
                <button onClick={() => handleLearnMore(item.id)}>Learn More</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div id="items-container">
        <div className="items">
          {latestItems.slice(0, 5).map((item, index) => (
            <div key={index} className={index === 0 ? "container-rect" : "container-rect2"}>
              <div className="rect">
                <img src={item.image} alt={item.name} className="image-rect" />
              </div>
              <div className="info-rect">
                <p>{item.name}</p>
                <button onClick={() => handleLearnMore(item.id)}>Learn More</button>
              </div>
            </div>
          ))}
        </div>
        <div className="items">
          {latestItems.slice(5, 10).map((item, index) => (
            <div key={index} className={index === 0 ? "container-rect" : "container-rect2"}>
              <div className="rect">
                <img src={item.image} alt={item.name} className="image-rect" />
              </div>
              <div className="info-rect">
                <p>{item.name}</p>
                <button onClick={() => handleLearnMore(item.id)}>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="items">
        <div>
          <h1>NUEVOS</h1>
        </div>
      </div>
      <div id="items-container">
        <div className="items">
          {recentItems.map((item, index) => (
            <div key={index} className={index === 0 ? "container-rect" : "container-rect2"}>
              <div className="rect">
                <img src={item.image} alt={item.name} className="image-rect" />
              </div>
              <div className="info-rect">
                <p>{item.name}</p>
                <button onClick={() => handleLearnMore(item.id)}>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pie />
    </>
  );
}

export default Inicio;
