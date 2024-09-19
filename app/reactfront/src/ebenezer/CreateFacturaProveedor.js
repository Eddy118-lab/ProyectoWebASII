import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/StyleFacturaProveedor.css';  // Ajusta según tus necesidades

const URI = 'http://localhost:8000/api/facturas-proveedores'; // Cambia la URI al endpoint de facturas de proveedores
const URI_PROVEEDORES = 'http://localhost:8000/api/proveedores'; // Cambia la URI al endpoint de proveedores

const CompCreateFacturaProveedor = () => {
    const [fecha, setFecha] = useState('');
    const [monto, setMonto] = useState('');
    const [proveedorId, setProveedorId] = useState('');
    const [proveedores, setProveedores] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Cargar proveedores
    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const res = await axios.get(URI_PROVEEDORES);
                setProveedores(res.data);
            } catch (error) {
                console.error("Error al obtener proveedores:", error);
                setErrorMessage("Error al obtener proveedores.");
            }
        };

        fetchProveedores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newFacturaProveedor = {
            fecha,
            monto,
            proveedor_id: proveedorId  // Llave foránea
        };

        try {
            const response = await axios.post(URI, newFacturaProveedor);
            if (response.status === 201) {
                setSuccessMessage("Factura de proveedor creada con éxito!");
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/factura-proveedor');
                }, 2000);
            } else {
                setErrorMessage("Error al crear la factura de proveedor.");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setErrorMessage("Error al crear la factura de proveedor.");
        }
    };

    const handleCancel = () => {
        navigate('/factura-proveedor/gestion-facturas-proveedores');
    };

    return (
        <div className='form-container'>
            <h2 className='form-title'>Crear Factura de Proveedor</h2>
            
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            
            <form onSubmit={handleSubmit} className='form-grid'>
                <div className='form-column'>
                    <label>Fecha:</label>
                    <input
                        type='date'
                        className='form-control'
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div className='form-column'>
                    <label>Monto:</label>
                    <input
                        type='number'
                        className='form-control'
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        required
                    />
                </div>
                <div className='form-column'>
                    <label>Proveedor:</label>
                    <select
                        className='form-control'
                        value={proveedorId}
                        onChange={(e) => setProveedorId(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                                {proveedor.nombre}  {/* Ajusta el campo mostrado según tu modelo */}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-buttons'>
                    <button type='submit' className='btn btn-primary'>Crear</button>
                    <button type='button' onClick={handleCancel} className='btn btn-secondary'>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default CompCreateFacturaProveedor;
