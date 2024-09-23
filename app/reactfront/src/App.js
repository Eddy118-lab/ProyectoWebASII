import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import Footer from './ebenezer/Footer';
import Login from './ebenezer/login';
import PrivateRoute from './ebenezer/privateroute';
import CompShowUsuario from './ebenezer/ShowUsuario';
import CompCreateUsuario from './ebenezer/CreateUsuario';
import CompEditUsuario from './ebenezer/EditUsuario';
import CompShowCliente from './ebenezer/ShowCliente';
import CompCreateCliente from './ebenezer/CreateCliente';
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
import CompShowDetalleFacturaProveedor from './ebenezer/ShowDetProv';
import CompShowPagoProveedor from './ebenezer/ShowPagoProveedor';
import CompShowColaborador from './ebenezer/ShowColaborador.js';
import CompCreateColaborador from './ebenezer/CreateColaborador.js';
import CompEditColaborador from './ebenezer/EditColaborador.js';
import FlujoCompra from './ebenezer/FlujoCompra';  // Importa el nuevo componente de compras

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header onLogout={handleLogout} />
        
        <div className="App-content">
          <ReactModal isOpen={showLogin} onRequestClose={() => setShowLogin(false)}>
            <Login onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />
          </ReactModal>

          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/" element={isAuthenticated ? <MainContent /> : <Navigate to="/login" />} />
            
            {/* Otras rutas existentes */}
            <Route path="/usuario/gestion-usuarios" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowUsuario /></PrivateRoute>} />
            <Route path="/usuario/crear-usuario" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateUsuario /></PrivateRoute>} />
            <Route path="/usuario/editar-usuario/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditUsuario /></PrivateRoute>} />

            <Route path="/cliente/gestion-clientes" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowCliente /></PrivateRoute>} />
            <Route path="/cliente/crear-cliente" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateCliente /></PrivateRoute>} />
            <Route path="/cliente/editar-cliente/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditCliente /></PrivateRoute>} />

            <Route path="/gestion-personal/colaborador" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowColaborador /></PrivateRoute>} />
            <Route path="/gestion-personal/crear-colaborador" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateColaborador /></PrivateRoute>} />
            <Route path="/gestion-personal/editar-colaborador/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditColaborador /></PrivateRoute>} />

            <Route path="/proveedor/gestion-proveedores" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowProveedor /></PrivateRoute>} />
            <Route path="/proveedor/crear-proveedor" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateProveedor /></PrivateRoute>} />
            <Route path="/proveedor/editar-proveedor/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditProveedor /></PrivateRoute>} />

            <Route path="/material/gestion-materiales" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowMaterial /></PrivateRoute>} />
            <Route path="/material/crear-material" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateMaterial /></PrivateRoute>} />
            <Route path="/material/editar-material/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditMaterial /></PrivateRoute>} />

            <Route path="/factura-proveedor/gestion-facturas-proveedores" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompShowFacturaProveedor /></PrivateRoute>} />
            <Route path="/factura-proveedor/crear-factura-proveedor" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompCreateFacturaProveedor /></PrivateRoute>} />
            <Route path="/factura-proveedor/editar-factura-proveedor/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CompEditFacturaProveedor /></PrivateRoute>} />
             {/* Nuevas rutas para Gestión de facturas de Proveedores */}
             <Route path="/factura-proveedor/gestion-detalles-facturas-proveedores/:id" element={<CompShowDetalleFacturaProveedor />} />
            <Route path="/factura-proveedor/gestion-pagos-proveedores/:id" element={<CompShowPagoProveedor />} />

            {/* Ruta del nuevo módulo de compras */}
            <Route path="/compras" element={<PrivateRoute isAuthenticated={isAuthenticated}><FlujoCompra /></PrivateRoute>} />

            {/* Otras rutas existentes */}
          </Routes>
        </div>
        
        <Footer onLogout={handleLogout} />
      </BrowserRouter>
    </div>
  );
}

export default App;