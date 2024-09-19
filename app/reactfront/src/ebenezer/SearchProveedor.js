import { useState } from 'react';
import './Style/StyleSearch.css';  // Asegúrate de tener el archivo de estilo adecuado

const SearchProveedor = ({ onSearch }) => {
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
                placeholder='Buscar por nombre o NIT...'
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchProveedor;
