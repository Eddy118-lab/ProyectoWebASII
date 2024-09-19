import { useState } from 'react';
import './Style/StyleSearch.css';  // Ajusta según tus necesidades

const SearchFacturaProveedor = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className='search-bar'>
            <input
                type='text'
                className='form-control'
                placeholder='Buscar por fecha o monto...'
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchFacturaProveedor;
