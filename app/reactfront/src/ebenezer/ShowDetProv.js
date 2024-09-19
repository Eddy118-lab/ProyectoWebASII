import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Style/StyleDetProv.css'; // Asegúrate de que el nombre del archivo de estilos sea correcto
import SearchDetalleFacturaProveedor from './SearchDetalleFacturaProveedor';

const URI = 'http://localhost:8000/api/detalles-facturas-proveedores/'; // URI base ajustada

const CompShowDetalleFacturaProveedor = () => {
    const { id } = useParams(); // Obtén el parámetro id de la URL
    const [factura, setFactura] = useState([]);
    const [filteredFactura, setFilteredFactura] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [itemsPerPage] = useState(4); // Elementos por página
    const navigate = useNavigate(); // Para la navegación de regreso

    useEffect(() => {
        const getFactura = async () => {
            try {
                const res = await axios.get(`${URI}${id}`);
                setFactura(res.data.items || [res.data]);
                setFilteredFactura(res.data.items || [res.data]); // Filtra inicialmente los datos
            } catch (error) {
                console.error("Error al obtener los detalles de la factura:", error);
            }
        };

        getFactura();
    }, [id]);

    const handleSearch = (query) => {
        const filtered = factura.filter(item =>
            item.material_id.toString().toLowerCase().includes(query.toLowerCase()) ||
            item.factura_proveedor_id.toString().toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFactura(filtered);
        setCurrentPage(1); // Reinicia la página a la 1
    };

    const items = Array.isArray(filteredFactura) ? filteredFactura : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleBack = () => {
        navigate('/factura-proveedor/gestion-facturas-proveedores');
    };

    return (
        <div className='container'>
            {/* Buscador */}
            <div className="search-create-container">
                <div className="search-container">
                    <SearchDetalleFacturaProveedor onSearch={handleSearch} />
                </div>
            </div>

            {/* Título de la página debajo del buscador */}
            <h2 className='section-title'>Gestión de Detalles de Factura de Proveedores</h2>

            {/* Tabla con detalles de la factura */}
            <div className='table-container'>
                <table className='table table-hover'>
                    <thead className='table-primary'>
                        <tr>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                            <th>Descuento</th>
                            <th>Total</th>
                            <th>Material ID</th>
                            <th>Factura-Proveedor ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length ? (
                            currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.cantidad}</td>
                                    <td>Q. {item.precio_unitario}</td>
                                    <td>Q. {item.subtotal}</td>
                                    <td>Q. {item.descuento}</td>
                                    <td>Q. {item.total}</td>
                                    <td>{item.material_id}</td>
                                    <td>{item.factura_proveedor_id}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay detalles disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <nav className='pagination-center'>
                    <ul className='pagination'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className='page-link'>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}

            {/* Botón para regresar */}
            <button className="btn btn-secondary" onClick={handleBack}>
                Regresar
            </button>
        </div>
    );
};

export default CompShowDetalleFacturaProveedor;
