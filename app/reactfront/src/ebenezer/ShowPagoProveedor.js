import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Style/StylePagoProv.css';

const URI = 'http://localhost:8000/api/pagos-proveedores';

const CompShowPagoProveedor = () => {
    const [pagos, setPagos] = useState([]);
    const [filteredPagos, setFilteredPagos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagosPerPage] = useState(4);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('fecha');
    const navigate = useNavigate(); // Para la navegación de regreso

    useEffect(() => {
        getPagos();
    }, []);

    const getPagos = async () => {
        setLoading(true);
        try {
            const res = await axios.get(URI);
            setPagos(res.data);
            setFilteredPagos(res.data);
        } catch (error) {
            setError('Error al obtener los datos de pagos');
            console.error("Error al obtener los datos de pagos:", error);
        } finally {
            setLoading(false);
        }
    };

    const deletePago = async (id) => {
        try {
            const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este pago?');
            if (isConfirmed) {
                await axios.delete(`${URI}/${id}`);
                getPagos();
            }
        } catch (error) {
            console.error("Error al eliminar el pago:", error);
            setError('Error al eliminar el pago');
        }
    };

    const handleSearch = (query) => {
        const filtered = pagos.filter(pago =>
            pago.factura_proveedor_id.toString().includes(query) ||
            pago.monto.toString().includes(query) ||
            pago.metodo_pago.toLowerCase().includes(query.toLowerCase())  // Filtrar por método de pago
        );
        setFilteredPagos(filtered);
        setCurrentPage(1);
    };

    const sortPagos = (field) => {
        const sortedPagos = [...filteredPagos].sort((a, b) => {
            if (field === 'fecha') {
                return sortOrder === 'asc' 
                    ? new Date(a.fecha) - new Date(b.fecha)
                    : new Date(b.fecha) - new Date(a.fecha);
            }
            if (field === 'monto') {
                return sortOrder === 'asc' 
                    ? parseFloat(a.monto) - parseFloat(b.monto)
                    : parseFloat(b.monto) - parseFloat(a.monto);
            }
            if (field === 'metodo_pago') {
                return sortOrder === 'asc'
                    ? a.metodo_pago.localeCompare(b.metodo_pago)
                    : b.metodo_pago.localeCompare(a.metodo_pago);
            }
            return 0;
        });
        setFilteredPagos(sortedPagos);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortField(field);
    };

    const getSortIcon = (field) => {
        if (field !== sortField) return null;
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const indexOfLastPago = currentPage * pagosPerPage;
    const indexOfFirstPago = indexOfLastPago - pagosPerPage;
    const currentPagos = filteredPagos.slice(indexOfFirstPago, indexOfLastPago);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredPagos.length / pagosPerPage);

    // Función para regresar a la página anterior
    const handleBack = () => {
        navigate('/factura-proveedor/gestion-facturas-proveedores');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="search-create-container">
                        <div className='user-management-header'>
                            <h2 className='user-management-title'>Gestión de Pagos a Proveedores</h2>
                        </div>
                        <div className="search-create-wrapper">
                            <input 
                                type="text" 
                                placeholder="Buscar por método de pago..." 
                                onChange={(e) => handleSearch(e.target.value)} 
                                className="form-control" 
                            />
                        </div>
                    </div>

                    {loading && <p>Cargando...</p>}
                    {error && <p className='text-danger'>{error}</p>}

                    <table className='table table-hover'>
                        <thead className='table-primary'>
                            <tr>
                                <th onClick={() => sortPagos('fecha')} style={{ cursor: 'pointer' }}>
                                    Fecha {getSortIcon('fecha')}
                                </th>
                                <th onClick={() => sortPagos('monto')} style={{ cursor: 'pointer' }}>
                                    Monto {getSortIcon('monto')}
                                </th>
                                <th onClick={() => sortPagos('metodo_pago')} style={{ cursor: 'pointer' }}>
                                    Método de Pago {getSortIcon('metodo_pago')}
                                </th>
                                <th>ID Factura Proveedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPagos.length === 0 ? (
                                <tr>
                                    <td colSpan="4">No hay pagos disponibles</td>
                                </tr>
                            ) : (
                                currentPagos.map(pago => (
                                    <tr key={pago.id}>
                                        <td>{new Date(pago.fecha).toLocaleDateString()}</td>
                                        <td>
                                            {pago.monto ? `Q. ${parseFloat(pago.monto).toFixed(2)}` : 'N/A'}
                                        </td>
                                        <td>{pago.metodo_pago ? pago.metodo_pago : ''}</td>
                                        <td>{pago.factura_proveedor_id}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

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

                    {/* Botón para regresar */}
                    <button className="btn btn-secondary" onClick={handleBack}>
                        Regresar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompShowPagoProveedor;
