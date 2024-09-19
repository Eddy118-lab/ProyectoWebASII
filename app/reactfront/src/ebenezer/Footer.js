// Footer.js
import React from 'react';
import './Style/Footer.css';

const Footer = () => {
  return (
    <footer className="App-footer">
      <p>© {new Date().getFullYear()} Transportes Eben-Ezer. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;