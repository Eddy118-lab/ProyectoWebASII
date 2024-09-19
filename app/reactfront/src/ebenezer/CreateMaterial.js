import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/StyleMaterial.css'; // Asegúrate de tener el archivo CSS correspondiente

const URI_MATERIAL = 'http://localhost:8000/api/materiales/';
const URI_PROVEEDOR = 'http://localhost:8000/api/proveedores/';

const CompCreateMaterial = () => {
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
        const fetchProveedores = async () => {
            try {
                const res = await axios.get(URI_PROVEEDOR);
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

        const newMaterial = {
            nombre,
            descripcion,
            unidad_medida: unidadMedida,
            costo,
            cantidad,
            proveedor_id: proveedorId // Incluye la clave foránea
        };

        try {
            const response = await axios.post(URI_MATERIAL, newMaterial);
            if (response.status === 201) {
                setSuccessMessage("Material creado con éxito!");
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/material/gestion-materiales'); // Ajusta la ruta según tu configuración
                }, 2000);
            } else {
                setErrorMessage("Error al crear el material.");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setErrorMessage("Error al crear el material.");
        }
    };

    const handleCancel = () => {
        navigate('/material/gestion-materiales'); // Ajusta la ruta según tu configuración
    };

    return (
        <div className='form-container'>
            <h2 className='form-title'>Crear Material</h2>
            
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            
            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-column">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <input
                            type="text"
                            className="form-control"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Unidad de Medida</label>
                        <input
                            type="text"
                            className="form-control"
                            value={unidadMedida}
                            onChange={(e) => setUnidadMedida(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <div className="form-column">
                    <div className="form-group">
                        <label>Costo</label>
                        <input
                            type="number"
                            step="1"
                            className="form-control"
                            value={costo}
                            onChange={(e) => setCosto(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Cantidad</label>
                        <input
                            type="integer"
                            step="1"
                            className="form-control"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Proveedor</label>
                        <select
                            className="form-control"
                            value={proveedorId}
                            onChange={(e) => setProveedorId(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un proveedor</option>
                            {proveedores.map((proveedor) => (
                                <option key={proveedor.id} value={proveedor.id}>
                                    {proveedor.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Botones en una fila separada */}
                <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompCreateMaterial;
