// SearchDetalleFacturaProveedor.js
import React, { useState } from 'react';

const SearchDetalleFacturaProveedor = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Buscar por Material ID o Factura-Proveedor ID"
            value={query}
            onChange={handleChange}
        />
    );
};

export default SearchDetalleFacturaProveedor;
