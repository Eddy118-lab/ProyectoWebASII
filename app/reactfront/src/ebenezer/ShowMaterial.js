import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/StyleMaterial.css';  // Importa el archivo CSS correspondiente
import SearchMaterial from './SearchMaterial.js';  // Componente de búsqueda de materiales
import '@fortawesome/fontawesome-free/css/all.min.css';

const URI = 'http://localhost:8000/api/materiales';  // La URI de la API para los materiales

const CompShowMaterial = () => {
    const [materiales, setMateriales] = useState([]);
    const [filteredMateriales, setFilteredMateriales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [materialesPerPage] = useState(4);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('nombre');

    useEffect(() => {
        getMateriales();
    }, []);

    const getMateriales = async () => {
        setLoading(true);
        try {
            const res = await axios.get(URI);
            setMateriales(res.data);
            setFilteredMateriales(res.data);
        } catch (error) {
            setError('Error al obtener los datos');
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteMaterial = async (id) => {
        try {
            const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este material?');
            if (isConfirmed) {
                await axios.delete(`${URI}/${id}`);
                getMateriales();
            }
        } catch (error) {
            console.error("Error al eliminar el material:", error);
            setError('Error al eliminar el material');
        }
    };

    const handleSearch = (query) => {
        const filtered = materiales.filter(material =>
            material.nombre.toLowerCase().includes(query.toLowerCase()) ||
            material.descripcion.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMateriales(filtered);
        setCurrentPage(1);
    };

    const sortMateriales = (field) => {
        const sortedMateriales = [...filteredMateriales].sort((a, b) => {
            const aField = a[field]?.toLowerCase() || '';
            const bField = b[field]?.toLowerCase() || '';
            if (aField < bField) return sortOrder === 'asc' ? -1 : 1;
            if (aField > bField) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredMateriales(sortedMateriales);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortField(field);
    };

    const getSortIcon = (field) => {
        if (field !== sortField) return null;
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const indexOfLastMaterial = currentPage * materialesPerPage;
    const indexOfFirstMaterial = indexOfLastMaterial - materialesPerPage;
    const currentMateriales = filteredMateriales.slice(indexOfFirstMaterial, indexOfLastMaterial);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredMateriales.length / materialesPerPage);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="search-create-container">
                        <div className='user-management-header'>
                            <h2 className='user-management-title'>Gestión de Materiales</h2>
                        </div>
                        <div className="search-create-wrapper">
                            <div className="search-container">
                                <SearchMaterial materiales={materiales} onSearch={handleSearch} />
                            </div>
                            <div className="create-btn-container">
                                <Link to="/material/create" className="btn btn-primary">
                                    <i className="fa-solid fa-plus"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {loading && <p>Cargando...</p>}
                    {error && <p className='text-danger'>{error}</p>}

                    <table className='table table-hover'>
                        <thead className='table-primary'>
                            <tr>
                                <th onClick={() => sortMateriales('nombre')} style={{ cursor: 'pointer' }}>
                                    Nombre {getSortIcon('nombre')}
                                </th>
                                <th onClick={() => sortMateriales('descripcion')} style={{ cursor: 'pointer' }}>
                                    Descripción {getSortIcon('descripcion')}
                                </th>
                                <th onClick={() => sortMateriales('unidad_medida')} style={{ cursor: 'pointer' }}>
                                    Unidad de Medida {getSortIcon('unidad_medida')}
                                </th>
                                <th onClick={() => sortMateriales('costo')} style={{ cursor: 'pointer' }}>
                                    Costo {getSortIcon('costo')}
                                </th>
                                <th onClick={() => sortMateriales('cantidad')} style={{ cursor: 'pointer' }}>
                                    Cantidad {getSortIcon('cantidad')}
                                </th>
                                <th onClick={() => sortMateriales('proveedor.nombre')} style={{ cursor: 'pointer' }}>
                                    Proveedor {getSortIcon('proveedor.nombre')}
                                </th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMateriales.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No hay materiales disponibles</td>
                                </tr>
                            ) : (
                                currentMateriales.map(material => (
                                    <tr key={material.id}>
                                        <td>{material.nombre}</td>
                                        <td>{material.descripcion}</td>
                                        <td>{material.unidad_medida}</td>
                                        <td>Q. {material.costo}</td>
                                        <td>{material.cantidad}</td>
                                        <td>{material.proveedor?.nombre || 'No asignado'}</td> {/* Mostrar el proveedor */}
                                        <td>
                                            <Link to={`/material/edit/${material.id}`} className='btn btn-warning btn-sm mr-2'>
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </Link>
                                            <button onClick={() => deleteMaterial(material.id)} className='btn btn-danger btn-sm'>
                                                <i className="fa-regular fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <nav className='d-flex justify-content-center'>
                        <ul className='pagination'>
                            {[...Array(totalPages).keys()].map(number => (
                                <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                                    <button onClick={() => paginate(number + 1)} className='page-link'>
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default CompShowMaterial;
