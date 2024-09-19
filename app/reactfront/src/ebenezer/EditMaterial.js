import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Style/StyleMaterial.css';  // Importa el archivo CSS correspondiente

const URI_MATERIAL = 'http://localhost:8000/api/materiales/';
const URI_PROVEEDOR = 'http://localhost:8000/api/proveedores/';

const CompEditMaterial = () => {
    const { id } = useParams();  // Obtener el ID del material de los parámetros de la URL
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [unidadMedida, setUnidadMedida] = useState('');
    const [costo, setCosto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [proveedorId, setProveedorId] = useState('');
    const [proveedores, setProveedores] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const res = await axios.get(`${URI_MATERIAL}${id}`);
                const material = res.data;
                setNombre(material.nombre);
                setDescripcion(material.descripcion);
                setUnidadMedida(material.unidad_medida);
                setCosto(material.costo);
                setCantidad(material.cantidad);
                setProveedorId(material.proveedor_id);
            } catch (error) {
                console.error("Error al obtener el material:", error);
                setErrorMessage("Error al obtener el material.");
            }
        };

        const fetchProveedores = async () => {
            try {
                const res = await axios.get(URI_PROVEEDOR);
                setProveedores(res.data);
            } catch (error) {
                console.error("Error al obtener proveedores:", error);
                setErrorMessage("Error al obtener proveedores.");
            }
        };

        fetchMaterial();
        fetchProveedores();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedMaterial = {
            nombre,
            descripcion,
            unidad_medida: unidadMedida,
            costo,
            cantidad,
            proveedor_id: proveedorId  // Incluye la clave foránea
        };

        try {
            const response = await axios.put(`${URI_MATERIAL}${id}`, updatedMaterial);
            if (response.status === 200) {
                setSuccessMessage("Material actualizado con éxito!");
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/material/gestion-materiales');
                }, 2000);
            } else {
                setErrorMessage("Error al actualizar el material.");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setErrorMessage("Error al actualizar el material.");
        }
    };

    const handleCancel = () => {
        navigate('/material/gestion-materiales');
    };

    return (
        <div className='form-container'>
            <h2 className='form-title'>Editar Material</h2>
            
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            
            <form onSubmit={handleSubmit} className='form-grid'>
                <div className='form-column'>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input
                            type='text'
                            className='form-control'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Descripción</label>
                        <input
                            type='text'
                            className='form-control'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Unidad de Medida</label>
                        <input
                            type='text'
                            className='form-control'
                            value={unidadMedida}
                            onChange={(e) => setUnidadMedida(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='form-column'>
                    <div className='form-group'>
                        <label>Costo</label>
                        <input
                            type='number'
                            step='0.01'
                            className='form-control'
                            value={costo}
                            onChange={(e) => setCosto(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Cantidad</label>
                        <input
                            type='integer'
                            step='0.01'
                            className='form-control'
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Proveedor</label>
                        <select
                            className='form-control'
                            value={proveedorId}
                            onChange={(e) => setProveedorId(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un proveedor</option>
                            {proveedores.map(proveedor => (
                                <option key={proveedor.id} value={proveedor.id}>
                                    {proveedor.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='form-buttons'>
                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                    <button type='button' className='btn btn-secondary' onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default CompEditMaterial;
