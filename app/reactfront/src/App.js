import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './ebenezer/Footer';
import Login from './ebenezer/login';
import PrivateRoute from './ebenezer/privateroute';
import CompShowUsuario from './ebenezer/ShowUsuario';
import CompCreateUsuario from './ebenezer/CreateUsuario';
import CompEditUsuario from './ebenezer/EditUsuario';
import CompShowCliente from './ebenezer/ShowCliente';
import CompCreateCliente from './ebenezer/CreateCliente.js';
import CompEditCliente from './ebenezer/EditCliente';
import Header from './ebenezer/Header.js';
import MainContent from './ebenezer/MainContent.js';
import CompShowProveedor from './ebenezer/ShowProveedor';
import CompCreateProveedor from './ebenezer/CreateProveedor';
import CompEditProveedor from './ebenezer/EditProveedor';
import CompShowMaterial from './ebenezer/ShowMaterial';  
import CompCreateMaterial from './ebenezer/CreateMaterial';
import CompEditMaterial from './ebenezer/EditMaterial';
import CompShowFacturaProveedor from './ebenezer/ShowFacturaProveedor';
import CompCreateFacturaProveedor from './ebenezer/CreateFacturaProveedor';
import CompEditFacturaProveedor from './ebenezer/EditFacturaProveedor';
import CompShowDetalleFacturaProveedor from './ebenezer/ShowDetalleFacturaProveedor';
import CompShowPagoProveedor from './ebenezer/ShowPagoProveedor';
import CompShowColaborador from './ebenezer/ShowColaborador.js';
import CompCreateColaborador from './ebenezer/CreateColaborador.js';
import CompEditColaborador from './ebenezer/EditColaborador.js';
import FlujoCompra from './ebenezer/FlujoCompra';  // Importa el nuevo componente de compras
import HeaderInicio from "./inicio/HeaderInicio.js";
import FooterInicio from "./inicio/FooterInicio.js";
import MainContentInicio from "./inicio/MainContentInicio.js";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Muestra el Header y Footer del sistema solo si el usuario está autenticado */}
        {isAuthenticated && <Header onLogout={handleLogout} />}

        <div className="App-content">
          <Routes>
            {/* Ruta de inicio que se muestra por defecto y es pública */}
            <Route path="/inicio" element={
              <>
                <HeaderInicio />
                <MainContentInicio />
                <FooterInicio />
              </>
            } />
            
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/" element={isAuthenticated ? <MainContent /> : <Navigate to="/login" />} />
            
            {/* Rutas protegidas */}
            <Route path="/usuario/gestion-usuarios" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowUsuario /></PrivateRoute>} />
            <Route path="/usuario/create" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateUsuario /></PrivateRoute>} />
            <Route path="/usuario/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditUsuario /></PrivateRoute>} />
            <Route path="/cliente/gestion-clientes" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowCliente /></PrivateRoute>} />
            <Route path="/cliente/create" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateCliente /></PrivateRoute>} />
            <Route path="/cliente/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditCliente /></PrivateRoute>} />
            <Route path="/gestion-personal/colaborador" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowColaborador /></PrivateRoute>} />
            <Route path="/gestion-personal/create" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateColaborador /></PrivateRoute>} />
            <Route path="/gestion-personal/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditColaborador /></PrivateRoute>} />
            <Route path="/proveedor/gestion-proveedores" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowProveedor /></PrivateRoute>} />
            <Route path="/proveedor/create" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateProveedor /></PrivateRoute>} />
            <Route path="/proveedor/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditProveedor /></PrivateRoute>} />
            <Route path="/material/gestion-materiales" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowMaterial /></PrivateRoute>} />
            <Route path="/material/create" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateMaterial /></PrivateRoute>} />
            <Route path="/material/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditMaterial /></PrivateRoute>} />
            <Route path="/factura-proveedor/gestion-facturas-proveedores" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowFacturaProveedor /></PrivateRoute>} />
            <Route path="/factura-proveedor/create" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateFacturaProveedor /></PrivateRoute>} />
            <Route path="/factura-proveedor/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditFacturaProveedor /></PrivateRoute>} />
            <Route path="/factura-proveedor/gestion-detalles-facturas-proveedores/:id" element={<CompShowDetalleFacturaProveedor />} />
            <Route path="/factura-proveedor/gestion-pagos-proveedores/:id" element={<CompShowPagoProveedor />} />
            <Route path="/compras" element={<PrivateRoute isAuthenticated={isAuthenticated}><FlujoCompra /></PrivateRoute>} />

            {/* Si la ruta no coincide, redirigir a /inicio */}
            <Route path="*" element={<Navigate to="/inicio" />} />
          </Routes>
        </div>
        
        {/* Muestra el Footer del sistema solo si el usuario está autenticado */}
        {isAuthenticated && <Footer onLogout={handleLogout} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
