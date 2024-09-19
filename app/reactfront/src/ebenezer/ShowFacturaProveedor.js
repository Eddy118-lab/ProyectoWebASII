import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/StyleFacturaProveedor.css'; // Asegúrate de ajustar el nombre a 'StyleFacturaProveedor.css'
import SearchFacturaProveedor from './SearchFacturaProveedor';
import '@fortawesome/fontawesome-free/css/all.min.css';

const URI = 'http://localhost:8000/api/facturas-proveedores'; // Ajusta la URI según tu API

const CompShowFacturaProveedor = () => {
    const [facturas, setFacturas] = useState([]);
    const [filteredFacturas, setFilteredFacturas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [facturasPerPage] = useState(4);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('fecha');

    useEffect(() => {
        getFacturas();
    }, []);

    const getFacturas = async () => {
        try {
            const res = await axios.get(URI);
            setFacturas(res.data);
            setFilteredFacturas(res.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const deleteFactura = async (id) => {
        try {
            const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar esta factura?');
            if (isConfirmed) {
                await axios.delete(`${URI}${id}`);
                getFacturas();
            }
        } catch (error) {
            console.error("Error al eliminar la factura:", error);
        }
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const handleSearch = (query) => {
        const filtered = facturas.filter(factura =>
            factura.proveedor.nombre.toLowerCase().includes(query.toLowerCase()) ||
            factura.monto.toString().includes(query.toLowerCase())
        );
        setFilteredFacturas(filtered);
        setCurrentPage(1);
    };

    const sortFacturas = (field) => {
        const order = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
        const sortedFacturas = [...filteredFacturas].sort((a, b) => {
            if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredFacturas(sortedFacturas);
        setSortField(field);
        setSortOrder(order);
    };

    const indexOfLastFactura = currentPage * facturasPerPage;
    const indexOfFirstFactura = indexOfLastFactura - facturasPerPage;
    const currentFacturas = filteredFacturas.slice(indexOfFirstFactura, indexOfLastFactura);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredFacturas.length / facturasPerPage);

    const renderSortArrow = (field) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? '↑' : '↓';
        }
        return '';
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='search-create-container'>
                        <div className='user-management-header'>
                            <h2 className='user-management-title'>Gestión de Facturas de Proveedores</h2>
                        </div>
                        <div className='search-create-wrapper'>
                            <div className='search-container'>
                                <SearchFacturaProveedor onSearch={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <table className='table table-hover'>
                        <thead className='table-primary'>
                            <tr>
                                <th onClick={() => sortFacturas('fecha')}>Fecha {renderSortArrow('fecha')}</th>
                                <th onClick={() => sortFacturas('monto')}>Monto {renderSortArrow('monto')}</th>
                                <th onClick={() => sortFacturas('proveedor.nombre')}>Proveedor {renderSortArrow('proveedor.nombre')}</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFacturas.map((factura) => (
                                <tr key={factura.id}>
                                    <td>{formatDate(factura.fecha)}</td>
                                    <td>Q. {factura.monto}</td>
                                    <td>{factura.proveedor ? factura.proveedor.nombre : 'N/A'}</td>
                                    <td>                                     
                                        <Link to={`/factura-proveedor/gestion-detalles-facturas-proveedores/${factura.id}`} className='btn btn-primary'>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                        </Link>
                                        <Link to={`/factura-proveedor/gestion-pagos-proveedores/${factura.id}`} className='btn btn-success'>
                                        <i className="fa-solid fa-hand-holding-dollar"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <nav className='pagination-center'>
                        <ul className='pagination'>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(index + 1)} className='page-link'>
                                        {index + 1}
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

export default CompShowFacturaProveedor;
