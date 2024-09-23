import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Style/StylePagoProv.css';

const URI = 'http://localhost:8000/api/pagos-proveedores/';

const CompShowPagoProveedor = () => {
    const { id } = useParams(); // Obtenemos el ID de la factura
    const [pagos, setPagos] = useState([]);
    const [filteredPagos, setFilteredPagos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagosPerPage] = useState(4);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Para la navegación de regreso

    useEffect(() => {
        getPagos();
    }, []);

    const getPagos = async () => {
        setLoading(true);
        try {
            const res = await axios.get(URI);
            // Filtramos los pagos que corresponden al ID de la factura actual
            const pagosFiltrados = res.data.filter(pago => pago.factura_proveedor_id === parseInt(id));
            setPagos(pagosFiltrados);
            setFilteredPagos(pagosFiltrados);
        } catch (error) {
            setError('Error al obtener los datos de pagos');
            console.error("Error al obtener los datos de pagos:", error);
        } finally {
            setLoading(false);
        }
    };

    const deletePago = async (pagoId) => {
        try {
            const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este pago?');
            if (isConfirmed) {
                await axios.delete(`${URI}${pagoId}`);
                getPagos(); // Actualizamos la lista después de eliminar
            }
        } catch (error) {
            console.error("Error al eliminar el pago:", error);
            setError('Error al eliminar el pago');
        }
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
        <div className="pago-proveedor-container">
        <div className="pago-proveedor-row">
            <div className="pago-proveedor-col">
                <h2 className="pago-proveedor-title">Gestión de Pagos a Proveedores</h2>
    
                {loading && <p className="pago-proveedor-loading">Cargando...</p>}
                {error && <p className="text-danger">{error}</p>}
    
                <table className="pago-proveedor-table table table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Método de Pago</th>
                            <th>ID Factura Proveedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPagos.length === 0 ? (
                            <tr>
                                <td colSpan="5">No hay pagos disponibles</td>
                            </tr>
                        ) : (
                            currentPagos.map(pago => (
                                <tr key={pago.id}>
                                    <td>{new Date(pago.fecha).toLocaleDateString()}</td>
                                    <td>Q. {parseFloat(pago.monto).toFixed(2)}</td>
                                    <td>{pago.metodo_pago}</td>
                                    <td>{pago.factura_proveedor_id}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
    
                <nav className='pago-proveedor-pagination d-flex justify-content-center'>
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
    
                <button className="pago-proveedor-back-button btn btn-secondary" onClick={handleBack}>
                    Regresar
                </button>
            </div>
        </div>
    </div>    
    );
};

export default CompShowPagoProveedor;
