import { Routes, Route } from "react-router-dom"
import Inicio from './components/Inicio'
import Checkout from "./components/Checkout"
import Carrito from "./components/Carrito"
import PedidoCompleto from "./components/PedidoCompleto"
import Detalle from "./components/Detalle"
import Busqueda from "./components/Busqueda"
// Componentes alumno 4
import ListadoSeries from "./components/Alumno4/ListadoSeries"
import DetalleOrden from "./components/Alumno4/DetalleOrden"
import DatosRegistroUsuario from "./components/Alumno4/DatosRegistroUsuario"
import CambiarContrasena from "./components/Alumno4/CambiarContrasena"
import AgregarSerie from "./components/Alumno4/AgregarSerie"
//

import Formulario from "./components/Formulario"
import Registro from "./components/Registro"
import Recuperar from "./components/Recuperar"

// Componentes de alumno 5
import AdminDashboard from './components/alumno5/AdminDashboard'
import AdminAgregarProductos from "./components/alumno5/AdminAgregarProductos"
import AdminListaProductos from "./components/alumno5/AdminListaProductos"

// Componentes de alumno 6
import ListaUsuarios from "./components/Alumno6/ListaUsuarios";
import DetalleUsuarioAdmin from "./components/Alumno6/DetalleUsuarioAdmin";
import ListadoOrdenesAdmin from "./components/Alumno6/ListadoOrdenesAdmin";
import DetalleOrdenAdmin from "./components/Alumno6/DetalleOrdenAdmin";
import Cuestionario from "./components/Cuestionario"
import SolicitarCita from "./components/SolicitarCita"

function App() {
  return (
    <div className="Aplicacion">
      <Routes>
        {/* Ruta de inicio por defecto */}
        <Route path="/" element={ <Inicio /> } />

        <Route path="/detalle" element={ <Detalle /> } />
        <Route path="/busqueda" element={ <Busqueda /> } />
        <Route path="/checkout" element={ <Checkout /> } />
        <Route path="/carrito" element={ <Carrito /> } />
        <Route path="/pedido_completo" element={ <PedidoCompleto /> } />
        
        <Route path="/Formulario" element={ <Formulario /> } />
        <Route path="/Recuperar" element={ <Recuperar /> } />
        <Route path="/Registro" element={ <Registro /> } />
        {/* Rutas de alumno 4 */}
        <Route path="/ListadoSeries" element={<ListadoSeries/>}/> 
        <Route path="/AgregarSerie" element={<AgregarSerie/>}/> 
        <Route path="/DetalleOrden/:id" element={<DetalleOrden/>}/> 
        <Route path="/DatosRegistroUsuario" element={<DatosRegistroUsuario/>}/>  
        <Route path="/CambiarContrasena" element={<CambiarContrasena/>}/> 
        {/* Rutas de alumno 5 */}
        <Route path="/admin_dashboard" element={ <AdminDashboard /> } />
        <Route path="/admin_lista_productos" element={ <AdminListaProductos /> } />
        <Route path="/admin_agregar_productos" element={ <AdminAgregarProductos /> } />

        {/* Rutas de alumno 6 */}
        <Route path="/DetalleOrdenAdmin/:id" element={ <DetalleOrdenAdmin /> } />
        <Route path="/ListadoOrdenesAdmin" element={ <ListadoOrdenesAdmin /> } />
        <Route path="/DetalleUsuarioAdmin/:id" element={ <DetalleUsuarioAdmin /> } />
        <Route path="/ListaUsuarios" element={ <ListaUsuarios /> } />
        <Route path="/Cuestionario" element={ <Cuestionario /> } />
        <Route path="/Solicitarcita" element={ <SolicitarCita /> } />
      
      </Routes>
    </div>
  )
}

export default App
