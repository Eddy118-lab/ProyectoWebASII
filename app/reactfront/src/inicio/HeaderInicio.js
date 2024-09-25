import { Link } from 'react-router-dom';

function HeaderInicio() {
  return (
    <header>
      <h1>Bienvenido a Nuestra Empresa</h1>
      <nav>
        <Link to="/login">Iniciar Sesión</Link>
      </nav>
    </header>
  );
}

export default HeaderInicio;
