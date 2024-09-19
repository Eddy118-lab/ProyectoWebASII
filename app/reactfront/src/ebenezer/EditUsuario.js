import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Style/StyleUsuario.css';  // Importa el archivo CSS

const URI = 'http://localhost:8000/api/usuario/';

const EditUsuario = () => {
    const [nombreComp, setNombreComp] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenha, setContrasenha] = useState('');
    const [confContrasenha, setConfContrasenha] = useState('');
    const [fechaNaci, setFechaNaci] = useState('');
    const [nit, setNit] = useState('');
    const [dpi, setDpi] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Para mostrar el mensaje de éxito
    const { id } = useParams();
    const navigate = useNavigate();

    // Cargar los datos actuales del usuario cuando se monta el componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${URI}${id}`);
                const user = response.data;
                setNombreComp(user.nombreComp);
                setEmail(user.email);
                setFechaNaci(user.fechaNaci);
                setNit(user.nit);
                setDpi(user.dpi);
                setDireccion(user.direccion);
                setTelefono(user.telefono);
                setContrasenha('');
                setConfContrasenha('');
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, [id]);

    // Manejar la actualización de los datos
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Si las contraseñas no coinciden, mostramos un error
        if (contrasenha && contrasenha !== confContrasenha) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Creación del objeto con los datos actualizados
        const updatedUser = {
            nombreComp,
            email,
            fechaNaci,
            nit,
            dpi,
            direccion,
            telefono,
            ...(contrasenha && { contrasenha }) // Solo se incluye si hay una nueva contraseña
        };

        // Verificar si los datos están correctos
        console.log("Datos enviados al backend:", updatedUser);

        try {
            // Intentar enviar los datos al backend
            const response = await axios.put(`${URI}${id}`, updatedUser);
            console.log("Respuesta del backend:", response.data);
            
            // Si la respuesta es exitosa, mostrar el mensaje
            setSuccessMessage("Usuario actualizado con éxito!");
            setTimeout(() => {
                navigate('/usuario/gestion-usuarios'); // Redirigir después de 2 segundos
            }, 2000);
        } catch (error) {
            console.error("Error al actualizar los datos del usuario:", error.response ? error.response.data : error);
            alert("Error al actualizar el usuario, por favor intenta nuevamente.");
        }
    };

    // Cancelar y volver a la página de gestión de usuarios
    const handleCancel = () => {
        navigate('/usuario/gestion-usuarios'); // Redirige a la tabla de usuarios
    };

    return (
        <div className='form-container'>
            <h2 className='form-title'>Editar Usuario</h2>
            <form onSubmit={handleSubmit} className="form-grid">
    <div className='form-group'>
        <label>Nombre Completo</label>
        <input
            type='text'
            className='form-control'
            value={nombreComp}
            onChange={(e) => setNombreComp(e.target.value)}
            required
        />
    </div>
    <div className='form-group'>
        <label>Email</label>
        <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
    </div>
    <div className='form-group'>
        <label>Fecha de Nacimiento</label>
        <input
            type='date'
            className='form-control'
            value={fechaNaci}
            onChange={(e) => setFechaNaci(e.target.value)}
            required
        />
    </div>
    <div className='form-group'>
        <label>NIT</label>
        <input
            type='text'
            className='form-control'
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            required
        />
    </div>
    <div className='form-group'>
        <label>DPI</label>
        <input
            type='text'
            className='form-control'
            value={dpi}
            onChange={(e) => setDpi(e.target.value)}
            required
        />
    </div>
    <div className='form-group'>
        <label>Dirección</label>
        <input
            type='text'
            className='form-control'
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
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
    {/* Campo de contraseña solo si deseas actualizarla */}
    <div className='form-group'>
        <label>Contraseña (Dejar en blanco si no deseas cambiarla)</label>
        <input
            type='password'
            className='form-control'
            value={contrasenha}
            onChange={(e) => setContrasenha(e.target.value)}
        />
    </div>
    <div className='form-group'>
        <label>Confirmar Contraseña</label>
        <input
            type='password'
            className='form-control'
            value={confContrasenha}
            onChange={(e) => setConfContrasenha(e.target.value)}
        />
    </div>

    {/* Botones ocupando el ancho completo */}
    <div className="form-buttons">
        <button type='submit' className='btn btn-primary'>Actualizar</button>
        <button type='button' onClick={handleCancel} className='btn btn-secondary'>Cancelar</button>
    </div>
</form>


            {/* Mostrar mensaje de éxito si la actualización es exitosa */}
            {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
        </div>
    );
};

export default EditUsuario;
