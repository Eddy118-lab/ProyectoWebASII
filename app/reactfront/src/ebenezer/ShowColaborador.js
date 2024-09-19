import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/ConductorStyles.css';
import SearchColaborador from './SearchColaborador.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const URI = 'http://localhost:8000/api/conductores';

const CompShowColaborador = () => {
    const [colaboradores, setColaboradores] = useState([]);
    const [filteredColaboradores, setFilteredColaboradores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [colaboradoresPerPage] = useState(4);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('primer_nom');

    useEffect(() => {
        getColaboradores();
    }, []);

    const getColaboradores = async () => {
        setLoading(true);
        try {
            const res = await axios.get(URI);
            setColaboradores(res.data);
            setFilteredColaboradores(res.data);
        } catch (error) {
            setError('Error al obtener los datos');
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteColaborador = async (id) => {
        try {
            const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este colaborador?');
            if (isConfirmed) {
                await axios.delete(`${URI}/${id}`);
                getColaboradores();
            }
        } catch (error) {
            console.error("Error al eliminar el colaborador:", error);
            setError('Error al eliminar el colaborador');
        }
    };

    const handleSearch = (query) => {
        const filtered = colaboradores.filter(colaborador =>
            colaborador.primer_nom.toLowerCase().includes(query.toLowerCase()) ||
            colaborador.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredColaboradores(filtered);
        setCurrentPage(1);
    };

    const sortColaboradores = (field) => {
        const sortedColaboradores = [...filteredColaboradores].sort((a, b) => {
            const aField = a[field]?.toLowerCase() || '';
            const bField = b[field]?.toLowerCase() || '';
            if (aField < bField) return sortOrder === 'asc' ? -1 : 1;
            if (aField > bField) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredColaboradores(sortedColaboradores);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortField(field);
    };

    const getSortIcon = (field) => {
        if (field !== sortField) return null;
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const indexOfLastColaborador = currentPage * colaboradoresPerPage;
    const indexOfFirstColaborador = indexOfLastColaborador - colaboradoresPerPage;
    const currentColaboradores = filteredColaboradores.slice(indexOfFirstColaborador, indexOfLastColaborador);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredColaboradores.length / colaboradoresPerPage);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="search-create-container">
                        <div className='user-management-header'>
                            <h2 className='user-management-title'>Gestión de Colaboradores</h2>
                        </div>
                        <div className="search-create-wrapper">
                            <div className="search-container">
                                <SearchColaborador colaboradores={colaboradores} onSearch={handleSearch} />
                            </div>
                            <div className="create-btn-container">
                                <Link to="/gestion-personal/create" className="btn btn-primary">
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
                                <th onClick={() => sortColaboradores('primer_nom')} style={{ cursor: 'pointer' }}>
                                    Primer Nombre {getSortIcon('primer_nom')}
                                </th>
                                <th onClick={() => sortColaboradores('segundo_nombre')} style={{ cursor: 'pointer' }}>
                                    Segundo Nombre {getSortIcon('segundo_nombre')}
                                </th>
                                <th onClick={() => sortColaboradores('primer_apell')} style={{ cursor: 'pointer' }}>
                                    Primer Apellido {getSortIcon('primer_apell')}
                                </th>
                                <th onClick={() => sortColaboradores('segundo_apell')} style={{ cursor: 'pointer' }}>
                                    Segundo Apellido {getSortIcon('segundo_apell')}
                                </th>
                                <th onClick={() => sortColaboradores('no_licencia')} style={{ cursor: 'pointer' }}>
                                    Licencia {getSortIcon('no_licencia')}
                                </th>
                                <th onClick={() => sortColaboradores('telefono')} style={{ cursor: 'pointer' }}>
                                    Teléfono {getSortIcon('telefono')}
                                </th>
                                <th onClick={() => sortColaboradores('email')} style={{ cursor: 'pointer' }}>
                                    Email {getSortIcon('email')}
                                </th>
                                <th onClick={() => sortColaboradores('fecha_contratacion')} style={{ cursor: 'pointer' }}>
                                    Fecha de Contratación {getSortIcon('fecha_contratacion')}
                                </th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentColaboradores.length === 0 ? (
                                <tr>
                                    <td colSpan="9">No hay colaboradores disponibles</td>
                                </tr>
                            ) : (
                                currentColaboradores.map(colaborador => (
                                    <tr key={colaborador.id}>
                                        <td>{colaborador.primer_nom}</td>
                                        <td>{colaborador.segundo_nombre}</td>
                                        <td>{colaborador.primer_apell}</td>
                                        <td>{colaborador.segundo_apell}</td>
                                        <td>{colaborador.no_licencia}</td>
                                        <td>{colaborador.telefono}</td>
                                        <td>{colaborador.email}</td>
                                        <td>{colaborador.fecha_contratacion}</td>
                                        <td>
                                            <Link to={`/gestion-personal/edit/${colaborador.id}`} className='btn btn-warning btn-sm mr-2'>
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </Link>
                                            <button onClick={() => deleteColaborador(colaborador.id)} className='btn btn-danger btn-sm'>
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

export default CompShowColaborador;

