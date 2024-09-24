import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SearchDetalleFacturaProveedor from './SearchDetalleFacturaProveedor';
import './Style/StyleDetallFactProv.css';

const URI = 'http://localhost:8000/api/detalles-facturas-proveedores/';
const URI_MATERIALES = 'http://localhost:8000/api/materiales/'; // Endpoint para obtener los materiales

const CompShowDetalleFacturaProveedor = () => {
    const { id } = useParams();
    const [factura, setFactura] = useState([]);
    const [filteredFactura, setFilteredFactura] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [materiales, setMateriales] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getFactura = async () => {
            try {
                const res = await axios.get(`${URI}${id}`);
                console.log(res.data); // Añadido para verificar los datos recibidos

                // Aseguramos que 'factura' sea siempre un array
                const facturaItems = Array.isArray(res.data.items) ? res.data.items : [res.data];
                setFactura(facturaItems);
                setFilteredFactura(facturaItems);
            } catch (error) {
                console.error("Error al obtener los detalles de la factura:", error);
            }
        };

        const getMateriales = async () => {
            try {
                const res = await axios.get(URI_MATERIALES);
                const materialesMap = {};
                res.data.forEach(material => {
                    materialesMap[material.id] = material.nombre; // Suponiendo que el material tiene un campo 'nombre'
                });
                setMateriales(materialesMap);
            } catch (error) {
                console.error("Error al obtener los materiales:", error);
            }
        };

        getFactura();
        getMateriales();
    }, [id]);

    const handleSearch = (query) => {
        const filtered = factura.filter(item =>
            (materiales[item.material_id] && materiales[item.material_id].toString().toLowerCase().includes(query.toLowerCase())) ||
            item.factura_proveedor_id.toString().toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFactura(filtered);
        setCurrentPage(1);
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
        <div className='detalle-factura-container'>
            <h2 className='detalle-factura-title'>Gestión de Detalles de Factura de Proveedores</h2>
            <div className="detalle-factura-search-container">
                <SearchDetalleFacturaProveedor onSearch={handleSearch} />
            </div>
            <div className='detalle-factura-table-container'>
                <table className='detalle-factura-table table table-hover'>
                    <thead className='table-primary'>
                        <tr>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                            <th>Descuento</th>
                            <th>Total</th>
                            <th>Nombre del Producto</th>
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
                                    <td>{materiales[item.material_id] || 'Desconocido'}</td> {/* Mostrar nombre del producto */}
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

                <button className="detalle-factura-back-button btn btn-secondary" onClick={handleBack}>
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default CompShowDetalleFacturaProveedor;
