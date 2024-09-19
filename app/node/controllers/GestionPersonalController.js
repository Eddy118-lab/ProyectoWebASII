import GestionPersonal from '../models/Conductor.js';

// Obtener todos los colaboradores
export const getPersonal = async (req, res) => {
    try {
        const personal = await GestionPersonal.findAll();
        res.json(personal);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un colaborador por ID
export const getPersolaById = async (req, res) => {
    try {
        const personal = await GestionPersonal.findByPk(req.params.id);
        if (personal) {
            res.json(personal);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo colaborador
export const createColaborador = async (req, res) => {
    try {
        const colaboradorpost = await GestionPersonal.create(req.body);
        res.status(201).json(colaboradorpost);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un colaborador
export const updateColaborador = async (req, res) => {
    try {
        const colaboradorput = await GestionPersonal.findByPk(req.params.id);
        if (!colaboradorput) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }
        await colaboradorput.update(req.body);
        res.json(colaboradorput);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un colaborador
export const deleteColaborador = async (req, res) => {
    try {
        const result = await GestionPersonal.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Colaborador eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Colaborador no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};