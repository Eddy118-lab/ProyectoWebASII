import Material from '../models/Material.js';  // Asegúrate de que la ruta sea correcta
import Proveedor from '../models/Proveedor.js';  // Asegúrate de que la ruta sea correcta

// Obtener todos los materiales
export const getMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll({
            include: { model: Proveedor, as: 'proveedor' }  // Incluir el proveedor en la respuesta
        });
        console.log(materials);  // Verifica la respuesta aquí
        res.json(materials);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un material por ID
export const getMaterialById = async (req, res) => {
    try {
        const material = await Material.findByPk(req.params.id, {
            include: { model: Proveedor, as: 'proveedor' }
        });
        if (material) {
            res.json(material);
        } else {
            res.status(404).json({ message: 'Material no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo material
export const createMaterial = async (req, res) => {
    try {
        const material = await Material.create(req.body);
        res.status(201).json(material);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un material
export const updateMaterial = async (req, res) => {
    try {
        const material = await Material.findByPk(req.params.id);
        if (!material) {
            return res.status(404).json({ message: 'Material no encontrado' });
        }
        await material.update(req.body);
        res.json(material);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un material
export const deleteMaterial = async (req, res) => {
    try {
        const result = await Material.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Material eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Material no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
