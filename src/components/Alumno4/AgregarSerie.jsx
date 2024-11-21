import React, { useState } from 'react';
import Pie from "../Pie";
import Cabecera from '../Cabecera';
import "../Parte1.css";
import '../styles/alumno4/AgregarSerie.css';

function AgregarSerie() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [temporada, setTemporada] = useState("");
  const [genero, setGenero] = useState("");
  const [imagen, setImagen] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productoActual, setProductoActual] = useState("");

  const manejarImagen = (e) => {
    setImagen(e.target.files[0]);
  };

  const agregarProducto = () => {
    setProductos([...productos, productoActual]);
    setProductoActual("");
  };

  const removerProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("temporada", temporada);
    formData.append("genero", genero);
    formData.append("imagen", imagen);
    formData.append("productos", JSON.stringify(productos));

    try {
      const response = await fetch("/api/alumno4/series", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al agregar la serie");
      }
      alert("Serie agregada exitosamente");
      // Resetear el formulario
      setNombre("");
      setDescripcion("");
      setTemporada("");
      setGenero("");
      setImagen(null);
      setProductos([]);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar la serie");
    }
  };

  return (
    <>
      <Cabecera />
      <div className="admin-container">
        <div className="sidebar">
          <h2>Admin</h2>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/usuarios-registrados">Usuarios registrados</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/ordenes">Órdenes</a></li>
            <li><a href="/productos-mas-vendidos">Productos más vendidos</a></li>
            <li><a href="/series">Series</a></li>
          </ul>
        </div>
        <div className="content">
          <h1>Agregar Serie</h1>
          <form onSubmit={manejarSubmit} className="agregar-serie-form">
            <div className="form-group">
              <label>Agregar Serie</label>
              <div className="image-upload">
                {imagen && (
                  <img
                    src={URL.createObjectURL(imagen)}
                    alt="Imagen de la serie"
                    className="preview-image"
                  />
                )}
                <input type="file" onChange={manejarImagen} />
                <button type="button" className="upload-btn">Agregar Imagen</button>
              </div>
            </div>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Productos en la serie</label>
              <input
                type="text"
                value={productoActual}
                onChange={(e) => setProductoActual(e.target.value)}
              />
              <button type="button" onClick={agregarProducto} className="add-product-btn">+</button>
              <ul className="product-list">
                {productos.map((producto, index) => (
                  <li key={index} className="product-item">
                    {producto}
                    <button type="button" onClick={() => removerProducto(index)} className="remove-product-btn">Remover</button>
                  </li>
                ))}
              </ul>
            </div>
            <button type="submit" className="submit-btn">Guardar</button>
          </form>
        </div>
      </div>
      <Pie />
    </>
  );
}

export default AgregarSerie;
