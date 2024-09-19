import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Style/ConductorStyles.css';  // Importa el archivo CSS

const URI_COLABORADOR = 'http://localhost:8000/api/conductores/';

const CompEditColaborador = () => {
    const { id } = useParams();  // Obtener el ID del colaborador de los parámetros de la URL
    const [primer_nom, setPrimer_Nom] = useState('');
    const [segundo_nombre, setSegundo_Nombre] = useState('');
    const [primer_apell, setPrimer_Apell] = useState('');
    const [segundo_apell, setSegundo_Apell] = useState('');
    const [no_licencia, setNo_Licencia] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState([]);
    const [fecha_contratacion, setFecha_Contratacion] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGestionPersonal = async () => {
            try {
                const res = await axios.get(`${URI_COLABORADOR}${id}`);
                const colaborador = res.data;
                setPrimer_Nom(colaborador.primer_nom);
                setSegundo_Nombre(colaborador.segundo_nombre);
                setPrimer_Apell(colaborador.primer_apell);
                setSegundo_Apell(colaborador.segundo_apell);
                setNo_Licencia(colaborador.no_licencia);
                setTelefono(colaborador.telefono);
                setEmail(colaborador.email);
                setFecha_Contratacion(colaborador.fecha_contratacion);

            } catch (error) {
                console.error("Error al obtener el colaborador:", error);
                setErrorMessage("Error al obtener el colaborador.");
            }
        };

        fetchGestionPersonal();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
// Crear el objeto con los datos actualizados
        const updatedGestionPersonal = {
            primer_nom,
            segundo_nombre,
            primer_apell,
            segundo_apell,
            no_licencia,
            telefono,
            email,
            fecha_contratacion
        };
    
        try {
            const response = await axios.put(`${URI_COLABORADOR}${id}`, updatedGestionPersonal, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                setSuccessMessage("Colaborador actualizado con éxito!");
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/gestion-personal/colaborador');
                }, 2000);
            } else {
                setErrorMessage("Error al actualizar el colaborador.");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setErrorMessage("Error al actualizar el colaborador.");
        }
    };
    

    const handleCancel = () => {
        navigate('/gestion-personal/colaborador');
    };

    return (
        <div className='form-container'>
            <h2 className='form-title'>Editar Colaborador</h2>
            
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            
            <form onSubmit={handleSubmit}>
    <div className='form-grid'>
        <div className='form-group'>
            <label>Primer Nombre</label>
            <input
                type='text'
                className='form-control'
                value={primer_nom}
                onChange={(e) => setPrimer_Nom(e.target.value)}
                required
            />
        </div>
        <div className='form-group'>
            <label>Segundo Nombre</label>
            <input
                type='text'
                className='form-control'
                value={segundo_nombre}
                onChange={(e) => setSegundo_Nombre(e.target.value)}
                required
            />
        </div>
        <div className='form-group'>
            <label>Primer Apellido</label>
            <input
                type='text'
                className='form-control'
                value={primer_apell}
                onChange={(e) => setPrimer_Apell(e.target.value)}
                required
            />
        </div>
        <div className='form-group'>
            <label>Segundo Apellido</label>
            <input
                type='text'
                className='form-control'
                value={segundo_apell}
                onChange={(e) => setSegundo_Apell(e.target.value)}
                required
            />
        </div>
        <div className='form-group'>
            <label>Número de Licencia</label>
            <input
                type='text'
                className='form-control'
                value={no_licencia}
                onChange={(e) => setNo_Licencia(e.target.value)}
                required
            />
        </div>
        <div className='form-group'>
            <label>Teléfono</label>
            <input
                type='text'
                className='form-control'
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
            />
        </div>
        <div className='form-group'>
            <label>Email</label>
            <input
                type='text'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div className='form-group'>
            <label>Fecha de Contratación</label>
            <input
                type='date'
                className='form-control'
                value={fecha_contratacion}
                onChange={(e) => setFecha_Contratacion(e.target.value)}
                required
            />
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

export default CompEditColaborador;