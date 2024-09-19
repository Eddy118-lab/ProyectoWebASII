import Proveedor from '../models/Proveedor.js';
import TipoProveedor from '../models/TipoProveedor.js'; // Asegúrate de que la ruta sea correcta

// Obtener todos los proveedores
export const getProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll({
            include: { model: TipoProveedor, as: 'tipoProveedor' } // Incluir el tipo de proveedor en la respuesta
        });
        console.log(proveedores);  // Verifica la respuesta aquí
        res.json(proveedores);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un proveedor por ID
export const getProveedorById = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByPk(req.params.id, {
            include: { model: TipoProveedor, as: 'tipoProveedor' }
        });
        if (proveedor) {
            res.json(proveedor);
        } else {
            res.status(404).json({ message: 'Proveedor no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo proveedor
export const createProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.create(req.body);
        res.status(201).json(proveedor);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un proveedor
export const updateProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByPk(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        await proveedor.update(req.body);
        res.json(proveedor);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un proveedor
export const deleteProveedor = async (req, res) => {
    try {
        const result = await Proveedor.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Proveedor eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Proveedor no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
