import { Link } from 'react-router-dom';
import inventario from './picture/inventory.png';
import ventas from './picture/sales.png';
import cliente from './picture/clients.png';
import proveedores from './picture/suppliers.png';
import personal from './picture/staff.png';
import usuario2 from './picture/user.png';
import compra from './picture/buys.png';
import materiales from './picture/materials.png';
import FactProv from './picture/supplierbilling.png';
import './Style/MainContent.css'; // Agrega los estilos del MainContent si los tienes

function MainContent() {
  return (
    <main className="App-main">
      <h2>Bienvenido a la plataforma</h2>
      <p>Aquí encontrarás todos los módulos disponibles.</p>

      <div className="module-buttons">
        <div className="module-card">
          <img src={inventario} alt="Gestión de Inventario" />
          <h3>Gestión de Inventario</h3>
          <p>Próximamente</p>
        </div>
        <div className="module-card">
          <Link to="/cliente/gestion-clientes" className="btn-module">
            <img src={cliente} alt="Gestión de Clientes" />
            <h3>Gestión de Clientes</h3>
          </Link>
        </div>
        <div className="module-card">
          <img src={ventas} alt="Gestión de Ventas" />
          <h3>Gestión de Ventas</h3>
          <p>Próximamente</p>
        </div>
        <div className="module-card">
          <Link to="/proveedor/gestion-proveedores" className="btn-module">
            <img src={proveedores} alt="Gestión de Proveedores" />
            <h3>Gestión de Proveedores</h3>
          </Link>
        </div>
        <div className="module-card">
        <Link to="/gestion-personal/colaborador" className="btn-module">
          <img src={personal} alt="Gestión de Personal" />
          <h3>Gestión de Personal</h3>
        </Link>
        </div>
        <div className="module-card">
          <Link to="/usuario/gestion-usuarios" className="btn-module">
            <img src={usuario2} alt="Gestión de Usuarios" />
            <h3>Gestión de Usuarios</h3>
          </Link>
        </div>
        <div className="module-card">
          <Link to="/compras" className="btn-module">
            <img src={compra} alt="Gestión de Compras" />  {/* Nueva tarjeta */}
            <h3>Gestión de Compras</h3>
          </Link>
        </div>
        <div className="module-card">
          <Link to="/material/gestion-materiales" className="btn-module">
            <img src={materiales} alt="Gestión de Materiales" />
            <h3>Gestión de Materiales</h3>
          </Link>
        </div>
        <div className="module-card">
          <Link to="/factura-proveedor/gestion-facturas-proveedores" className="btn-module">
            <img src={FactProv} alt="Gestión de Facturas de Provedores" />
            <h3>Gestión de Facturas de Provedores</h3>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default MainContent;